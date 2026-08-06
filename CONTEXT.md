# Project Context

## Project Name

LXC React Previewer UI

## Owner and Brand

Lexvora Consulting

## Purpose

Build an open-source VS Code extension that previews a React Native `.tsx` screen beside its source code without needing an emulator or simulator.

## Current Direction

The project is in a scaffolded stage and is being prepared for a cleaner installable and eventually marketplace-ready extension workflow.

## Decisions Already Made

- Use VS Code as the target editor
- Ship the extension as a `.vsix`
- Use a webview-based preview experience
- Keep the project open source
- Allow outside contributions
- Keep the implementation focused on React Native UI previewing

## Files That Track Progress

- `README.md`
- `TASKS.md`
- `TODO.md`

## Branding And Legal

- Open-source license: MIT
- Brand owner: Lexvora Consulting
- Logo asset: `assets/lexvora-consulting-logo.svg`

## Contribution Rules

- Keep changes relevant to the previewer
- Update the tracker files when scope changes
- Preserve the Lexvora Consulting attribution
- Prefer small, reviewable commits

## Working Assumptions

- The extension should stay easy to install locally
- The code should remain easy to package and distribute
- The project should remain friendly to contributor input

## Future Maintenance Notes

- If the architecture changes, update this file first
- If the project scope changes, update the README and TODO list
- If the publishing plan changes, record it here before implementation
- If the logo or license changes, update this file and the README together
