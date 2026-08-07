#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRAMEWORKS_ENV="/Users/SageVish/Documents/Development Work/frameworks/env.sh"
VERSION=""
TARGET="darwin-arm64"

usage() {
  cat <<'EOF'
Usage: ./build-release.sh <version> [--target darwin-arm64|darwin-x64|...]

Example:
  ./build-release.sh 0.1.5
EOF
}

fail_step() {
  printf '[FAIL] %s\n' "$1" >&2
  exit 1
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      usage
      exit 0
      ;;
    --target)
      shift
      [[ $# -gt 0 ]] || fail_step "Missing value for --target"
      TARGET="$1"
      ;;
    -*)
      fail_step "Unknown option: $1"
      ;;
    *)
      if [[ -n "$VERSION" ]]; then
        fail_step "Only one version argument is allowed"
      fi
      VERSION="$1"
      ;;
  esac
  shift
done

if [[ -z "$VERSION" ]]; then
  usage
  fail_step "Missing version argument"
fi

cd "$ROOT_DIR"

step() {
  printf '\n[%s] %s\n' "$1" "$2"
}

check() {
  printf '[OK] %s\n' "$1"
}

step 1 "Loading shared frameworks environment"
[[ -f "$FRAMEWORKS_ENV" ]] || fail_step "Missing frameworks env: $FRAMEWORKS_ENV"
source "$FRAMEWORKS_ENV"
check "Shared frameworks environment loaded"

step 2 "Checking tools"
command -v node >/dev/null 2>&1 || fail_step "node is not available"
command -v corepack >/dev/null 2>&1 || fail_step "corepack is not available"
printf 'node: %s\n' "$(command -v node)"
printf 'corepack: %s\n' "$(command -v corepack)"
printf 'node version: '
node -v
printf 'pnpm version: '
corepack pnpm -v
check "Tools are ready"

step 3 "Installing dependencies"
corepack pnpm install --frozen-lockfile --reporter append-only
check "Dependencies installed"

step 4 "Stamping release version"
node - <<'NODE' "$VERSION"
const fs = require('fs');
const version = process.argv[2];

const pkgPath = './package.json';
const manifestPath = './extension.vsixmanifest';

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.version = version;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

let manifest = fs.readFileSync(manifestPath, 'utf8');
manifest = manifest.replace(/Version="[^"]+"/, `Version="${version}"`);
fs.writeFileSync(manifestPath, manifest);
console.log(`version stamped: ${version}`);
NODE
check "Release version stamped"

step 5 "Building extension"
corepack pnpm run build
check "Build completed"

step 6 "Verifying release"
node -e "const expected=process.argv[1]; const pkg=require('./package.json'); if (pkg.version !== expected) { console.error('Expected version ' + expected + ' but found ' + pkg.version); process.exit(1); } console.log('version: ok (' + expected + ')');" "$VERSION"
node - <<'NODE'
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const command = pkg.contributes?.commands?.find((entry) => entry.command === 'lxcReactPreviewer.openPreview');
if (!command) throw new Error('openPreview command not found');
if (command.title !== 'Preview') throw new Error(`Expected title Preview, got ${command.title}`);
if (!command.icon || command.icon.dark !== 'assets/icons-all-size/icon-16.png') throw new Error('Asset-backed icon not wired');
const editorTitleMenu = pkg.contributes?.menus?.['editor/title'] || [];
const openPreviewMenu = editorTitleMenu.find((entry) => entry.command === 'lxcReactPreviewer.openPreview');
if (!openPreviewMenu) throw new Error('editor/title menu item missing');
if (!openPreviewMenu.icon || openPreviewMenu.icon.dark !== 'assets/icons-all-size/icon-16.png') throw new Error('editor/title menu icon not wired');
console.log('preview command: ok');
NODE
check "Release checks passed"

step 7 "Packaging VSIX"
mkdir -p release
npx @vscode/vsce package --target "$TARGET" --out "release/LXC-React-Previewer-UI-${VERSION}.vsix"
check "VSIX packaged"

printf '\n[100%%] Done.\n'
printf 'Built VSIX: release/LXC-React-Previewer-UI-%s.vsix\n' "$VERSION"
printf 'Target platform: %s\n' "$TARGET"
