import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

type PreviewState = {
  panel?: vscode.WebviewPanel;
  uri?: vscode.Uri;
  frameworksFolder?: string;
};

type PreviewModel = {
  fileName: string;
  lineCount: number;
  summary: string;
  status: 'ready' | 'waiting' | 'error';
  errorMessage?: string;
  sourceHtml: string;
  previewHtml: string;
  frameworksLabel: string;
  frameworkHint: string;
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
      buildPreviewModel(document.getText(), document.fileName, state.frameworksFolder)
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

export function buildPreviewModel(source: string, fileName: string, frameworksFolder?: string): PreviewModel {
  const escapedSource = source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const lineCount = source ? source.split(/\r?\n/).length : 0;
  const previewSummary = source.includes('export default') ? 'Default export detected' : 'Source loaded and waiting for a renderer';
  const fileStem = fileName.split(/[\\/]/).pop() ?? fileName;
  const accentState = source.includes('export default') ? 'ready' : 'waiting';
  const frameworksLabel = frameworksFolder ?? 'Not selected yet';
  const frameworkHint = frameworksFolder
    ? 'This folder can provide the shared React Native framework and package root for preview work.'
    : 'Use the command palette to select your React Native frameworks folder.';
  const previewHtml = renderPreviewBody(source, frameworksFolder);

  return {
    fileName,
    lineCount,
    summary: previewSummary,
    status: accentState,
    sourceHtml: escapedSource || 'No source content loaded.',
    previewHtml,
    frameworksLabel,
    frameworkHint
  };
}

function renderPreviewBody(source: string, frameworksFolder?: string): string {
  const match = source.match(/return\s*\(\s*([\s\S]*?)\s*\);\s*}/m);
  if (!match) {
    return [
      '<div class="badge">Preview host placeholder</div>',
      '<div class="preview-state">Waiting for a JSX return block</div>',
      '<p>The file loaded, but no renderable JSX return block was found. Open a component with a `return (...)` body to render a basic preview.</p>',
      `<p>${frameworksFolder ? 'Frameworks folder selected.' : 'Select your React Native frameworks folder to help the preview path.'}</p>`
    ].join('');
  }

  const jsxSource = match[1].trim();
  const structure = renderJsxLikeMarkup(jsxSource);
  return [
    '<div class="badge">Basic JSX renderer</div>',
    '<div class="preview-state">Rendered from the current `.tsx` source</div>',
    structure,
    '<p>The renderer supports a practical subset of React Native layout primitives so the sample screen can be previewed without a device emulator.</p>'
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

  const heading = extractTagText(stripped, 'Text');
  const hero = extractTagText(stripped, 'SafeAreaView') || extractTagText(stripped, 'View');
  const imageAlt = stripped.includes('<Image') ? 'Image block detected' : 'No image block detected';

  return [
    '<div class="preview-grid">',
    `<div class="metric"><span class="metric-label">Root</span><div class="metric-value">${escapeHtml(hero || 'View')}</div></div>`,
    `<div class="metric"><span class="metric-label">Title</span><div class="metric-value">${escapeHtml(heading || 'Text')}</div></div>`,
    `<div class="metric"><span class="metric-label">Media</span><div class="metric-value">${escapeHtml(imageAlt)}</div></div>`,
    '</div>',
    '<div class="rendered-card">',
    `<div class="rendered-kicker">Lexvora Consulting</div>`,
    `<h1>${escapeHtml(heading || 'React Native preview')}</h1>`,
    `<p>${escapeHtml(textContent || 'Rendered JSX content from the active file.')}</p>`,
    '<div class="rendered-row">',
    '<div class="rendered-chip">SafeAreaView</div>',
    '<div class="rendered-chip">View</div>',
    '<div class="rendered-chip">Text</div>',
    '<div class="rendered-chip">ScrollView</div>',
    '</div>',
    '</div>'
  ].join('');
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

function renderHtml(model: PreviewModel): string {
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

export function deactivate() {
  state.panel?.dispose();
  state.panel = undefined;
  state.uri = undefined;
}

function getBrandLogoUri(): string {
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
