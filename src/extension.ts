import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { buildPreviewModel, type PreviewModel } from './previewModel';

type PreviewState = {
  panel?: vscode.WebviewPanel;
  uri?: vscode.Uri;
  frameworksFolder?: string;
};

const state: PreviewState = {};

export function activate(context: vscode.ExtensionContext) {
  state.frameworksFolder = context.workspaceState.get<string>('lxcReactPreviewer.frameworksFolder');

  const renderDocument = (document: vscode.TextDocument) => {
    if (!state.panel) {
      return;
    }

    state.uri = document.uri;
    state.panel.webview.html = renderHtml(
      buildPreviewModel(document.getText(), document.fileName, state.frameworksFolder),
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

    state.panel = vscode.window.createWebviewPanel(
      'lxcReactPreviewer',
      'LXC React Preview',
      vscode.ViewColumn.Beside,
      { enableScripts: true }
    );

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

function renderHtml(model: PreviewModel, extensionUri: vscode.Uri, webview: vscode.Webview): string {
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
        <div class="shell">
          <div class="card hero">
            <div class="hero-brand">
              <div class="brand-mark">
                <img src="${logoUri}" alt="Lexvora Consulting logo" />
              </div>
              <div class="hero-copy">
                <div class="title hero-kicker">LXC React Previewer</div>
                <h1>Source-side preview for React Native UI</h1>
                <p>This shell keeps the current .tsx file visible, shows the source next to a preview panel, and stays ready for the renderer work that comes next.</p>
              </div>
            </div>
            <div class="hero-meta">
              <div class="status-chip"><span class="status-dot"></span>Live preview shell</div>
              <div class="meta hero-note">Polished layout and active-file tracking</div>
            </div>
          </div>
          <div class="card grid meta-grid">
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
              <div class="title source-title">Source snapshot</div>
              <div class="pill">Live refresh on save</div>
            </div>
            <pre>${model.sourceHtml}</pre>
          </div>
          <div class="card preview-card">
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
              ${model.status === 'error' && model.errorMessage ? `<p class="render-error"><strong>Render issue:</strong> ${escapeHtml(model.errorMessage)}</p>` : ''}
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function deactivate() {
  state.panel?.dispose();
  state.panel = undefined;
  state.uri = undefined;
}

function getBrandLogoUri(): string {
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
