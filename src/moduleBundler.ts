import * as fs from 'fs';
import * as path from 'path';

export type BundleModule = {
  kind: 'source' | 'asset';
  code: string;
};

export type Bundle = {
  entryId: string;
  modules: Record<string, BundleModule>;
};

const SOURCE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const ASSET_EXTENSIONS: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

const MAX_MODULES = 40;
const MAX_QUEUE_ENTRIES = 400;

const IMPORT_SPECIFIER_RE = /(?:import\s+(?:[\s\S]*?\bfrom\s+)?|export\s+(?:\*|\{[^}]*\})\s+from\s+|require\(\s*)['"](\.[^'"]+)['"]/g;

function findImportSpecifiers(source: string): string[] {
  const specifiers = new Set<string>();
  let match: RegExpExecArray | null;
  IMPORT_SPECIFIER_RE.lastIndex = 0;
  while ((match = IMPORT_SPECIFIER_RE.exec(source))) {
    specifiers.add(match[1]);
  }
  return [...specifiers];
}

function resolveImportPath(fromDir: string, specifier: string): string | null {
  const target = path.resolve(fromDir, specifier);
  const ext = path.extname(target);

  const candidates: string[] = [];
  if (ext && (SOURCE_EXTENSIONS.includes(ext) || ASSET_EXTENSIONS[ext])) {
    candidates.push(target);
  } else {
    for (const sourceExt of SOURCE_EXTENSIONS) {
      candidates.push(target + sourceExt);
    }
    for (const sourceExt of SOURCE_EXTENSIONS) {
      candidates.push(path.join(target, 'index' + sourceExt));
    }
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

function toModuleId(entryDir: string, absPath: string): string {
  return path.relative(entryDir, absPath).split(path.sep).join('/');
}

export function buildModuleGraph(entryAbsPath: string, entrySource: string): Bundle {
  const entryDir = path.dirname(entryAbsPath);
  const entryId = toModuleId(entryDir, entryAbsPath);

  const modules: Record<string, BundleModule> = {
    [entryId]: { kind: 'source', code: entrySource },
  };
  const visited = new Set<string>([entryAbsPath]);
  const queue: Array<{ absPath: string; source: string }> = [{ absPath: entryAbsPath, source: entrySource }];
  let queueGuard = 0;

  while (queue.length > 0 && Object.keys(modules).length < MAX_MODULES && queueGuard < MAX_QUEUE_ENTRIES) {
    queueGuard += 1;
    const current = queue.shift()!;
    const fromDir = path.dirname(current.absPath);

    for (const specifier of findImportSpecifiers(current.source)) {
      const resolved = resolveImportPath(fromDir, specifier);
      if (!resolved || visited.has(resolved)) {
        continue;
      }
      visited.add(resolved);
      if (Object.keys(modules).length >= MAX_MODULES) {
        break;
      }

      const id = toModuleId(entryDir, resolved);
      const ext = path.extname(resolved);
      if (ASSET_EXTENSIONS[ext]) {
        const bytes = fs.readFileSync(resolved);
        const dataUri = `data:${ASSET_EXTENSIONS[ext]};base64,${bytes.toString('base64')}`;
        modules[id] = { kind: 'asset', code: dataUri };
        continue;
      }

      const code = fs.readFileSync(resolved, 'utf8');
      modules[id] = { kind: 'source', code };
      queue.push({ absPath: resolved, source: code });
    }
  }

  return { entryId, modules };
}
