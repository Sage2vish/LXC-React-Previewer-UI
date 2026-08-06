import * as vscode from 'vscode';

let currentPanel: vscode.WebviewPanel | undefined;
let currentUri: vscode.Uri | undefined;

export function activate(context: vscode.ExtensionContext) {
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

    currentUri = document.uri;

    if (currentPanel) {
      currentPanel.reveal(vscode.ViewColumn.Beside);
      currentPanel.webview.html = renderHtml(document.getText(), document.fileName);
      return;
    }

    currentPanel = vscode.window.createWebviewPanel(
      'lxcReactPreviewer',
      'LXC React Preview',
      vscode.ViewColumn.Beside,
      { enableScripts: true }
    );

    currentPanel.webview.html = renderHtml(document.getText(), document.fileName);

    currentPanel.onDidDispose(() => {
      currentPanel = undefined;
    });
  });

  const refreshPreview = vscode.commands.registerCommand('lxcReactPreviewer.refreshPreview', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !currentPanel) {
      return;
    }

    currentPanel.webview.html = renderHtml(editor.document.getText(), editor.document.fileName);
  });

  context.subscriptions.push(openPreview, refreshPreview);
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((document) => {
      if (!currentPanel || !currentUri) {
        return;
      }

      if (document.uri.toString() !== currentUri.toString()) {
        return;
      }

      currentPanel.webview.html = renderHtml(document.getText(), document.fileName);
    })
  );
}

function renderHtml(source: string, fileName: string): string {
  const escapedSource = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        :root {
          color-scheme: dark;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          margin: 0;
          padding: 18px;
          color: #e5e7eb;
          background:
            radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 32%),
            radial-gradient(circle at top right, rgba(14, 165, 233, 0.12), transparent 28%),
            #0f172a;
        }
        .shell {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 14px;
        }
        .card {
          border: 1px solid #334155;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.92);
          padding: 16px;
          box-shadow: 0 12px 30px rgba(2, 6, 23, 0.35);
          backdrop-filter: blur(10px);
        }
        pre {
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: #cbd5e1;
        }
        .title {
          font-size: 14px;
          font-weight: 700;
          color: #93c5fd;
          margin-bottom: 8px;
        }
        .meta {
          color: #94a3b8;
          font-size: 12px;
        }
        .preview {
          min-height: 320px;
          border: 1px dashed rgba(148, 163, 184, 0.35);
          border-radius: 10px;
          padding: 18px;
          background: rgba(15, 23, 42, 0.6);
        }
        .preview h1 {
          margin: 0 0 8px;
          font-size: 24px;
        }
        .preview p {
          margin: 0 0 10px;
          color: #cbd5e1;
          line-height: 1.6;
        }
        .badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(59, 130, 246, 0.18);
          color: #bfdbfe;
          border: 1px solid rgba(59, 130, 246, 0.35);
          font-size: 12px;
          margin-bottom: 12px;
        }
        @media (max-width: 900px) {
          .shell {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="shell">
        <div class="card">
          <div class="title">Preview target</div>
          <div class="meta">${fileName}</div>
        </div>
        <div class="card">
          <div class="title">Source snapshot</div>
          <pre>${escapedSource || 'No source content loaded.'}</pre>
        </div>
        <div class="card" style="grid-column: 1 / -1;">
          <div class="title">Preview surface</div>
          <div class="preview">
            <div class="badge">Live preview placeholder</div>
            <h1>React Native preview host</h1>
            <p>This extension is now wired for live refresh on save. The next step is to replace this placeholder with a real renderer for the selected component tree.</p>
            <p><strong>Selected file:</strong> ${fileName}</p>
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
