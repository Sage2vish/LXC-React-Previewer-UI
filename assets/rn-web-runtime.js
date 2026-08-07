/*
 * Minimal `react-native` -> DOM shim used by the LXC React Previewer webview.
 * Loaded after react.production.min.js and react-dom.production.min.js.
 * Exposes `window.RNWeb` (used by preview-bootstrap.js as the `require('react-native')`
 * result) and `window.__LxcErrorBoundary` (a real React error boundary).
 *
 * All styling goes through React's `style` prop (a plain object), which React
 * applies via CSSStyleDeclaration property assignment rather than parsing an
 * attribute string - this keeps everything compliant with a strict
 * `style-src` CSP with no 'unsafe-inline'.
 */
(function () {
  var React = window.React;

  function flattenStyle(style) {
    if (!style) {
      return {};
    }
    if (Array.isArray(style)) {
      return style.reduce(function (acc, entry) {
        return Object.assign(acc, flattenStyle(entry));
      }, {});
    }
    return style;
  }

  var UNITLESS_PROPS = {
    flex: true,
    flexGrow: true,
    flexShrink: true,
    opacity: true,
    zIndex: true,
    fontWeight: true,
    elevation: true,
    aspectRatio: true,
    shadowOpacity: true,
    lineClamp: true,
  };

  function toPixelValue(key, value) {
    if (typeof value !== 'number') {
      return value;
    }
    return UNITLESS_PROPS[key] ? value : value + 'px';
  }

  function hexToRgba(color, opacity) {
    if (typeof color !== 'string') {
      return color;
    }
    var match = color.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
    if (!match) {
      return color;
    }
    var hex = match[1];
    if (hex.length === 3) {
      hex = hex.split('').map(function (c) { return c + c; }).join('');
    }
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
  }

  function buildBoxShadow(shadow) {
    var offset = shadow.shadowOffset || {};
    var offsetX = offset.width || 0;
    var offsetY = offset.height != null ? offset.height : (shadow.elevation ? shadow.elevation / 2 : 0);
    var radius = shadow.shadowRadius != null ? shadow.shadowRadius : (shadow.elevation || 0);
    var opacity = shadow.shadowOpacity != null ? shadow.shadowOpacity : (shadow.elevation ? 0.3 : 0);
    var color = shadow.shadowColor || '#000000';
    return offsetX + 'px ' + offsetY + 'px ' + radius + 'px ' + hexToRgba(color, opacity);
  }

  function mapResizeMode(mode) {
    if (mode === 'stretch') return 'fill';
    if (mode === 'center' || mode === 'repeat') return 'none';
    if (mode === 'contain') return 'contain';
    return 'cover';
  }

  var SHADOW_KEYS = { shadowColor: true, shadowOffset: true, shadowOpacity: true, shadowRadius: true, elevation: true };
  var DROP_KEYS = { includeFontPadding: true, textAlignVertical: true };

  function toDomStyle(rnStyle) {
    var flat = flattenStyle(rnStyle);
    var out = {};
    var shadow = null;
    Object.keys(flat).forEach(function (key) {
      var value = flat[key];
      if (value === null || value === undefined || value === false) {
        return;
      }
      if (SHADOW_KEYS[key]) {
        shadow = shadow || {};
        shadow[key] = value;
        return;
      }
      if (DROP_KEYS[key]) {
        return;
      }
      if (key === 'resizeMode') {
        out.objectFit = mapResizeMode(value);
        return;
      }
      out[key] = toPixelValue(key, value);
    });
    if (shadow) {
      out.boxShadow = buildBoxShadow(shadow);
    }
    return out;
  }

  function mapPointerEvents(value) {
    if (value === 'none' || value === 'box-none') return 'none';
    return 'auto';
  }

  function baseProps(props, defaultStyle) {
    var out = { style: Object.assign({}, defaultStyle, toDomStyle(props.style)) };
    if (props.testID) out['data-testid'] = props.testID;
    if (props.nativeID) out.id = props.nativeID;
    if (props.accessibilityLabel) out['aria-label'] = props.accessibilityLabel;
    if (props.pointerEvents) out.style.pointerEvents = mapPointerEvents(props.pointerEvents);
    return out;
  }

  function getUri(source) {
    if (!source) return undefined;
    if (typeof source === 'string') return source;
    if (Array.isArray(source)) return getUri(source[0]);
    if (typeof source === 'object') return source.uri;
    return undefined;
  }

  function View(props) {
    var domProps = baseProps(props, {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxSizing: 'border-box',
      flexShrink: 0,
      minHeight: 0,
      minWidth: 0,
    });
    return React.createElement('div', domProps, props.children);
  }

  function Text(props) {
    var domProps = baseProps(props, { display: 'inline', boxSizing: 'border-box' });
    if (props.numberOfLines) {
      domProps.style.display = '-webkit-box';
      domProps.style.WebkitBoxOrient = 'vertical';
      domProps.style.WebkitLineClamp = String(props.numberOfLines);
      domProps.style.overflow = 'hidden';
    }
    if (props.onPress) {
      domProps.onClick = props.onPress;
      domProps.style.cursor = 'pointer';
    }
    return React.createElement('span', domProps, props.children);
  }

  function Image(props) {
    var domProps = baseProps(props, { display: 'block', objectFit: 'cover' });
    domProps.src = getUri(props.source);
    domProps.alt = props.accessibilityLabel || props.alt || '';
    return React.createElement('img', domProps);
  }

  function ImageBackground(props) {
    var uri = getUri(props.source);
    var outerStyle = Object.assign(
      { display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' },
      toDomStyle(props.style)
    );
    var imgStyle = Object.assign(
      { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 },
      toDomStyle(props.imageStyle)
    );
    var contentStyle = { position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1, width: '100%', height: '100%' };
    return React.createElement(
      'div',
      { style: outerStyle },
      uri ? React.createElement('img', { src: uri, style: imgStyle, alt: '' }) : null,
      React.createElement('div', { style: contentStyle }, props.children)
    );
  }

  function SafeAreaView(props) {
    var domProps = baseProps(props, { display: 'flex', flexDirection: 'column' });
    return React.createElement('div', domProps, props.children);
  }

  function ScrollView(props) {
    var horizontal = !!props.horizontal;
    var outerStyle = Object.assign(
      {
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        overflowX: horizontal ? 'auto' : 'hidden',
        overflowY: horizontal ? 'hidden' : 'auto',
      },
      toDomStyle(props.style)
    );
    var innerStyle = Object.assign(
      { display: 'flex', flexDirection: horizontal ? 'row' : 'column', flexShrink: 0 },
      toDomStyle(props.contentContainerStyle)
    );
    var domProps = baseProps(props, {});
    domProps.style = outerStyle;
    return React.createElement('div', domProps, React.createElement('div', { style: innerStyle }, props.children));
  }

  function makeTouchable() {
    return function Touchable(props) {
      var resolvedStyle = typeof props.style === 'function' ? props.style({ pressed: false }) : props.style;
      var domProps = baseProps(Object.assign({}, props, { style: resolvedStyle }), {
        display: 'flex',
        flexDirection: 'column',
        cursor: props.disabled ? 'default' : 'pointer',
      });
      domProps.role = 'button';
      domProps['aria-disabled'] = !!props.disabled;
      domProps.onClick = function (event) {
        if (!props.disabled && props.onPress) props.onPress(event);
      };
      var children = typeof props.children === 'function' ? props.children({ pressed: false }) : props.children;
      return React.createElement('div', domProps, children);
    };
  }

  function Button(props) {
    var style = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 14px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: props.color || '#2563eb',
      color: '#ffffff',
      fontWeight: '600',
      fontSize: '14px',
      cursor: props.disabled ? 'default' : 'pointer',
      opacity: props.disabled ? 0.5 : 1,
    };
    return React.createElement(
      'button',
      {
        style: style,
        disabled: !!props.disabled,
        'aria-label': props.accessibilityLabel,
        onClick: function (event) {
          if (!props.disabled && props.onPress) props.onPress(event);
        },
      },
      props.title
    );
  }

  function TextInput(props) {
    var style = Object.assign(
      {
        display: 'block',
        width: '100%',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        border: '1px solid rgba(148,163,184,0.4)',
        borderRadius: '8px',
        padding: '8px 10px',
        background: 'transparent',
        boxSizing: 'border-box',
      },
      toDomStyle(props.style)
    );
    var shared = {
      style: style,
      placeholder: props.placeholder,
      value: props.value,
      defaultValue: props.defaultValue,
      disabled: props.editable === false,
      onChange: function (event) {
        if (props.onChangeText) props.onChangeText(event.target.value);
        if (props.onChange) props.onChange(event);
      },
    };
    if (props.multiline) {
      return React.createElement('textarea', Object.assign({}, shared, { rows: props.numberOfLines || 4 }));
    }
    return React.createElement('input', Object.assign({}, shared, { type: props.secureTextEntry ? 'password' : 'text' }));
  }

  function FlatList(props) {
    var data = props.data || [];
    var horizontal = !!props.horizontal;
    var keyExtractor = props.keyExtractor || function (item, index) {
      if (item && item.key != null) return String(item.key);
      if (item && item.id != null) return String(item.id);
      return String(index);
    };
    var containerStyle = Object.assign(
      {
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        overflowX: horizontal ? 'auto' : 'hidden',
        overflowY: horizontal ? 'hidden' : 'auto',
      },
      toDomStyle(props.style)
    );
    var contentStyle = Object.assign(
      { display: 'flex', flexDirection: horizontal ? 'row' : 'column' },
      toDomStyle(props.contentContainerStyle)
    );
    var items = data.map(function (item, index) {
      return React.createElement(React.Fragment, { key: keyExtractor(item, index) }, props.renderItem({ item: item, index: index }));
    });
    var header = props.ListHeaderComponent ? React.createElement(props.ListHeaderComponent) : null;
    var footer = props.ListFooterComponent ? React.createElement(props.ListFooterComponent) : null;
    var empty = data.length === 0 && props.ListEmptyComponent ? React.createElement(props.ListEmptyComponent) : null;
    return React.createElement('div', { style: containerStyle }, React.createElement('div', { style: contentStyle }, header, empty, items, footer));
  }

  function ActivityIndicator(props) {
    var size = props.size === 'large' ? 36 : props.size === 'small' ? 20 : typeof props.size === 'number' ? props.size : 20;
    var color = props.color || '#999999';
    var style = {
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      border: '3px solid rgba(0,0,0,0.15)',
      borderTopColor: color,
      boxSizing: 'border-box',
    };
    var nodeRef = React.useRef(null);
    React.useEffect(function () {
      if (nodeRef.current && nodeRef.current.animate) {
        nodeRef.current.animate(
          [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
          { duration: 800, iterations: Infinity }
        );
      }
    }, []);
    return React.createElement('div', { ref: nodeRef, style: style });
  }

  function Switch(props) {
    var value = !!props.value;
    var onColor = (props.trackColor && props.trackColor.true) || '#34d399';
    var offColor = (props.trackColor && props.trackColor.false) || '#cbd5e1';
    var style = {
      position: 'relative',
      display: 'inline-block',
      width: '44px',
      height: '26px',
      borderRadius: '999px',
      backgroundColor: value ? onColor : offColor,
      cursor: props.disabled ? 'default' : 'pointer',
      flexShrink: 0,
    };
    var knobStyle = {
      position: 'absolute',
      top: '2px',
      left: value ? '20px' : '2px',
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      backgroundColor: props.thumbColor || '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
    };
    return React.createElement(
      'div',
      {
        style: style,
        role: 'switch',
        'aria-checked': value,
        onClick: function () {
          if (!props.disabled && props.onValueChange) props.onValueChange(!value);
        },
      },
      React.createElement('div', { style: knobStyle })
    );
  }

  function Modal(props) {
    if (props.visible === false) {
      return null;
    }
    var overlayStyle = {
      position: 'absolute',
      inset: '0',
      backgroundColor: props.transparent ? 'transparent' : 'rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
    };
    return React.createElement('div', { style: overlayStyle }, props.children);
  }

  function StatusBar() {
    return null;
  }
  StatusBar.setBarStyle = function () {};
  StatusBar.setHidden = function () {};
  StatusBar.setBackgroundColor = function () {};

  var Platform = {
    OS: 'ios',
    Version: 1,
    isPad: false,
    isTV: false,
    select: function (options) {
      if (Object.prototype.hasOwnProperty.call(options, Platform.OS)) return options[Platform.OS];
      return options.default;
    },
  };

  var Dimensions = {
    get: function () {
      var el = document.getElementById('rn-root');
      var rect = el ? el.getBoundingClientRect() : { width: 390, height: 844 };
      return { width: rect.width, height: rect.height, scale: window.devicePixelRatio || 2, fontScale: 1 };
    },
    addEventListener: function () {
      return { remove: function () {} };
    },
  };

  var PixelRatio = {
    get: function () { return window.devicePixelRatio || 2; },
    getFontScale: function () { return 1; },
    roundToNearestPixel: function (value) { return Math.round(value); },
  };

  var StyleSheet = {
    create: function (styles) { return styles; },
    flatten: flattenStyle,
    compose: function (a, b) { return [a, b]; },
    absoluteFill: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    absoluteFillObject: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    hairlineWidth: 1,
  };

  var Alert = {
    alert: function (title, message) {
      console.log('[Alert]', title, message || '');
    },
  };

  window.RNWeb = {
    View: View,
    Text: Text,
    Image: Image,
    ImageBackground: ImageBackground,
    SafeAreaView: SafeAreaView,
    ScrollView: ScrollView,
    TouchableOpacity: makeTouchable(),
    TouchableHighlight: makeTouchable(),
    TouchableWithoutFeedback: makeTouchable(),
    Pressable: makeTouchable(),
    Button: Button,
    TextInput: TextInput,
    FlatList: FlatList,
    SectionList: FlatList,
    ActivityIndicator: ActivityIndicator,
    Switch: Switch,
    Modal: Modal,
    StatusBar: StatusBar,
    Platform: Platform,
    Dimensions: Dimensions,
    PixelRatio: PixelRatio,
    StyleSheet: StyleSheet,
    Alert: Alert,
    KeyboardAvoidingView: View,
  };

  window.__LxcErrorBoundary = class LxcErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
      return { error: error };
    }
    componentDidCatch(error, info) {
      console.error('[LXC React Previewer]', error, info);
    }
    render() {
      if (this.state.error) {
        return this.props.renderError(this.state.error);
      }
      return this.props.children;
    }
  };
}());
