#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION=""
EXTENSION_ID="sage2vish-career.lxc-react-previewer-ui"
CODE_BIN=""
USER_DATA_DIR="/private/tmp/lxc-react-previewer-ui-code-user-data"
EXTENSIONS_DIR="/private/tmp/lxc-react-previewer-ui-code-extensions"
CODE_HOME="/private/tmp/lxc-react-previewer-ui-code-home"

usage() {
  cat <<'EOF'
Usage: ./install-release.sh <version>

Example:
  ./install-release.sh 0.1.5
EOF
}

fail_step() {
  printf '[FAIL] %s\n' "$1" >&2
  exit 1
}

for arg in "$@"; do
  case "$arg" in
    -h|--help)
      usage
      exit 0
      ;;
    -*)
      fail_step "Unknown option: $arg"
      ;;
    *)
      if [[ -n "$VERSION" ]]; then
        fail_step "Only one version argument is allowed"
      fi
      VERSION="$arg"
      ;;
  esac
done

if [[ -z "$VERSION" ]]; then
  usage
  fail_step "Missing version argument"
fi

VSIX_PATH="$ROOT_DIR/release/LXC-React-Previewer-UI-${VERSION}.vsix"

[[ -f "$VSIX_PATH" ]] || fail_step "Missing VSIX: $VSIX_PATH"

if command -v code >/dev/null 2>&1; then
  CODE_BIN="$(command -v code)"
elif [[ -x "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" ]]; then
  CODE_BIN="/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"
elif [[ -x "/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/bin/code" ]]; then
  CODE_BIN="/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/bin/code"
else
  fail_step "code CLI is not available. Open VS Code once or add the command to PATH."
fi

printf 'Extension ID: %s\n' "$EXTENSION_ID"
printf 'VSIX path: %s\n' "$VSIX_PATH"
printf 'Code binary: %s\n' "$CODE_BIN"
printf 'User data dir: %s\n' "$USER_DATA_DIR"
printf 'Extensions dir: %s\n' "$EXTENSIONS_DIR"
printf 'Temp HOME: %s\n' "$CODE_HOME"

mkdir -p "$USER_DATA_DIR" "$EXTENSIONS_DIR" "$CODE_HOME"

if HOME="$CODE_HOME" "$CODE_BIN" --user-data-dir "$USER_DATA_DIR" --extensions-dir "$EXTENSIONS_DIR" --list-extensions | grep -Fxq "$EXTENSION_ID"; then
  printf '[OK] Existing extension found, uninstalling first...\n'
  HOME="$CODE_HOME" "$CODE_BIN" --user-data-dir "$USER_DATA_DIR" --extensions-dir "$EXTENSIONS_DIR" --uninstall-extension "$EXTENSION_ID"
else
  printf '[OK] Extension not currently installed\n'
fi

printf '[OK] Installing %s\n' "$VSIX_PATH"
HOME="$CODE_HOME" "$CODE_BIN" --user-data-dir "$USER_DATA_DIR" --extensions-dir "$EXTENSIONS_DIR" --install-extension "$VSIX_PATH" --force
printf '[OK] Installation complete\n'
