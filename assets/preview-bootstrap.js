/*
 * Loads after babel.min.js and rn-web-runtime.js. Takes the module payload the
 * extension host embedded in the page (raw, untranspiled source per file) and:
 *  1. resolves relative `require`/`import` specifiers between the modules it was given
 *  2. transpiles each module's TSX/TS source to JS with Babel standalone
 *  3. executes it against a tiny CommonJS shim, wiring `react` and `react-native`
 *     to the real React build and the RNWeb shim
 *  4. mounts the entry module's default export with ReactDOM, inside a real
 *     React error boundary so a broken screen shows a readable error instead
 *     of a blank webview
 */
(function () {
  function resolveRelative(fromId, spec) {
    var stack = fromId.split('/');
    stack.pop();
    spec.split('/').forEach(function (part) {
      if (part === '' || part === '.') return;
      if (part === '..') stack.pop();
      else stack.push(part);
    });
    return stack.join('/');
  }

  function findModuleId(modules, base) {
    if (modules[base]) return base;
    var exts = ['.tsx', '.ts', '.jsx', '.js'];
    for (var i = 0; i < exts.length; i++) {
      if (modules[base + exts[i]]) return base + exts[i];
    }
    for (var j = 0; j < exts.length; j++) {
      var indexId = (base ? base + '/' : '') + 'index' + exts[j];
      if (modules[indexId]) return indexId;
    }
    return null;
  }

  function transpile(id, code) {
    var isTsx = /\.(tsx|jsx)$/.test(id);
    return Babel.transform(code, {
      filename: id,
      sourceType: 'module',
      babelrc: false,
      configFile: false,
      presets: [
        ['typescript', isTsx ? { isTSX: true, allExtensions: true } : {}],
        ['react', { runtime: 'classic' }],
      ],
      plugins: ['transform-modules-commonjs'],
    }).code;
  }

  function errorBoxStyle() {
    return {
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSize: '13px',
      lineHeight: 1.5,
      color: '#7f1d1d',
      backgroundColor: '#fef2f2',
      border: '1px solid #fca5a5',
      borderRadius: '12px',
      padding: '14px',
      whiteSpace: 'pre-wrap',
      overflow: 'auto',
      maxHeight: '100%',
      boxSizing: 'border-box',
    };
  }

  function renderErrorElement(React, error) {
    var message = (error && error.message) || String(error);
    var stack = error && error.stack ? String(error.stack) : '';
    return React.createElement(
      'div',
      { style: errorBoxStyle() },
      React.createElement('div', { style: { fontWeight: 700, marginBottom: '8px' } }, 'Preview failed to render'),
      React.createElement('div', { style: { marginBottom: stack ? '8px' : 0 } }, message),
      stack ? React.createElement('pre', { style: { whiteSpace: 'pre-wrap', fontSize: '11px', opacity: 0.8, margin: 0 } }, stack) : null
    );
  }

  function run(payload, mountId, platformOS) {
    var root = document.getElementById(mountId);
    if (!root) return;

    window.RNWeb.Platform.OS = platformOS === 'android' ? 'android' : 'ios';

    var modules = payload.modules || {};
    var cache = {};

    function requireModule(fromId, spec) {
      if (spec === 'react') return window.React;
      if (spec === 'react-native') return window.RNWeb;
      if (spec.charAt(0) !== '.') {
        throw new Error(
          'This preview only supports "react", "react-native", and relative project files. ' +
            '"' + spec + '" (imported from ' + fromId + ') is not available in the preview sandbox.'
        );
      }
      var resolvedId = findModuleId(modules, resolveRelative(fromId, spec));
      if (!resolvedId) {
        throw new Error('Cannot find "' + spec + '" imported from "' + fromId + '".');
      }
      return loadModule(resolvedId);
    }

    function loadModule(id) {
      if (cache[id]) return cache[id].exports;
      var entry = modules[id];
      if (!entry) throw new Error('Missing module: ' + id);

      var mod = { exports: {} };
      cache[id] = mod;

      if (entry.kind === 'asset') {
        mod.exports = { uri: entry.code };
        return mod.exports;
      }

      var compiled = transpile(id, entry.code);
      var factory = new Function('module', 'exports', 'require', 'React', compiled);
      factory(mod, mod.exports, function (spec) { return requireModule(id, spec); }, window.React);
      return mod.exports;
    }

    var entryExports = loadModule(payload.entryId);
    var Component = entryExports && (entryExports.default || entryExports);
    if (typeof Component !== 'function') {
      throw new Error('"' + payload.entryId + '" has no default export that is a React component.');
    }

    var React = window.React;
    var Boundary = window.__LxcErrorBoundary;
    window.ReactDOM.render(
      React.createElement(
        Boundary,
        { renderError: function (error) { return renderErrorElement(React, error); } },
        React.createElement(Component)
      ),
      root
    );
  }

  window.__runLxcPreview = function (payload, mountId, platformOS) {
    var root = document.getElementById(mountId);
    try {
      run(payload, mountId, platformOS);
    } catch (error) {
      console.error('[LXC React Previewer]', error);
      if (!root) return;
      try {
        window.ReactDOM.render(renderErrorElement(window.React, error), root);
      } catch (fatal) {
        root.textContent = 'Preview failed: ' + ((error && error.message) || error);
      }
    }
  };
}());
