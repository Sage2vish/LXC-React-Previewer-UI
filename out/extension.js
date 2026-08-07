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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const previewModel_1 = require("./previewModel");
const DEVICE_PROFILES = [
    { id: 'iphone-14', label: 'iPhone 14', pixels: '1170 x 2532', dpi: '460 PPI', viewportClass: 'device-iphone-14' },
    { id: 'iphone-14-pro', label: 'iPhone 14 Pro', pixels: '1179 x 2556', dpi: '460 PPI', viewportClass: 'device-iphone-14-pro' },
    { id: 'iphone-14-plus', label: 'iPhone 14 Plus', pixels: '1284 x 2778', dpi: '458 PPI', viewportClass: 'device-iphone-14-plus' },
    { id: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max', pixels: '1290 x 2796', dpi: '460 PPI', viewportClass: 'device-iphone-14-pro-max' },
    { id: 'iphone-14-mini', label: 'iPhone 14 mini', pixels: '1080 x 2340', dpi: '476 PPI', viewportClass: 'device-iphone-14-mini' }
];
const state = {};
function activate(context) {
    state.frameworksFolder = context.workspaceState.get('lxcReactPreviewer.frameworksFolder');
    const savedDeviceId = context.workspaceState.get('lxcReactPreviewer.deviceId');
    state.device = DEVICE_PROFILES.find((device) => device.id === savedDeviceId) ?? DEVICE_PROFILES[0];
    const renderDocument = (document) => {
        if (!state.panel) {
            return;
        }
        state.uri = document.uri;
        const activeDevice = state.device ?? DEVICE_PROFILES[0];
        state.panel.webview.html = renderHtml((0, previewModel_1.buildPreviewModel)(document.getText(), document.fileName, state.frameworksFolder, activeDevice), activeDevice, context.extensionUri, state.panel.webview);
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
        state.panel = vscode.window.createWebviewPanel('lxcReactPreviewer', 'LXC React Preview', vscode.ViewColumn.Beside, { enableScripts: true });
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
        const picked = await vscode.window.showQuickPick([
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
        ], {
            placeHolder: 'Preview settings'
        });
        if (!picked) {
            return;
        }
        if (picked.label === 'Preview Device') {
            const deviceChoice = await vscode.window.showQuickPick(DEVICE_PROFILES.map((device) => ({
                label: device.label,
                description: device.pixels,
                detail: device.dpi,
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
function renderHtml(model, device, extensionUri, webview) {
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'assets', 'webview-preview.css'));
    return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src data: https:; script-src 'none';" />
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
    </body>
  </html>`;
}
function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
function deactivate() {
    state.panel?.dispose();
    state.panel = undefined;
    state.uri = undefined;
}
function getBrandLogoUri() {
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
//# sourceMappingURL=extension.js.map