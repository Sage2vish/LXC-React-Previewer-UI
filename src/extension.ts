import * as vscode from 'vscode';
import { buildPreviewModel, type PreviewModel } from './previewModel';
import * as fs from 'fs';
import * as path from 'path';

type PreviewState = {
  panel?: vscode.WebviewPanel;
  uri?: vscode.Uri;
  frameworksFolder?: string;
  device?: DeviceProfile;
  iosVersionId?: string;
};

type DeviceProfile = {
  id: string;
  label: string;
  family: 'iphone' | 'ipad' | 'android' | 'android-tablet';
  pixels: string;
  dpi: string;
  viewportClass: string;
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

const IOS_VERSION_OPTIONS = [
  { id: 'ios-15', label: 'iOS 15' },
  { id: 'ios-16', label: 'iOS 16' },
  { id: 'ios-17', label: 'iOS 17' },
  { id: 'ios-18', label: 'iOS 18' }
];

const state: PreviewState = {};
const BRAND_LOGO_URI = getBrandLogoDataUri();

export function activate(context: vscode.ExtensionContext) {
  state.frameworksFolder = context.workspaceState.get<string>('lxcReactPreviewer.frameworksFolder');
  const savedDeviceId = context.workspaceState.get<string>('lxcReactPreviewer.deviceId');
  const savedIosVersionId = context.workspaceState.get<string>('lxcReactPreviewer.iosVersionId');
  state.device = DEVICE_PROFILES.find((device) => device.id === savedDeviceId) ?? DEVICE_PROFILES[0];
  state.iosVersionId = IOS_VERSION_OPTIONS.find((option) => option.id === savedIosVersionId)?.id ?? IOS_VERSION_OPTIONS[IOS_VERSION_OPTIONS.length - 1].id;

  const renderDocument = (document: vscode.TextDocument) => {
    if (!state.panel) {
      return;
    }

    state.uri = document.uri;
    const activeDevice = state.device ?? DEVICE_PROFILES[0];
    const activeIosVersionId = state.iosVersionId ?? IOS_VERSION_OPTIONS[IOS_VERSION_OPTIONS.length - 1].id;
    state.panel.webview.html = renderHtml(
      buildPreviewModel(document.getText(), document.fileName, state.frameworksFolder, activeDevice, activeIosVersionId, BRAND_LOGO_URI),
      activeDevice,
      activeIosVersionId,
      context.extensionUri,
      state.panel.webview
    );
  };

  const updatePreview = (document: vscode.TextDocument) => {
    if (!state.panel || !state.uri) {
      return;
    }

    if (document.uri.toString() !== state.uri.toString()) {
      return;
    }

    renderDocument(document);
  };

  const openPreview = vscode.commands.registerCommand('lxcReactPreviewer.openPreview', async () => {
    const editor = vscode.window.activeTextEditor;
    const document = editor?.document ?? (state.uri ? await vscode.workspace.openTextDocument(state.uri) : undefined);
    if (!document) {
      vscode.window.showWarningMessage('Open a .tsx file to preview.');
      return;
    }

    if (!document.fileName.endsWith('.tsx')) {
      vscode.window.showWarningMessage('This command is intended for .tsx files.');
      return;
    }

    state.uri = document.uri;

    if (state.panel) {
      state.panel.reveal(vscode.ViewColumn.Beside);
      renderDocument(document);
      return;
    }

    state.panel = vscode.window.createWebviewPanel(
      'lxcReactPreviewer',
      'LXC React Preview',
      vscode.ViewColumn.Beside,
      { enableScripts: true }
    );
    state.panel.webview.onDidReceiveMessage(handleWebviewMessage);

    renderDocument(document);

    state.panel.onDidDispose(() => {
      state.panel = undefined;
      state.uri = undefined;
    });
  });

  const refreshPreview = vscode.commands.registerCommand('lxcReactPreviewer.refreshPreview', () => {
    if (!state.panel) {
      return;
    }

    const editor = vscode.window.activeTextEditor;
    const document = editor?.document ?? undefined;
    if (document && document.fileName.endsWith('.tsx')) {
      state.uri = document.uri;
      renderDocument(document);
      return;
    }

    if (state.uri) {
      void vscode.workspace.openTextDocument(state.uri).then((doc) => {
        if (doc.fileName.endsWith('.tsx')) {
          state.uri = doc.uri;
          renderDocument(doc);
        }
      });
    }
  });

  const selectFrameworksFolder = vscode.commands.registerCommand('lxcReactPreviewer.selectFrameworksFolder', async () => {
    const selected = await vscode.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: 'Use this frameworks folder'
    });

    if (!selected || selected.length === 0) {
      return;
    }

    state.frameworksFolder = selected[0].fsPath;
    await context.workspaceState.update('lxcReactPreviewer.frameworksFolder', state.frameworksFolder);
    vscode.window.showInformationMessage(`Frameworks folder set to ${state.frameworksFolder}`);

    if (state.panel && state.uri) {
      const activeDocument = await vscode.workspace.openTextDocument(state.uri);
      renderDocument(activeDocument);
    }
  });

  const openSettings = vscode.commands.registerCommand('lxcReactPreviewer.openSettings', async () => {
    const picked = await vscode.window.showQuickPick(
      [
        {
          label: 'Preview Device',
          description: state.device?.label ?? 'iPhone 14',
          detail: `${state.device?.pixels ?? '1170 x 2532'} • ${state.device?.dpi ?? '460 PPI'}`
        },
        {
          label: 'Frameworks Folder',
          description: state.frameworksFolder ?? 'Not selected yet',
          detail: 'Choose the shared React Native frameworks location'
        }
      ],
      {
        placeHolder: 'Preview settings'
      }
    );

    if (!picked) {
      return;
    }

    if (picked.label === 'Preview Device') {
      const deviceChoice = await vscode.window.showQuickPick(
        DEVICE_PROFILES.map((device) => ({
          label: device.label,
          description: `${device.pixels} • ${device.dpi}`,
          detail: `${device.family.toUpperCase()} preset`,
          device
        })),
        {
          title: 'Select Preview Device',
          placeHolder: 'Choose the device frame for the preview'
        }
      );

      if (!deviceChoice) {
        return;
      }

      state.device = deviceChoice.device;
      await context.workspaceState.update('lxcReactPreviewer.deviceId', state.device.id);
      if (state.panel && state.uri) {
        const activeDocument = await vscode.workspace.openTextDocument(state.uri);
        renderDocument(activeDocument);
      }
      return;
    }

    if (picked.label === 'Frameworks Folder') {
      await vscode.commands.executeCommand('lxcReactPreviewer.selectFrameworksFolder');
    }
  });

  const handleWebviewMessage = (message: { type?: string; value?: string }) => {
    if (!state.panel || !state.uri || !message.type) {
      return;
    }

    if (message.type === 'refresh') {
      vscode.commands.executeCommand('lxcReactPreviewer.refreshPreview');
      return;
    }

    if (message.type === 'settings') {
      vscode.commands.executeCommand('lxcReactPreviewer.openSettings');
      return;
    }

    if (message.type === 'preview') {
      vscode.commands.executeCommand('lxcReactPreviewer.openPreview');
      return;
    }

    if (message.type === 'device' && message.value) {
      const selected = DEVICE_PROFILES.find((device) => device.id === message.value);
      if (!selected) {
        return;
      }

      state.device = selected;
      void context.workspaceState.update('lxcReactPreviewer.deviceId', selected.id);
      if (state.panel && state.uri) {
        void vscode.workspace.openTextDocument(state.uri).then((doc) => renderDocument(doc));
      }
      return;
    }

    if (message.type === 'ios' && message.value) {
      const selected = IOS_VERSION_OPTIONS.find((option) => option.id === message.value);
      if (!selected) {
        return;
      }

      state.iosVersionId = selected.id;
      void context.workspaceState.update('lxcReactPreviewer.iosVersionId', selected.id);
      if (state.panel && state.uri) {
        void vscode.workspace.openTextDocument(state.uri).then((doc) => renderDocument(doc));
      }
    }
  };

  const activeEditorSubscription = vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (!editor || !state.panel) {
      return;
    }

    const document = editor.document;
    if (!document.fileName.endsWith('.tsx')) {
      return;
    }

    state.uri = document.uri;
    renderDocument(document);
  });

  context.subscriptions.push(openPreview, refreshPreview, selectFrameworksFolder, openSettings);
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(updatePreview));
  context.subscriptions.push(activeEditorSubscription);
}

