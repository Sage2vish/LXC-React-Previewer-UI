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
  pixels: string;
  dpi: string;
  viewportClass: string;
};

const DEVICE_PROFILES: DeviceProfile[] = [
  { id: 'iphone-11', label: 'iPhone 11', pixels: '1792 x 828', dpi: '326 PPI', viewportClass: 'device-iphone-11' },
  { id: 'iphone-12', label: 'iPhone 12', pixels: '2532 x 1170', dpi: '460 PPI', viewportClass: 'device-iphone-12' },
  { id: 'iphone-13', label: 'iPhone 13', pixels: '2532 x 1170', dpi: '460 PPI', viewportClass: 'device-iphone-13' },
  { id: 'iphone-14', label: 'iPhone 14', pixels: '2532 x 1170', dpi: '460 PPI', viewportClass: 'device-iphone-14' }
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
    if (!editor) {
      vscode.window.showWarningMessage('Please select a .tsx file first.');
      return;
    }

    const document = editor.document;
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
    const editor = vscode.window.activeTextEditor;
    if (!editor || !state.panel) {
      return;
    }

    state.uri = editor.document.uri;
    renderDocument(editor.document);
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
          description: device.pixels,
          detail: device.dpi,
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
