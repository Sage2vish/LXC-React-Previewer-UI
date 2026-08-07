# Project Context

## Project Name

LXC React Previewer UI

## Owner and Brand

Lexvora Consulting

## Purpose

Build an open-source VS Code extension that previews a React Native `.tsx` screen beside its source code without needing an emulator or simulator.

## Current Direction

The project is in a packaged installable stage and is being prepared for a cleaner Marketplace-ready extension workflow.

## Decisions Already Made

- Use VS Code as the target editor
- Ship the extension as a `.vsix`
- Use a webview-based preview experience
- Keep the project open source
- Allow outside contributions
- Keep the implementation focused on React Native UI previewing
- Keep the explorer context action in the top navigation group for `.tsx` files

## Files That Track Progress

- `README.md`
- `TASKS.md`
- `VSCODE_PUBLISH.md`
- `changelog.md`

## Branding And Legal

- Open-source license: MIT
- Brand owner: Lexvora Consulting
- Logo asset: `assets/lexvora-consulting-logo.svg`

## Contribution Rules

- Keep changes relevant to the previewer
- Update the tracker files when scope changes
- Use `TASKS.md` as the single source of truth for planning
- Preserve the Lexvora Consulting attribution
- Prefer small, reviewable commits

## Working Assumptions

- The extension should stay easy to install locally
- The code should remain easy to package and distribute
- The project should remain friendly to contributor input
- Release packages should stay on the same semantic version until a deliberate version bump is approved

## Future Maintenance Notes

- If the architecture changes, update this file first
- If the project scope changes, update the README and `TASKS.md`
- If the publishing plan changes, record it here before implementation
- If the logo or license changes, update this file and the README together
- If a new explorer or editor action is added, keep the task tracker and changelog in sync
