export type PreviewModel = {
  fileName: string;
  lineCount: number;
  summary: string;
  status: 'ready' | 'waiting' | 'error';
  errorMessage?: string;
  sourceHtml: string;
  previewHtml: string;
  frameworksLabel: string;
  frameworkHint: string;
};

export type DeviceProfile = {
  id: string;
  label: string;
  pixels: string;
  dpi: string;
  viewportClass: string;
};

export function buildPreviewModel(source: string, fileName: string, frameworksFolder?: string, device?: DeviceProfile): PreviewModel {
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
  const previewHtml = renderPreviewBody(source, frameworksFolder, device);

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

function renderPreviewBody(source: string, frameworksFolder?: string, device?: DeviceProfile): string {
  const deviceLabel = device?.label ?? 'iPhone 14';
  const devicePixels = device?.pixels ?? '1170 x 2532';
  const deviceDpi = device?.dpi ?? '460 PPI';
  const viewportClass = device?.viewportClass ?? 'device-iphone-14';
  const match = source.match(/return\s*\(\s*([\s\S]*?)\s*\);\s*}/m);
  if (!match) {
    return [
      '<div class="device-toolbar">',
      '<div class="toolbar-left">',
      `<span class="toolbar-chip">${escapeHtml(deviceLabel)} · ${escapeHtml(devicePixels)} · ${escapeHtml(deviceDpi)}</span>`,
      '<span class="toolbar-chip muted">Preview up to date</span>',
      '</div>',
      '<div class="toolbar-right">',
      '<span class="toolbar-button">↻</span>',
      '<span class="toolbar-button">⟲</span>',
      '<span class="toolbar-button">⋯</span>',
      '</div>',
      '</div>',
      '<div class="device-shell">',
      `<div class="device-frame ${viewportClass}">`,
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
    `<span class="toolbar-chip">${escapeHtml(deviceLabel)} · ${escapeHtml(devicePixels)} · ${escapeHtml(deviceDpi)}</span>`,
    '<span class="toolbar-chip muted">Preview up to date</span>',
    '</div>',
    '<div class="toolbar-right">',
    '<span class="toolbar-button">↻</span>',
    '<span class="toolbar-button">⟲</span>',
    '<span class="toolbar-button">⋯</span>',
    '</div>',
    '</div>',
    '<div class="device-shell">',
    `<div class="device-frame ${viewportClass}">`,
    '<div class="device-notch"></div>',
    '<div class="device-screen">',
    '<div class="phone-status">9:41</div>',
    structure,
    '</div>',
    '</div>',
    '</div>'
  ].join('');
}

function renderJsxLikeMarkup(jsxSource: string): string {
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

function findFirstReadableText(text: string): string | undefined {
  const words = text.split(/\s+/).filter((part) => part.length > 3);
  return words[0];
}

function findSecondReadableText(text: string, first?: string): string | undefined {
  const words = text.split(/\s+/).filter((part) => part.length > 3 && part !== first);
  return words[0];
}

function extractTagText(source: string, tag: string): string | undefined {
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
