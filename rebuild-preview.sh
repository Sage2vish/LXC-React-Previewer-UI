#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRAMEWORKS_ENV="/Users/SageVish/Documents/Development Work/frameworks/env.sh"
EXPECTED_VERSION="0.1.4"
INSTALL_EXTENSION="false"

for arg in "$@"; do
  case "$arg" in
    --install)
      INSTALL_EXTENSION="true"
      ;;
    -*)
      fail_step "Unknown option: $arg"
      ;;
    *)
      EXPECTED_VERSION="$arg"
      ;;
  esac
done

TOTAL_STEPS=5
CURRENT_STEP=0

step() {
  CURRENT_STEP=$((CURRENT_STEP + 1))
  local pct=$((CURRENT_STEP * 100 / TOTAL_STEPS))
  printf '\n[%d%%] %s\n' "$pct" "$1"
}

done_step() {
  printf '[OK] %s\n' "$1"
}

fail_step() {
  printf '[FAIL] %s\n' "$1" >&2
  exit 1
}

cd "$ROOT_DIR"

printf 'Checklist:\n'
printf '1. Load shared Mac frameworks env\n'
printf '2. Confirm Node and pnpm are available\n'
printf '3. Install dependencies from pnpm-lock.yaml\n'
printf '4. Build the extension\n'
printf '5. Verify version and preview command wiring\n'
printf 'Expected release version: %s\n' "$EXPECTED_VERSION"
printf 'Install after build: %s\n' "$INSTALL_EXTENSION"

step "Loading shared frameworks environment"
[[ -f "$FRAMEWORKS_ENV" ]] || fail_step "Missing frameworks env: $FRAMEWORKS_ENV"
source "$FRAMEWORKS_ENV"
done_step "Shared frameworks environment loaded"

step "Checking tools"
command -v node >/dev/null 2>&1 || fail_step "node is not available"
command -v corepack >/dev/null 2>&1 || fail_step "corepack is not available"
printf 'node: %s\n' "$(command -v node)"
printf 'corepack: %s\n' "$(command -v corepack)"
printf 'node version: '
node -v
printf 'npm-compatible pnpm via corepack: '
corepack pnpm -v
done_step "Tools are ready"

step "Installing dependencies"
corepack pnpm install --frozen-lockfile --reporter append-only
done_step "Dependencies installed"

step "Building extension"
corepack pnpm run build
done_step "Build completed"

step "Verifying release"
node -e "const expected=process.argv[1]; const pkg=require('./package.json'); if (pkg.version !== expected) { console.error('Expected version ' + expected + ' but found ' + pkg.version); process.exit(1); } console.log('version: ok (' + expected + ')');" "$EXPECTED_VERSION"
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
done_step "Release checks passed"

if [[ "$INSTALL_EXTENSION" == "true" ]]; then
  TOTAL_STEPS=6
  step "Installing into VS Code"
  EXT_DIR="$HOME/.vscode/extensions/sage2vish.lxc-react-previewer-ui-$EXPECTED_VERSION"
  if [[ -d "$EXT_DIR" ]]; then
    find "$EXT_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  fi
  mkdir -p "$EXT_DIR"
  cp package.json extension.vsixmanifest README.md CHANGELOG.md CONTEXT.md TASKS.md VSCODE_PUBLISH.md FEATURES.md LICENSE "$EXT_DIR"/
  cp -R assets sample out "$EXT_DIR"/
  done_step "Extension files copied into VS Code install folder"
fi

printf '\n[100%%] Done. Reload VS Code or restart the Extension Development Host, then test the Preview button.\n'
printf 'Run example: ./rebuild-preview.sh 0.1.4\n'
printf 'Install example: ./rebuild-preview.sh 0.1.4 --install\n'
