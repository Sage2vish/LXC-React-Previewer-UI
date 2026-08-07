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
  logoDataUri: string;
};

export type DeviceProfile = {
  id: string;
  label: string;
  family: 'iphone' | 'ipad' | 'android' | 'android-tablet';
  pixels: string;
  dpi: string;
  viewportClass: string;
};

export type IosVersionProfile = {
  id: string;
  label: string;
  family: DeviceProfile['family'];
};

const DEVICE_PROFILES: DeviceProfile[] = [
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

const IOS_VERSIONS: IosVersionProfile[] = [
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

export function buildPreviewModel(
  source: string,
  fileName: string,
  frameworksFolder?: string,
  device?: DeviceProfile,
  iosVersionId?: string,
  logoDataUri = ''
): PreviewModel {
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
  const previewHtml = renderPreviewBody(source, frameworksFolder, device, iosVersionId, logoDataUri);

  return {
    fileName,
    lineCount,
    summary: previewSummary,
    status: accentState,
    sourceHtml: escapedSource || 'No source content loaded.',
    previewHtml,
    frameworksLabel,
    frameworkHint,
    logoDataUri
  };
}

function renderPreviewBody(source: string, frameworksFolder?: string, device?: DeviceProfile, iosVersionId?: string, logoDataUri = ''): string {
  const activeDevice = device ?? DEVICE_PROFILES[DEVICE_PROFILES.length - 1];
  const platformVersions = IOS_VERSIONS.filter((entry) => entry.family === activeDevice.family);
  const defaultVersion = platformVersions[platformVersions.length - 1] ?? IOS_VERSIONS[IOS_VERSIONS.length - 1];
  const versionLabel = activeDevice.family === 'android'
    ? 'Android OS'
    : activeDevice.family === 'ipad'
      ? 'iPadOS'
      : 'iOS';
  const selectedVersion = platformVersions.find((entry) => entry.id === iosVersionId) ?? defaultVersion;
  const deviceOptions = renderDeviceOptions(activeDevice.id);
  const iosOptions = renderOsOptions(versionLabel, platformVersions, selectedVersion.id);
  const match = source.match(/return\s*\(\s*([\s\S]*?)\s*\);\s*}/m);
  if (!match) {
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
      `<div class="device-frame ${activeDevice.viewportClass}">`,
      '<div class="device-notch"></div>',
      '<div class="device-screen">',
      `<div class="brand-strip"><img class="brand-logo" src="${logoDataUri}" alt="Lexvora Consulting" /><div class="brand-copy"><span class="brand-kicker">LXC React Previewer</span><span class="brand-name">Lexvora Consulting</span></div></div>`,
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
    `<div class="device-frame ${activeDevice.viewportClass}">`,
    '<div class="device-notch"></div>',
    '<div class="device-screen">',
    `<div class="brand-strip"><img class="brand-logo" src="${logoDataUri}" alt="Lexvora Consulting" /><div class="brand-copy"><span class="brand-kicker">LXC React Previewer</span><span class="brand-name">Lexvora Consulting</span></div></div>`,
    '<div class="phone-status">9:41</div>',
    structure,
    '</div>',
    '</div>',
    '</div>'
  ].join('');
}

function renderDeviceOptions(selectedId: string): string {
  return [
    '<select class="toolbar-select" data-action="device" aria-label="Preview device">',
    ...DEVICE_PROFILES.map((profile) => `<option value="${profile.id}"${profile.id === selectedId ? ' selected' : ''}>${escapeHtml(profile.label)} · ${escapeHtml(profile.pixels)} · ${escapeHtml(profile.dpi)}</option>`),
    '</select>'
  ].join('');
}

function renderOsOptions(label: string, options: IosVersionProfile[], selectedId: string): string {
  return [
    `<select class="toolbar-select" data-action="ios" aria-label="${escapeHtml(label)}">`,
    ...options.map((entry) => `<option value="${entry.id}"${entry.id === selectedId ? ' selected' : ''}>${escapeHtml(entry.label)}</option>`),
    '</select>'
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
