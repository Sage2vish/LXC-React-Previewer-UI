# LXC React Previewer UI

Open-source VS Code extension from Lexvora Consulting for previewing a React Native `.tsx` screen beside its source code without launching an emulator or simulator.

## Marketplace Pitch

Write React Native UI faster. Open a `.tsx` file, preview it beside the code, and keep the workflow inside VS Code.

## What It Does

- Opens a selected React Native `.tsx` file
- Shows a preview panel beside the editor
- Refreshes when the source file is saved
- Keeps the workflow simple for local development
- Avoids emulator and simulator overhead

## Who It Is For

- React Native developers
- VS Code users who want faster UI iteration
- Teams that prefer source-side previewing over device-first testing

## Project Status

- Repository initialized
- GitHub remote connected
- Extension scaffold created
- Installable VSIX package generated
- Core rendering engine still in progress

## Open Source

This project is open source and welcomes contributors.

- Anyone can contribute
- Improvements should stay focused on the previewer
- Issues, pull requests, and documentation help are welcome
- Track major decisions in `CONTEXT.md`
- Track work items and subtasks in `TASKS.md`
- License: `MIT` in `LICENSE`

## Organization

**Lexvora Consulting**

This project is maintained under the Lexvora Consulting brand.

Brand asset:

`assets/lexvora-consulting-logo.svg`

## Supported Development Environments

- macOS development and testing is the current primary setup
- Windows testing and feedback are welcome
- Linux support can be explored later if it helps the extension

## Frameworks Folder Note

If you keep shared packages, SDKs, or local runtime helpers, place them in:

`/Users/SageVish/Documents/Development Work/frameworks`

That folder is intended as a shared workspace for reusable development assets across projects.

## Decisions Already Made

- Target platform: Visual Studio Code
- Packaging format: `.vsix`
- Preview style: extension webview
- Audience: React Native developers
- Release posture: open source
- Maintenance style: contributor-friendly and documented

## Next Milestones

1. Complete the real React Native preview renderer.
2. Add stronger file watching and update logic.
3. Polish the UI and marketplace presentation.
4. Add tests, checks, and packaging validation.
5. Prepare release metadata and publish notes.

## Install Locally

The current repo includes a packaged `.vsix` build for local installation in VS Code.

## Contributing

Read `TASKS.md` before starting work.
Read `CONTEXT.md` for project direction and contribution rules.
Use small commits and keep changes aligned with the previewer goal.
