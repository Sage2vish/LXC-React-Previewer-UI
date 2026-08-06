import * as vscode from 'vscode';

type PreviewState = {
  panel?: vscode.WebviewPanel;
  uri?: vscode.Uri;
};

const state: PreviewState = {};

export function activate(context: vscode.ExtensionContext) {
  const updatePreview = (document: vscode.TextDocument) => {
    if (!state.panel || !state.uri) {
      return;
    }

    if (document.uri.toString() !== state.uri.toString()) {
      return;
    }

    state.panel.webview.html = renderHtml(document.getText(), document.fileName, state.panel.webview.cspSource);
  };

  const openPreview = vscode.commands.registerCommand('lxcReactPreviewer.openPreview', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('Open a .tsx file first.');
      return;
    }

    const document = editor.document;
    if (!/\.(tsx|ts)$/.test(document.fileName)) {
      vscode.window.showWarningMessage('This command is intended for .tsx files.');
      return;
    }

    state.uri = document.uri;

    if (state.panel) {
      state.panel.reveal(vscode.ViewColumn.Beside);
      state.panel.webview.html = renderHtml(document.getText(), document.fileName, state.panel.webview.cspSource);
      return;
    }

    state.panel = vscode.window.createWebviewPanel(
      'lxcReactPreviewer',
      'LXC React Preview',
      vscode.ViewColumn.Beside,
      { enableScripts: true }
    );

    state.panel.webview.html = renderHtml(document.getText(), document.fileName, state.panel.webview.cspSource);

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
    state.panel.webview.html = renderHtml(editor.document.getText(), editor.document.fileName, state.panel.webview.cspSource);
  });

  context.subscriptions.push(openPreview, refreshPreview);
  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(updatePreview));
}

function renderHtml(source: string, fileName: string, cspSource: string): string {
  const escapedSource = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const lineCount = source ? source.split(/\r?\n/).length : 0;
  const previewSummary = source.includes('export default') ? 'Default export detected' : 'Source loaded and waiting for a renderer';

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${cspSource} 'unsafe-inline'; img-src ${cspSource} https: data:; script-src 'none';" />
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
          --accent-strong: #38bdf8;
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
          padding: 20px;
        }
        .shell {
          display: grid;
          grid-template-columns: 280px 1fr;
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
        pre {
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0;
          font-size: 13px;
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
        .grid {
          display: grid;
          gap: 16px;
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
          <div class="card grid">
            <div>
              <div class="title">Preview target</div>
              <div class="meta">${fileName}</div>
            </div>
            <div>
              <div class="title">Source facts</div>
              <div class="meta">${lineCount} lines loaded</div>
            </div>
            <div>
              <div class="title">Render status</div>
              <div class="meta">${previewSummary}</div>
            </div>
          </div>
          <div class="card">
            <div class="source-header">
              <div class="title" style="margin: 0;">Source snapshot</div>
              <div class="pill">Live refresh on save</div>
            </div>
            <pre>${escapedSource || 'No source content loaded.'}</pre>
          </div>
          <div class="card" style="grid-column: 1 / -1;">
            <div class="title">Preview surface</div>
            <div class="preview">
              <div class="badge">Preview host placeholder</div>
              <h1>React Native preview host</h1>
              <p>The extension is now structured for a safer webview lifecycle and live refresh on save. The renderer itself still needs to be replaced with real component execution or a React Native-to-web translation layer.</p>
              <p><strong>Selected file:</strong> ${fileName}</p>
              <ul>
                <li>Tracks the active `.tsx` file</li>
                <li>Refreshes when that file is saved</li>
                <li>Shows source and preview side by side</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>`;
}

export function deactivate() {
  currentPanel?.dispose();
  currentPanel = undefined;
}