function renderHtml(model: PreviewModel, device: DeviceProfile, iosVersionId: string, extensionUri: vscode.Uri, webview: vscode.Webview): string {
  const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'assets', 'webview-preview.css'));
  const nonce = String(Date.now()) + Math.random().toString(36).slice(2);

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src data: https:; script-src 'nonce-${nonce}';" />
      <link rel="stylesheet" href="${styleUri}" />
    </head>
    <body>
      <div class="frame">
        <div class="mobile-stage">
          <div class="preview ${device.viewportClass}">
            ${model.previewHtml}
          </div>
        </div>
      </div>
      <script nonce="${nonce}">
        (function() {
          const vscode = acquireVsCodeApi();
          const root = document.querySelector('.preview');
          const send = (type, value) => vscode.postMessage({ type, value });

          root.querySelectorAll('select[data-action]').forEach((select) => {
            select.addEventListener('change', (event) => {
              const target = event.currentTarget;
              send(target.dataset.action, target.value);
            });
          });

          root.querySelectorAll('button[data-action]').forEach((button) => {
            button.addEventListener('click', () => {
              send(button.dataset.action);
            });
          });

          root.querySelector('.toolbar-select[data-action="device"]')?.setAttribute('title', 'Phone, pixels, PPI');
          root.querySelector('.toolbar-select[data-action="ios"]')?.setAttribute('title', 'iOS version');
        }());
      </script>
    </body>
  </html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getBrandLogoDataUri(): string {
  const candidates = [
    path.join(__dirname, '..', 'assets', 'lexvora-consulting-logo.png'),
    path.join(__dirname, '..', 'assets', 'lexvora-consulting-logo-meta.png'),
    path.join(__dirname, '..', 'assets', 'lexvora-consulting-logo.svg')
  ];

  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) {
      continue;
    }

    const bytes = fs.readFileSync(candidate);
    const extension = path.extname(candidate).toLowerCase();
    const mimeType = extension === '.png' ? 'image/png' : extension === '.svg' ? 'image/svg+xml' : 'image/jpeg';
    return `data:${mimeType};base64,${bytes.toString('base64')}`;
  }

  return '';
}

export function deactivate() {
  state.panel?.dispose();
  state.panel = undefined;
  state.uri = undefined;
}
