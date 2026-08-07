"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const previewModel_1 = require("./previewModel");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const DEFAULT_IOS_VERSION_ID = 'ios-18';
const state = {};
const BRAND_LOGO_URI = getBrandLogoDataUri();
function activate(context) {
    state.frameworksFolder = context.workspaceState.get('lxcReactPreviewer.frameworksFolder');
    const savedDeviceId = context.workspaceState.get('lxcReactPreviewer.deviceId');
    const savedIosVersionId = context.workspaceState.get('lxcReactPreviewer.iosVersionId');
    state.device = previewModel_1.DEVICE_PROFILES.find((device) => device.id === savedDeviceId) ?? previewModel_1.DEVICE_PROFILES[0];
    state.iosVersionId = savedIosVersionId ?? DEFAULT_IOS_VERSION_ID;
    const renderDocument = (document) => {
        if (!state.panel) {
            return;
        }
        state.uri = document.uri;
        const activeDevice = state.device ?? previewModel_1.DEVICE_PROFILES[0];
        const activeIosVersionId = state.iosVersionId ?? DEFAULT_IOS_VERSION_ID;
        state.panel.webview.html = renderHtml((0, previewModel_1.buildPreviewModel)(document.getText(), document.fileName, activeDevice, activeIosVersionId, BRAND_LOGO_URI), context.extensionUri, state.panel.webview);
    };
    const updatePreview = (document) => {
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
        state.panel = vscode.window.createWebviewPanel('lxcReactPreviewer', 'LXC React Preview', vscode.ViewColumn.Beside, { enableScripts: true });
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
        const picked = await vscode.window.showQuickPick([
            {
                label: 'Preview Device',
                description: state.device?.label ?? 'Current compatibility preset',
                detail: `${state.device?.pixels ?? 'Latest pixel profile'} • ${state.device?.dpi ?? 'Latest PPI profile'}`
            },
            {
                label: 'Frameworks Folder',
                description: state.frameworksFolder ?? 'Not selected yet',
                detail: 'Choose the shared React Native frameworks location'
            }
        ], {
            placeHolder: 'Preview settings'
        });
        if (!picked) {
            return;
        }
        if (picked.label === 'Preview Device') {
            const deviceChoice = await vscode.window.showQuickPick(previewModel_1.DEVICE_PROFILES.map((device) => ({
                label: device.label,
                description: `${device.pixels} • ${device.dpi}`,
                detail: `${device.family.toUpperCase()} preset`,
                device
            })), {
                title: 'Select Preview Device',
                placeHolder: 'Choose the device frame for the preview'
            });
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
    const handleWebviewMessage = (message) => {
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
            const selected = previewModel_1.DEVICE_PROFILES.find((device) => device.id === message.value);
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
            const selected = previewModel_1.IOS_VERSIONS.find((option) => option.id === message.value);
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
function renderHtml(model, extensionUri, webview) {
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'assets', 'webview-preview.css'));
    const reactUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'assets', 'vendor', 'react.production.min.js'));
    const reactDomUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'assets', 'vendor', 'react-dom.production.min.js'));
    const babelUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'assets', 'vendor', 'babel.min.js'));
    const rnRuntimeUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'assets', 'rn-web-runtime.js'));
    const bootstrapUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'assets', 'preview-bootstrap.js'));
    const nonce = String(Date.now()) + Math.random().toString(36).slice(2);
    // 'unsafe-eval' is required so Babel standalone can transpile the previewed
    // .tsx source in-browser and the compiled output can run via `new Function(...)`.
    // Every script tag below (vendored or inline) carries the same nonce, so no other
    // script origin is trusted.
    const csp = `default-src 'none'; style-src ${webview.cspSource}; img-src data: https:; script-src 'nonce-${nonce}' 'unsafe-eval';`;
    const bundleDataScript = model.status === 'ready'
        ? `<script type="application/json" id="lxc-bundle-data">${model.bundlePayloadJson}</script>`
        : '';
    const runBundleScript = model.status === 'ready'
        ? `
      <script nonce="${nonce}">
        (function() {
          var dataEl = document.getElementById('lxc-bundle-data');
          if (!dataEl) { return; }
          var payload = JSON.parse(dataEl.textContent);
          window.__runLxcPreview(payload, 'rn-root', '${model.platformOS}');
        }());
      </script>`
        : '';
    return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Security-Policy" content="${csp}" />
      <link rel="stylesheet" href="${styleUri}" />
    </head>
    <body>
      <div class="frame">
        <div class="mobile-stage">
          <div class="preview">
            ${model.previewHtml}
          </div>
        </div>
      </div>
      ${bundleDataScript}
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
      <script nonce="${nonce}" src="${reactUri}"></script>
      <script nonce="${nonce}" src="${reactDomUri}"></script>
      <script nonce="${nonce}" src="${babelUri}"></script>
      <script nonce="${nonce}" src="${rnRuntimeUri}"></script>
      <script nonce="${nonce}" src="${bootstrapUri}"></script>
      ${runBundleScript}
    </body>
  </html>`;
}
function getBrandLogoDataUri() {
    const candidates = [
        path.join(__dirname, '..', 'assets', 'lexvora-consulting-logo.png'),
        path.join(__dirname, '..', 'assets', 'lexvora-consulting-logo-meta.png')
    ];
    for (const candidate of candidates) {
        if (!fs.existsSync(candidate)) {
            continue;
        }
        const bytes = fs.readFileSync(candidate);
        const extension = path.extname(candidate).toLowerCase();
        const mimeType = extension === '.png' ? 'image/png' : 'image/jpeg';
        return `data:${mimeType};base64,${bytes.toString('base64')}`;
    }
    return '';
}
function deactivate() {
    state.panel?.dispose();
    state.panel = undefined;
    state.uri = undefined;
}
//# sourceMappingURL=extension.js.map