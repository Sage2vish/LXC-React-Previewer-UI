"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPreviewModel = buildPreviewModel;
const DEVICE_PROFILES = [
    { id: 'iphone-11', label: 'iPhone 11', pixels: '1792 x 828', dpi: '326 PPI', viewportClass: 'device-iphone-11' },
    { id: 'iphone-12', label: 'iPhone 12', pixels: '2532 x 1170', dpi: '460 PPI', viewportClass: 'device-iphone-12' },
    { id: 'iphone-13', label: 'iPhone 13', pixels: '2532 x 1170', dpi: '460 PPI', viewportClass: 'device-iphone-13' },
    { id: 'iphone-14', label: 'iPhone 14', pixels: '2532 x 1170', dpi: '460 PPI', viewportClass: 'device-iphone-14' }
];
const IOS_VERSIONS = [
    { id: 'ios-15', label: 'iOS 15' },
    { id: 'ios-16', label: 'iOS 16' },
    { id: 'ios-17', label: 'iOS 17' },
    { id: 'ios-18', label: 'iOS 18' }
];
function buildPreviewModel(source, fileName, frameworksFolder, device, iosVersionId) {
    const escapedSource = source
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    const lineCount = source ? source.split(/\r?\n/).length : 0;
    const previewSummary = source.includes('export default') ? 'Default export detected' : 'Source loaded and waiting for a renderer';
    const accentState = source.includes('export default') ? 'ready' : 'waiting';
    const frameworksLabel = frameworksFolder ?? 'Not selected yet';
    const frameworkHint = frameworksFolder
        ? 'This folder can provide the shared React Native framework and package root for preview work.'
        : 'Use the command palette to select your React Native frameworks folder.';
    const previewHtml = renderPreviewBody(source, frameworksFolder, device, iosVersionId);
    return {
        fileName,
        lineCount,
        summary: previewSummary,
        status: accentState,
        sourceHtml: escapedSource || 'No source content loaded.',
        previewHtml,
        frameworksLabel,
        frameworkHint
    };
}
function renderPreviewBody(source, frameworksFolder, device, iosVersionId) {
    const activeDevice = device ?? DEVICE_PROFILES[DEVICE_PROFILES.length - 1];
    const iosVersion = IOS_VERSIONS.find((entry) => entry.id === iosVersionId) ?? IOS_VERSIONS[IOS_VERSIONS.length - 1];
    const deviceOptions = renderDeviceOptions(activeDevice.id);
    const iosOptions = renderIosOptions(iosVersion.id);
    const match = source.match(/return\s*\(\s*([\s\S]*?)\s*\);\s*}/m);
    if (!match) {
        return [
            '<div class="device-toolbar">',
            '<div class="toolbar-left">',
            `<label class="toolbar-select-wrap" aria-label="Preview device">${deviceOptions}</label>`,
            `<label class="toolbar-select-wrap" aria-label="iOS version">${iosOptions}</label>`,
            '</div>',
            '<div class="toolbar-right">',
            '<button class="toolbar-button" data-action="refresh" type="button" aria-label="Refresh preview">↻</button>',
            '<button class="toolbar-button" data-action="settings" type="button" aria-label="Open preview settings">⚙</button>',
            '<button class="toolbar-button" data-action="preview" type="button" aria-label="Open preview">▶</button>',
            '</div>',
            '</div>',
            '<div class="device-shell">',
            `<div class="device-frame ${activeDevice.viewportClass}">`,
            '<div class="device-notch"></div>',
            '<div class="device-screen">',
            '<div class="phone-empty">Open a `.tsx` file with a `return (...)` block to render the preview.</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
    const jsxSource = match[1].trim();
    const structure = renderJsxLikeMarkup(jsxSource);
    return [
        '<div class="device-toolbar">',
        '<div class="toolbar-left">',
        `<label class="toolbar-select-wrap" aria-label="Preview device">${deviceOptions}</label>`,
        `<label class="toolbar-select-wrap" aria-label="iOS version">${iosOptions}</label>`,
        '</div>',
        '<div class="toolbar-right">',
        '<button class="toolbar-button" data-action="refresh" type="button" aria-label="Refresh preview">↻</button>',
        '<button class="toolbar-button" data-action="settings" type="button" aria-label="Open preview settings">⚙</button>',
        '<button class="toolbar-button" data-action="preview" type="button" aria-label="Open preview">▶</button>',
        '</div>',
        '</div>',
        '<div class="device-shell">',
        `<div class="device-frame ${activeDevice.viewportClass}">`,
        '<div class="device-notch"></div>',
        '<div class="device-screen">',
        '<div class="phone-status">9:41</div>',
        structure,
        '</div>',
        '</div>',
        '</div>'
    ].join('');
}
function renderDeviceOptions(selectedId) {
    return [
        '<select class="toolbar-select" data-action="device" aria-label="Preview device">',
        ...DEVICE_PROFILES.map((profile) => `<option value="${profile.id}"${profile.id === selectedId ? ' selected' : ''}>${escapeHtml(profile.label)} · ${escapeHtml(profile.pixels)} · ${escapeHtml(profile.dpi)}</option>`),
        '</select>'
    ].join('');
}
function renderIosOptions(selectedId) {
    return [
        '<select class="toolbar-select" data-action="ios" aria-label="iOS version">',
        ...IOS_VERSIONS.map((entry) => `<option value="${entry.id}"${entry.id === selectedId ? ' selected' : ''}>${escapeHtml(entry.label)}</option>`),
        '</select>'
    ].join('');
}
function renderJsxLikeMarkup(jsxSource) {
    const stripped = jsxSource
        .replace(/^\s*import[\s\S]*?from\s+['"][^'"]+['"];?/gm, '')
        .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '')
        .trim();
    if (!stripped) {
        return '<div class="preview-empty">No JSX markup found.</div>';
    }
    const textContent = stripped
        .replace(/<[^>]+>/g, ' ')
        .replace(/\{[^}]*\}/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const heading = extractTagText(stripped, 'Text') || findFirstReadableText(textContent);
    const hero = extractTagText(stripped, 'SafeAreaView') || extractTagText(stripped, 'View');
    const imageAlt = stripped.includes('<Image') ? 'Image block detected' : 'No image block detected';
    const subtitle = findSecondReadableText(textContent, heading);
    return [
        '<div class="phone-chrome">',
        '<div class="phone-topbar">',
        '<div class="phone-title">',
        `<span class="phone-title-kicker">LXC React Previewer</span>`,
        `<span class="phone-title-main">${escapeHtml(heading || 'Sample preview')}</span>`,
        '</div>',
        '<div class="phone-actions">',
        '<span class="phone-action">⌕</span>',
        '<span class="phone-action">⟳</span>',
        '<span class="phone-action active">⟲</span>',
        '<span class="phone-badge">4</span>',
        '<span class="phone-badge">5</span>',
        '</div>',
        '</div>',
        '<div class="phone-card">',
        '<div class="phone-card-header">',
        '<div>',
        '<div class="phone-greeting">Good Morning 👋</div>',
        '<div class="phone-subtext">Let\'s track your health today</div>',
        '</div>',
        '<div class="phone-ring">73%</div>',
        '</div>',
        '<div class="phone-grid">',
        '<div class="phone-tile"><span>Daily Activity</span><strong>7,345</strong><small>steps</small></div>',
        '<div class="phone-tile"><span>Heart Rate</span><strong>72</strong><small>bpm</small></div>',
        '<div class="phone-tile"><span>Sleep</span><strong>7h 30m</strong><small>today</small></div>',
        '<div class="phone-tile accent"><span>Upcoming</span><strong>Doctor Appointment</strong><small>10:30 AM</small></div>',
        '</div>',
        '<div class="phone-preview">',
        `<div class="phone-preview-title">${escapeHtml(heading || 'React Native preview')}</div>`,
        `<div class="phone-preview-body">${escapeHtml(subtitle || textContent || 'Rendered JSX content from the active file.')}</div>`,
        `<div class="phone-preview-meta">${escapeHtml(hero || 'View')} · ${escapeHtml(imageAlt)}</div>`,
        '</div>',
        '</div>'
    ].join('');
}
function findFirstReadableText(text) {
    const words = text.split(/\s+/).filter((part) => part.length > 3);
    return words[0];
}
function findSecondReadableText(text, first) {
    const words = text.split(/\s+/).filter((part) => part.length > 3 && part !== first);
    return words[0];
}
function extractTagText(source, tag) {
    const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'm');
    const match = source.match(regex);
    if (!match) {
        return undefined;
    }
    return match[1]
        .replace(/<[^>]+>/g, ' ')
        .replace(/\{[^}]*\}/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
//# sourceMappingURL=previewModel.js.map
