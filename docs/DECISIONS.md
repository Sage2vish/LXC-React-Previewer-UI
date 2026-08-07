# Decisions

## Core Decisions

- Target editor: VS Code
- Packaging format: `.vsix`
- Preview model: webview-based
- Public identity: open source
- Brand owner: Lexvora Consulting
- Primary use case: React Native `.tsx` preview beside source

## UX Decisions

- Keep the preview flow helper-like, not editor-like
- Keep the preview command visible in the editor title area
- Keep the frameworks picker out of the file context menu
- Keep device selection and iOS selection inside the preview UI
- Keep the toolbar buttons functional rather than decorative

## Release Decisions

- Keep a single live release line in the docs
- Keep `TASKS.md` updated as work completes
- Keep the changelog and feature map aligned with the release line
- Commit and push verified changes before moving to the next release task

## Current Release Line

- `0.1.6`

