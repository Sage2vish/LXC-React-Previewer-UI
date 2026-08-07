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
exports.buildModuleGraph = buildModuleGraph;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const SOURCE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const ASSET_EXTENSIONS = {
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
function findImportSpecifiers(source) {
    const specifiers = new Set();
    let match;
    IMPORT_SPECIFIER_RE.lastIndex = 0;
    while ((match = IMPORT_SPECIFIER_RE.exec(source))) {
        specifiers.add(match[1]);
    }
    return [...specifiers];
}
function resolveImportPath(fromDir, specifier) {
    const target = path.resolve(fromDir, specifier);
    const ext = path.extname(target);
    const candidates = [];
    if (ext && (SOURCE_EXTENSIONS.includes(ext) || ASSET_EXTENSIONS[ext])) {
        candidates.push(target);
    }
    else {
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
function toModuleId(entryDir, absPath) {
    return path.relative(entryDir, absPath).split(path.sep).join('/');
}
function buildModuleGraph(entryAbsPath, entrySource) {
    const entryDir = path.dirname(entryAbsPath);
    const entryId = toModuleId(entryDir, entryAbsPath);
    const modules = {
        [entryId]: { kind: 'source', code: entrySource },
    };
    const visited = new Set([entryAbsPath]);
    const queue = [{ absPath: entryAbsPath, source: entrySource }];
    let queueGuard = 0;
    while (queue.length > 0 && Object.keys(modules).length < MAX_MODULES && queueGuard < MAX_QUEUE_ENTRIES) {
        queueGuard += 1;
        const current = queue.shift();
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
//# sourceMappingURL=moduleBundler.js.map