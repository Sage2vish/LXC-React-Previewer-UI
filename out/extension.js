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
        state.panel.webview.html = renderHtml((0, previewModel_1.buildPreviewModel)(document.getText(), document.fileName, state.frameworksFolder));
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
function renderHtml(model) {
    const logoUri = getBrandLogoUri();
    return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data: https:; script-src 'none';" />
      <style>
        :root {
          color-scheme: dark;
          --bg: #07111f;
          --panel: rgba(10, 18, 32, 0.88);
          --panel-strong: rgba(13, 22, 39, 0.98);
          --border: rgba(148, 163, 184, 0.2);
          --text: #e5eefb;
          --muted: #8fa3bf;
          --accent: #7dd3fc;
          --accent-soft: rgba(56, 189, 248, 0.16);
          --accent-strong: #38bdf8;
          --success: #4ade80;
          --warning: #fbbf24;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          margin: 0;
          color: var(--text);
          background:
            radial-gradient(circle at top left, rgba(56, 189, 248, 0.16), transparent 28%),
            radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.12), transparent 24%),
            var(--bg);
        }
        .frame {
          padding: 18px;
        }
        .shell {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 16px;
        }
        .card {
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--panel);
          padding: 16px;
          box-shadow: 0 18px 40px rgba(2, 6, 23, 0.35);
          backdrop-filter: blur(12px);
        }
        .hero {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: center;
          padding: 18px 20px;
          background:
            linear-gradient(135deg, rgba(14, 165, 233, 0.18), rgba(15, 23, 42, 0.88)),
            var(--panel);
        }
        .hero-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-mark {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(148, 163, 184, 0.24);
          display: grid;
          place-items: center;
          overflow: hidden;
          flex: 0 0 auto;
        }
        .brand-mark img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero h1 {
          margin: 6px 0 8px;
          font-size: 22px;
          letter-spacing: -0.02em;
        }
        .hero p {
          margin: 0;
          color: #d7e2f2;
          line-height: 1.55;
          max-width: 68ch;
        }
        .hero-meta {
          display: grid;
          gap: 8px;
          justify-items: end;
        }
        .status-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: var(--accent-soft);
          color: #d8f7ff;
          border: 1px solid rgba(56, 189, 248, 0.28);
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--success);
          box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.15);
        }
        pre {
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0;
          font-size: 12.5px;
          line-height: 1.55;
          color: #d2def0;
        }
        .title {
          font-size: 14px;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 8px;
        }
        .meta {
          color: var(--muted);
          font-size: 12px;
          line-height: 1.5;
        }
        .preview {
          min-height: 320px;
          border: 1px dashed rgba(148, 163, 184, 0.3);
          border-radius: 10px;
          padding: 18px;
          background: var(--panel-strong);
        }
        .device-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .toolbar-left,
        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .toolbar-chip,
        .toolbar-button,
        .phone-badge,
        .phone-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.22);
          background: rgba(15, 23, 42, 0.68);
          color: #d7e2f2;
          font-size: 12px;
        }
        .toolbar-chip {
          padding: 6px 10px;
        }
        .toolbar-chip.muted {
          color: var(--muted);
        }
        .toolbar-button,
        .phone-action,
        .phone-badge {
          width: 28px;
          height: 28px;
        }
        .toolbar-button {
          font-size: 15px;
        }
        .toolbar-button:first-child {
          border-color: rgba(96, 165, 250, 0.45);
        }
        .device-shell {
          display: flex;
          justify-content: center;
          padding: 8px 0 0;
        }
        .device-frame {
          width: min(100%, 390px);
          padding: 10px;
          border-radius: 32px;
          background: linear-gradient(180deg, rgba(3, 7, 18, 0.96), rgba(15, 23, 42, 0.92));
          border: 1px solid rgba(148, 163, 184, 0.16);
          box-shadow: 0 28px 56px rgba(2, 6, 23, 0.5);
        }
        .device-notch {
          width: 128px;
          height: 20px;
          margin: 0 auto 10px;
          border-radius: 999px;
          background: rgba(2, 6, 23, 0.95);
          box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.08);
        }
        .device-screen {
          min-height: 560px;
          border-radius: 26px;
          background:
            linear-gradient(180deg, rgba(250, 250, 255, 0.98), rgba(239, 245, 255, 0.96));
          color: #0f172a;
          padding: 18px;
          overflow: hidden;
        }
        .phone-status {
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #111827;
        }
        .phone-chrome {
          display: grid;
          gap: 12px;
        }
        .phone-topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .phone-title {
          display: grid;
          gap: 3px;
        }
        .phone-title-kicker {
          font-size: 12px;
          font-weight: 700;
          color: #2563eb;
        }
        .phone-title-main {
          font-size: 20px;
          font-weight: 800;
          color: #111827;
        }
        .phone-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .phone-action {
          color: #1d4ed8;
          background: rgba(59, 130, 246, 0.08);
        }
        .phone-action.active {
          border-color: rgba(37, 99, 235, 0.5);
          background: rgba(37, 99, 235, 0.12);
        }
        .phone-badge {
          width: 30px;
          height: 30px;
          border-color: rgba(37, 99, 235, 0.4);
          color: #1d4ed8;
          font-weight: 700;
        }
        .phone-card {
          border-radius: 28px;
          background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
          padding: 16px;
          border: 1px solid rgba(226, 232, 240, 0.95);
        }
        .phone-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
        }
        .phone-greeting {
          font-size: 20px;
          font-weight: 800;
          color: #111827;
        }
        .phone-subtext {
          margin-top: 4px;
          color: #6b7280;
          font-size: 13px;
        }
        .phone-ring {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 4px solid rgba(59, 130, 246, 0.18);
          display: grid;
          place-items: center;
          color: #1d4ed8;
          font-weight: 800;
          background: rgba(59, 130, 246, 0.06);
        }
        .phone-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 12px;
        }
        .phone-tile {
          min-height: 84px;
          padding: 12px;
          border-radius: 18px;
          background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
          border: 1px solid rgba(226, 232, 240, 0.96);
          display: grid;
          align-content: start;
          gap: 4px;
        }
        .phone-tile span {
          font-size: 12px;
          color: #6b7280;
        }
        .phone-tile strong {
          font-size: 17px;
          color: #111827;
        }
        .phone-tile small {
          color: #6b7280;
        }
        .phone-tile.accent {
          background: linear-gradient(180deg, #fdf2f8 0%, #fff1f2 100%);
          border-color: rgba(244, 114, 182, 0.2);
        }
        .phone-preview {
          border-radius: 20px;
          padding: 14px;
          background: linear-gradient(180deg, #eff6ff 0%, #ffffff 100%);
          border: 1px solid rgba(191, 219, 254, 0.75);
        }
        .phone-preview-title {
          font-size: 15px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 6px;
        }
        .phone-preview-body {
          color: #374151;
          line-height: 1.5;
          font-size: 13px;
        }
        .phone-preview-meta {
          color: #2563eb;
          margin-top: 8px;
          font-size: 12px;
          font-weight: 700;
        }
        .renderer-note {
          color: var(--muted);
          margin-top: 12px;
        }
        .preview-grid {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          margin-bottom: 14px;
        }
        .metric {
          padding: 12px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.55);
          border: 1px solid rgba(148, 163, 184, 0.18);
        }
        .metric-label {
          display: block;
          font-size: 11px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 6px;
        }
        .metric-value {
          font-size: 16px;
          font-weight: 700;
          color: #f0f9ff;
        }
        .preview h1 {
          margin: 0 0 8px;
          font-size: 24px;
        }
        .preview p {
          margin: 0 0 10px;
          color: #d7e2f2;
          line-height: 1.6;
        }
        .preview ul {
          margin: 12px 0 0;
          padding-left: 18px;
          color: #d7e2f2;
        }
        .preview li {
          margin-bottom: 6px;
        }
        .badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(56, 189, 248, 0.16);
          color: #c8f2ff;
          border: 1px solid rgba(56, 189, 248, 0.35);
          font-size: 12px;
          margin-bottom: 12px;
        }
        .preview-state {
          display: inline-block;
          margin-bottom: 12px;
          font-size: 12px;
          color: ${model.status === 'ready' ? 'var(--success)' : model.status === 'error' ? '#fca5a5' : 'var(--warning)'};
        }
        .grid {
          display: grid;
          gap: 16px;
        }
        .rendered-card {
          padding: 18px;
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.72));
          border: 1px solid rgba(148, 163, 184, 0.16);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }
        .rendered-kicker {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #93c5fd;
          margin-bottom: 10px;
        }
        .rendered-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
        }
        .rendered-chip {
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(96, 165, 250, 0.12);
          border: 1px solid rgba(96, 165, 250, 0.24);
          color: #dbeafe;
          font-size: 12px;
        }
        .preview-empty {
          padding: 12px;
          border-radius: 10px;
          border: 1px dashed rgba(148, 163, 184, 0.25);
          color: #d7e2f2;
        }
        .source-header {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          margin-bottom: 10px;
        }
        .pill {
          font-size: 11px;
          color: #d7e2f2;
          border: 1px solid rgba(148, 163, 184, 0.22);
          padding: 5px 9px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.55);
          white-space: nowrap;
        }
        @media (max-width: 900px) {
          .shell {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="frame">
        <div class="shell">
          <div class="card hero">
            <div class="hero-brand">
              <div class="brand-mark">
                <img src="${logoUri}" alt="Lexvora Consulting logo" />
              </div>
              <div>
              <div class="title" style="margin-bottom: 4px;">LXC React Previewer</div>
                <h1>Source-side preview for React Native UI</h1>
                <p>This shell keeps the current .tsx file visible, shows the source next to a preview panel, and stays ready for the renderer work that comes next.</p>
              </div>
            </div>
            <div class="hero-meta">
              <div class="status-chip"><span class="status-dot"></span>Live preview shell</div>
              <div class="meta" style="text-align: right;">Polished layout and active-file tracking</div>
            </div>
          </div>
          <div class="card grid">
            <div>
              <div class="title">Preview target</div>
              <div class="meta">${model.fileName}</div>
            </div>
            <div>
              <div class="title">Source facts</div>
              <div class="meta">${model.lineCount} lines loaded</div>
            </div>
            <div>
              <div class="title">Render status</div>
              <div class="meta">${model.summary}</div>
            </div>
            <div>
              <div class="title">Frameworks folder</div>
              <div class="meta">${model.frameworksLabel}</div>
            </div>
          </div>
          <div class="card">
            <div class="source-header">
              <div class="title" style="margin: 0;">Source snapshot</div>
              <div class="pill">Live refresh on save</div>
            </div>
            <pre>${model.sourceHtml}</pre>
          </div>
          <div class="card" style="grid-column: 1 / -1;">
            <div class="title">Preview surface</div>
            <div class="preview">
              ${model.previewHtml}
              <div class="preview-grid">
                <div class="metric">
                  <span class="metric-label">File</span>
                  <div class="metric-value">${model.fileName}</div>
                </div>
                <div class="metric">
                  <span class="metric-label">Lines</span>
                  <div class="metric-value">${model.lineCount}</div>
                </div>
                <div class="metric">
                  <span class="metric-label">Mode</span>
                  <div class="metric-value">${model.status}</div>
                </div>
              </div>
              <h1>React Native preview host</h1>
              <p>The extension is now structured for a safer webview lifecycle and live refresh on save. The renderer itself still needs to be replaced with real component execution or a React Native-to-web translation layer.</p>
              <p>${model.frameworkHint}</p>
              <p><strong>Selected file:</strong> ${model.fileName}</p>
              ${model.status === 'error' && model.errorMessage ? `<p style="color: #fca5a5;"><strong>Render issue:</strong> ${escapeHtml(model.errorMessage)}</p>` : ''}
              <ul>
                <li>Tracks the active .tsx file</li>
                <li>Refreshes when that file is saved</li>
                <li>Shows source and preview side by side</li>
                <li>Refreshes when you switch to a different '.tsx' file</li>
              </ul>
            </div>
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
