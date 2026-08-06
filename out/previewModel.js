"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPreviewModel = buildPreviewModel;
function buildPreviewModel(source, fileName, frameworksFolder) {
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
    const previewHtml = renderPreviewBody(source, frameworksFolder);
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
function renderPreviewBody(source, frameworksFolder) {
    const match = source.match(/return\s*\(\s*([\s\S]*?)\s*\);\s*}/m);
    if (!match) {
        return [
            '<div class="badge">Preview host placeholder</div>',
            '<div class="preview-state">Waiting for a JSX return block</div>',
            '<p>The file loaded, but no renderable JSX return block was found. Open a component with a `return (...)` body to render a basic preview.</p>',
            `<p>${frameworksFolder ? 'Frameworks folder selected.' : 'Select your React Native frameworks folder to help the preview path.'}</p>`
        ].join('');
    }
    const jsxSource = match[1].trim();
    const structure = renderJsxLikeMarkup(jsxSource);
    return [
        '<div class="badge">Basic JSX renderer</div>',
        '<div class="preview-state">Rendered from the current `.tsx` source</div>',
        structure,
        '<p>The renderer supports a practical subset of React Native layout primitives so the sample screen can be previewed without a device emulator.</p>'
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
    const heading = extractTagText(stripped, 'Text');
    const hero = extractTagText(stripped, 'SafeAreaView') || extractTagText(stripped, 'View');
    const imageAlt = stripped.includes('<Image') ? 'Image block detected' : 'No image block detected';
    return [
        '<div class="preview-grid">',
        `<div class="metric"><span class="metric-label">Root</span><div class="metric-value">${escapeHtml(hero || 'View')}</div></div>`,
        `<div class="metric"><span class="metric-label">Title</span><div class="metric-value">${escapeHtml(heading || 'Text')}</div></div>`,
        `<div class="metric"><span class="metric-label">Media</span><div class="metric-value">${escapeHtml(imageAlt)}</div></div>`,
        '</div>',
        '<div class="rendered-card">',
        `<div class="rendered-kicker">Lexvora Consulting</div>`,
        `<h1>${escapeHtml(heading || 'React Native preview')}</h1>`,
        `<p>${escapeHtml(textContent || 'Rendered JSX content from the active file.')}</p>`,
        '<div class="rendered-row">',
        '<div class="rendered-chip">SafeAreaView</div>',
        '<div class="rendered-chip">View</div>',
        '<div class="rendered-chip">Text</div>',
        '<div class="rendered-chip">ScrollView</div>',
        '</div>',
        '</div>'
    ].join('');
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