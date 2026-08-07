"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOS_VERSIONS = exports.DEVICE_PROFILES = void 0;
exports.buildPreviewModel = buildPreviewModel;
const moduleBundler_1 = require("./moduleBundler");
exports.DEVICE_PROFILES = [
    { id: 'iphone-11', label: 'iPhone 11', family: 'iphone', pixels: '1792 x 828', dpi: '326 PPI', viewportClass: 'device-iphone-11' },
    { id: 'iphone-11-pro', label: 'iPhone 11 Pro', family: 'iphone', pixels: '2436 x 1125', dpi: '458 PPI', viewportClass: 'device-iphone-11-pro' },
    { id: 'iphone-11-pro-max', label: 'iPhone 11 Pro Max', family: 'iphone', pixels: '2688 x 1242', dpi: '458 PPI', viewportClass: 'device-iphone-11-pro-max' },
    { id: 'iphone-12-mini', label: 'iPhone 12 mini', family: 'iphone', pixels: '2340 x 1080', dpi: '476 PPI', viewportClass: 'device-iphone-12-mini' },
    { id: 'iphone-12', label: 'iPhone 12', family: 'iphone', pixels: '2532 x 1170', dpi: '460 PPI', viewportClass: 'device-iphone-12' },
    { id: 'iphone-12-pro', label: 'iPhone 12 Pro', family: 'iphone', pixels: '2532 x 1170', dpi: '460 PPI', viewportClass: 'device-iphone-12-pro' },
    { id: 'iphone-12-pro-max', label: 'iPhone 12 Pro Max', family: 'iphone', pixels: '2778 x 1284', dpi: '458 PPI', viewportClass: 'device-iphone-12-pro-max' },
    { id: 'iphone-13-mini', label: 'iPhone 13 mini', family: 'iphone', pixels: '2340 x 1080', dpi: '476 PPI', viewportClass: 'device-iphone-13-mini' },
    { id: 'iphone-13', label: 'iPhone 13', family: 'iphone', pixels: '2532 x 1170', dpi: '460 PPI', viewportClass: 'device-iphone-13' },
    { id: 'iphone-13-pro', label: 'iPhone 13 Pro', family: 'iphone', pixels: '2532 x 1170', dpi: '460 PPI', viewportClass: 'device-iphone-13-pro' },
    { id: 'iphone-13-pro-max', label: 'iPhone 13 Pro Max', family: 'iphone', pixels: '2796 x 1290', dpi: '458 PPI', viewportClass: 'device-iphone-13-pro-max' },
    { id: 'iphone-14', label: 'iPhone 14', family: 'iphone', pixels: '2532 x 1170', dpi: '460 PPI', viewportClass: 'device-iphone-14' },
    { id: 'iphone-14-plus', label: 'iPhone 14 Plus', family: 'iphone', pixels: '2778 x 1284', dpi: '458 PPI', viewportClass: 'device-iphone-14-plus' },
    { id: 'iphone-14-pro', label: 'iPhone 14 Pro', family: 'iphone', pixels: '2556 x 1179', dpi: '460 PPI', viewportClass: 'device-iphone-14-pro' },
    { id: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max', family: 'iphone', pixels: '2796 x 1290', dpi: '460 PPI', viewportClass: 'device-iphone-14-pro-max' },
    { id: 'iphone-15', label: 'iPhone 15', family: 'iphone', pixels: '2556 x 1179', dpi: '460 PPI', viewportClass: 'device-iphone-15' },
    { id: 'iphone-15-plus', label: 'iPhone 15 Plus', family: 'iphone', pixels: '2796 x 1290', dpi: '460 PPI', viewportClass: 'device-iphone-15-plus' },
    { id: 'iphone-15-pro', label: 'iPhone 15 Pro', family: 'iphone', pixels: '2556 x 1179', dpi: '460 PPI', viewportClass: 'device-iphone-15-pro' },
    { id: 'iphone-15-pro-max', label: 'iPhone 15 Pro Max', family: 'iphone', pixels: '2796 x 1290', dpi: '460 PPI', viewportClass: 'device-iphone-15-pro-max' },
    { id: 'iphone-16', label: 'iPhone 16', family: 'iphone', pixels: '2556 x 1179', dpi: '460 PPI', viewportClass: 'device-iphone-16' },
    { id: 'iphone-16-plus', label: 'iPhone 16 Plus', family: 'iphone', pixels: '2796 x 1290', dpi: '460 PPI', viewportClass: 'device-iphone-16-plus' },
    { id: 'iphone-16-pro', label: 'iPhone 16 Pro', family: 'iphone', pixels: '2622 x 1206', dpi: '460 PPI', viewportClass: 'device-iphone-16-pro' },
    { id: 'iphone-16-pro-max', label: 'iPhone 16 Pro Max', family: 'iphone', pixels: '2868 x 1320', dpi: '460 PPI', viewportClass: 'device-iphone-16-pro-max' },
    { id: 'iphone-17', label: 'iPhone 17', family: 'iphone', pixels: '2622 x 1206', dpi: '460 PPI', viewportClass: 'device-iphone-17' },
    { id: 'iphone-17-pro', label: 'iPhone 17 Pro', family: 'iphone', pixels: '2736 x 1260', dpi: '460 PPI', viewportClass: 'device-iphone-17-pro' },
    { id: 'iphone-17-pro-max', label: 'iPhone 17 Pro Max', family: 'iphone', pixels: '2868 x 1320', dpi: '460 PPI', viewportClass: 'device-iphone-17-pro-max' },
    { id: 'iphone-18', label: 'iPhone 18', family: 'iphone', pixels: '2736 x 1260', dpi: '460 PPI', viewportClass: 'device-iphone-18' },
    { id: 'iphone-air', label: 'iPhone Air', family: 'iphone', pixels: '2736 x 1260', dpi: '460 PPI', viewportClass: 'device-iphone-air' },
    { id: 'ipad-11', label: 'iPad 11"', family: 'ipad', pixels: '2360 x 1640', dpi: '264 PPI', viewportClass: 'device-ipad-11' },
    { id: 'ipad-air-11', label: 'iPad Air 11"', family: 'ipad', pixels: '2360 x 1640', dpi: '264 PPI', viewportClass: 'device-ipad-air-11' },
    { id: 'ipad-air-13', label: 'iPad Air 13"', family: 'ipad', pixels: '2732 x 2048', dpi: '264 PPI', viewportClass: 'device-ipad-air-13' },
    { id: 'ipad-pro-11', label: 'iPad Pro 11"', family: 'ipad', pixels: '2388 x 1668', dpi: '264 PPI', viewportClass: 'device-ipad-pro-11' },
    { id: 'ipad-pro-13', label: 'iPad Pro 13"', family: 'ipad', pixels: '2752 x 2064', dpi: '264 PPI', viewportClass: 'device-ipad-pro-13' },
    { id: 'pixel-8', label: 'Pixel 8', family: 'android', pixels: '2400 x 1080', dpi: '428 PPI', viewportClass: 'device-pixel-8' },
    { id: 'pixel-8-pro', label: 'Pixel 8 Pro', family: 'android', pixels: '2992 x 1344', dpi: '489 PPI', viewportClass: 'device-pixel-8-pro' },
    { id: 'pixel-9', label: 'Pixel 9', family: 'android', pixels: '2424 x 1080', dpi: '422 PPI', viewportClass: 'device-pixel-9' },
    { id: 'pixel-9-pro', label: 'Pixel 9 Pro', family: 'android', pixels: '2856 x 1280', dpi: '495 PPI', viewportClass: 'device-pixel-9-pro' },
    { id: 'galaxy-s24', label: 'Galaxy S24', family: 'android', pixels: '2340 x 1080', dpi: '416 PPI', viewportClass: 'device-galaxy-s24' },
    { id: 'galaxy-s24-ultra', label: 'Galaxy S24 Ultra', family: 'android', pixels: '3120 x 1440', dpi: '505 PPI', viewportClass: 'device-galaxy-s24-ultra' },
    { id: 'android-tablet-10', label: 'Android Tablet 10"', family: 'android-tablet', pixels: '1920 x 1200', dpi: '224 PPI', viewportClass: 'device-android-tablet-10' },
    { id: 'android-tablet-11', label: 'Android Tablet 11"', family: 'android-tablet', pixels: '2000 x 1200', dpi: '224 PPI', viewportClass: 'device-android-tablet-11' },
    { id: 'android-tablet-12', label: 'Android Tablet 12"', family: 'android-tablet', pixels: '2560 x 1600', dpi: '240 PPI', viewportClass: 'device-android-tablet-12' },
    { id: 'android-tablet-14', label: 'Android Tablet 14"', family: 'android-tablet', pixels: '2800 x 1752', dpi: '240 PPI', viewportClass: 'device-android-tablet-14' }
];
exports.IOS_VERSIONS = [
    { id: 'ios-15', label: 'iOS 15', family: 'iphone' },
    { id: 'ios-16', label: 'iOS 16', family: 'iphone' },
    { id: 'ios-17', label: 'iOS 17', family: 'iphone' },
    { id: 'ios-18', label: 'iOS 18', family: 'iphone' },
    { id: 'ipados-16', label: 'iPadOS 16', family: 'ipad' },
    { id: 'ipados-17', label: 'iPadOS 17', family: 'ipad' },
    { id: 'ipados-18', label: 'iPadOS 18', family: 'ipad' },
    { id: 'android-13', label: 'Android 13', family: 'android' },
    { id: 'android-14', label: 'Android 14', family: 'android' },
    { id: 'android-15', label: 'Android 15', family: 'android' },
    { id: 'android-16', label: 'Android 16', family: 'android' },
    { id: 'android-tablet-13', label: 'Android Tablet 13', family: 'android-tablet' },
    { id: 'android-tablet-14', label: 'Android Tablet 14', family: 'android-tablet' }
];
function buildPreviewModel(source, filePath, device, iosVersionId, logoDataUri = '') {
    const activeDevice = device ?? exports.DEVICE_PROFILES[exports.DEVICE_PROFILES.length - 1];
    const hasDefaultExport = /export\s+default/.test(source);
    const status = hasDefaultExport ? 'ready' : 'waiting';
    const platformOS = activeDevice.family === 'android' || activeDevice.family === 'android-tablet' ? 'android' : 'ios';
    let bundle;
    if (status === 'ready') {
        bundle = (0, moduleBundler_1.buildModuleGraph)(filePath, source);
    }
    return {
        fileName: filePath,
        status,
        previewHtml: renderChrome(activeDevice, iosVersionId, logoDataUri, status),
        bundlePayloadJson: bundle ? safeJsonForScript(bundle) : '',
        platformOS
    };
}
function renderChrome(device, iosVersionId, logoDataUri, status) {
    const platformVersions = exports.IOS_VERSIONS.filter((entry) => entry.family === device.family);
    const defaultVersion = platformVersions[platformVersions.length - 1] ?? exports.IOS_VERSIONS[exports.IOS_VERSIONS.length - 1];
    const versionLabel = device.family === 'android' || device.family === 'android-tablet'
        ? 'Android OS'
        : device.family === 'ipad'
            ? 'iPadOS'
            : 'iOS';
    const selectedVersion = platformVersions.find((entry) => entry.id === iosVersionId) ?? defaultVersion;
    const deviceOptions = renderDeviceOptions(device.id);
    const iosOptions = renderOsOptions(versionLabel, platformVersions, selectedVersion.id);
    const body = status === 'ready'
        ? '<div id="rn-root" class="rn-root"></div>'
        : '<div class="phone-empty">Open a `.tsx` file with a component `export default` to render the preview.</div>';
    return [
        '<div class="device-toolbar">',
        '<div class="toolbar-left">',
        '<div class="toolbar-select-group">',
        '<span class="toolbar-label">Device</span>',
        `<label class="toolbar-select-wrap" aria-label="Preview device">${deviceOptions}</label>`,
        '</div>',
        '<div class="toolbar-select-group">',
        `<span class="toolbar-label">${escapeHtml(versionLabel)}</span>`,
        `<label class="toolbar-select-wrap" aria-label="${escapeHtml(versionLabel)}">${iosOptions}</label>`,
        '</div>',
        '</div>',
        '<div class="toolbar-right">',
        '<button class="toolbar-button" data-action="refresh" type="button" aria-label="Refresh preview">↻</button>',
        '<button class="toolbar-button" data-action="settings" type="button" aria-label="Open preview settings">⚙</button>',
        '<button class="toolbar-button" data-action="preview" type="button" aria-label="Open preview">▶</button>',
        '</div>',
        '</div>',
        '<div class="device-shell">',
        `<div class="device-frame ${device.viewportClass}">`,
        '<div class="device-notch"></div>',
        '<div class="device-screen">',
        `<div class="brand-strip"><img class="brand-logo" src="${logoDataUri}" alt="Lexvora Consulting" /><div class="brand-copy"><span class="brand-kicker">LXC React Previewer</span><span class="brand-name">Lexvora Consulting</span></div></div>`,
        '<div class="phone-status">9:41</div>',
        body,
        '</div>',
        '</div>',
        '</div>'
    ].join('');
}
function renderDeviceOptions(selectedId) {
    return [
        '<select class="toolbar-select" data-action="device" aria-label="Preview device">',
        ...exports.DEVICE_PROFILES.map((profile) => `<option value="${profile.id}"${profile.id === selectedId ? ' selected' : ''}>${escapeHtml(profile.label)} · ${escapeHtml(profile.pixels)} · ${escapeHtml(profile.dpi)}</option>`),
        '</select>'
    ].join('');
}
function renderOsOptions(label, options, selectedId) {
    return [
        `<select class="toolbar-select" data-action="ios" aria-label="${escapeHtml(label)}">`,
        ...options.map((entry) => `<option value="${entry.id}"${entry.id === selectedId ? ' selected' : ''}>${escapeHtml(entry.label)}</option>`),
        '</select>'
    ].join('');
}
function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
/**
 * JSON.stringify, plus escaping every `<` so the payload can sit inside a
 * `<script type="application/json">` element without risking a premature `</script>` close
 * (e.g. if the previewed source contains that literal substring in a string or comment).
 */
function safeJsonForScript(value) {
    return JSON.stringify(value).replace(/</g, '\\u003C');
}
//# sourceMappingURL=previewModel.js.map