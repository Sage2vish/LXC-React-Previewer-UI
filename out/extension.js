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
const state = {};
function activate(context) {
    state.frameworksFolder = context.workspaceState.get('lxcReactPreviewer.frameworksFolder');
    const renderDocument = (document) => {
        if (!state.panel) {
            return;
        }
        state.uri = document.uri;
        state.panel.webview.html = renderHtml((0, previewModel_1.buildPreviewModel)(document.getText(), document.fileName, state.frameworksFolder), context.extensionUri, state.panel.webview);
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
            vscode.window.showWarningMessage('Open a .tsx file first.');
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
    context.subscriptions.push(openPreview, refreshPreview, selectFrameworksFolder);
    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(updatePreview));
    context.subscriptions.push(activeEditorSubscription);
}
function renderHtml(model, extensionUri, webview) {
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
          <div class="preview">
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