<p align="center">
  <img src="assets/lexvora-consulting-marketplace-logo.png" alt="Lexvora Consulting marketplace logo" width="72" />
</p>

<h1 align="center">LXC React Previewer UI</h1>

<p align="center">
  <strong>Source-side preview for React Native UI, brought to you by Lexvora Consulting.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/VS%20Code-Extension-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code Extension" />
  <img src="https://img.shields.io/badge/React%20Native-Preview-38BDF8?style=for-the-badge&logo=react&logoColor=white" alt="React Native Preview" />
  <img src="https://img.shields.io/badge/Lexvora%20Consulting-Brand%20System-b88445?style=for-the-badge" alt="Lexvora Consulting Brand System" />
</p>

<p align="center">
  <a href="#what-it-is">What It Is</a> ·
  <a href="#feature-highlights">Feature Highlights</a> ·
  <a href="#preview-workflow">Preview Workflow</a> ·
  <a href="#sample-test-case">Sample Test Case</a> ·
  <a href="#changelog">Changelog</a> ·
  <a href="#contributing">Contributing</a>
</p>

| Platform | Package | Brand | Focus |
| --- | --- | --- | --- |
| Visual Studio Code | `.vsix` | Lexvora Consulting | React Native `.tsx` |

---

## What It Is

LXC React Previewer UI is an open-source VS Code extension that previews a React Native `.tsx` screen beside its source code without needing an emulator or simulator.

It is designed for fast UI iteration, a cleaner local workflow, and a more visually focused development loop.

## Feature Highlights

- **Source-Side Preview** — Select a `.tsx` file and keep the preview directly beside the source so the design flow stays tight, visual, and easy to follow.
- **Save-to-Refresh Workflow** — Make changes, save once, and keep the preview panel aligned with the current file without losing context or momentum.
- **Lexvora Branding** — The extension ships with local Lexvora Consulting branding assets so the experience feels owned, premium, and consistent.
- **Sample Test Surface** — A `sample/` tree is included so preview behavior can be checked on nested files instead of only a single flat example.
- **Brand Tokens** — The shared brand CSS lives in [`assets/marketplace-style.css`](assets/marketplace-style.css) and mirrors the Lexvora Consulting palette used in the web presence.

**Built for:** React Native UI previews · Source-side iteration · VS Code workflow speed · Local development clarity

**Intended feel:** High signal · Low friction · Clean visual separation · Deliberate presentation

**Brand promise:** Open source · Maintained under Lexvora Consulting · Contributor-friendly · Easy to resume and extend

## Visual Style

The project aims for a polished, dramatic GitHub presence and a preview shell that feels intentional rather than placeholder-driven — dark depth, bright accents, wide spacing, and strong contrast, so the repo feels like a premium product page rather than a bare scaffold.

**Design goals:**

- Bold, high-contrast presentation
- Clear source-and-preview side-by-side layout
- Strong visual hierarchy
- Clean open-source branding
- A workflow that feels fast and deliberate

**Product shape:**

- Select a `.tsx` file
- Show the preview beside the source
- Refresh on save
- Keep the current file context in memory
- Stay ready for a richer React Native renderer

## Preview Workflow

1. Select a `.tsx` file
2. Run the preview command
3. Inspect source and preview side by side
4. Save the file and watch it refresh

### Commands

- `Preview`
- `LXC React Previewer: Refresh Preview`
- `LXC React Previewer: Select Frameworks Folder`

## Installation

### From source

1. Clone this repository.
2. Run the extension build steps for your local environment.
3. Open the folder in VS Code and start the extension host.
4. Open any `.tsx` file and launch `Preview`.

### From Marketplace

1. Open the Visual Studio Code Marketplace entry.
2. Install the extension in VS Code.
3. Open a `.tsx` file and choose `Preview`.
4. Use `LXC React Previewer: Refresh Preview` whenever you want to re-sync the view.

## Usage

1. Open a React Native `.tsx` screen.
2. Run `Preview`.
3. Keep the preview side by side with the source.
4. Save the file to refresh the preview.
5. Use `LXC React Previewer: Select Frameworks Folder` if your shared runtime packages live elsewhere.

### Current Behavior

**Working today:**

- Opens the active `.tsx` file and anchors the preview beside it
- Shows the source and preview together for faster UI iteration
- Keeps the preview tied to the selected file context
- Refreshes the preview when the file is saved
- Stores the selected shared frameworks folder for reuse
- Displays source metadata and brand cues in the preview shell
- Uses the local Lexvora logo assets for consistent branding

**Still in progress:**

- Real React Native renderer
- Preview refresh when switching files
- Better error handling for unsupported cases
- Automated smoke tests
- Marketplace publishing prep
- Marketplace icon and final listing polish

## Sample Test Case

Use the `sample/` tree to validate the preview experience.

**Why it exists:**

- Gives you a visible test workspace
- Lets you try nested file paths
- Makes manual preview checks repeatable

**What it proves:**

- The command works
- The preview panel opens
- The saved file refreshes
- Nested React source stays usable

| Sample Root | Nested Files | Goal |
| --- | --- | --- |
| `sample/` | React source anywhere below it | Preview workflow sanity check |

### Try It

1. Open the repository in VS Code.
2. Open a `.tsx` file under `sample/`.
3. Run `Preview`.
4. Confirm the preview opens beside the editor.
5. Save the file and confirm the preview refreshes.
6. Repeat with a nested file such as `sample/screens/Home/HomeScreen.tsx`.

### Sample Files

- [`sample/README.md`](sample/README.md)
- [`sample/SamplePreview.tsx`](sample/SamplePreview.tsx)
- [`sample/screens/Home/HomeScreen.tsx`](sample/screens/Home/HomeScreen.tsx)
- [`sample/components/cards/PreviewCard.tsx`](sample/components/cards/PreviewCard.tsx)

## Frameworks Folder

If your React Native runtime or shared packages live separately, keep them in:

`/Users/SageVish/Documents/Development Work/frameworks`

The extension remembers the folder you choose with `LXC React Previewer: Select Frameworks Folder` and shows it in the preview shell.

## Project Snapshot

**Finished:**

- Repository and GitHub remote
- Extension scaffold
- First build and package
- Core product direction
- Preview shell and save refresh
- Sample test content
- Brand and documentation base

**Next major work:**

- Real renderer
- Better live update behavior
- Smoke tests
- Marketplace-facing polish
- Packaging and publish prep

| Repository Mood | Current Priority | Current State |
| --- | --- | --- |
| Premium, focused, and extendable | Renderer, tests, and marketplace prep | Ready to iterate |

## Open Source

This project is open source and welcomes contributors.

> The goal is to make the preview workflow feel fast, beautiful, and practical.

- Improvements should stay focused on the previewer
- Issues, pull requests, and documentation help are welcome
- Track major decisions in [`CONTEXT.md`](CONTEXT.md)
- Track work items and subtasks in [`TASKS.md`](TASKS.md)
- License: [`MIT`](LICENSE)

## Limitations

- The preview shell is focused on source-side workflow and not a full device emulator.
- The renderer is still evolving toward richer React Native execution coverage.
- Nested or unsupported UI patterns may need follow-up rendering work.
- Marketplace visuals are intentionally text-first in this repo so the README stays stable without fragile image dependencies.

## Roadmap

- Finish the full mobile-style preview shell polish.
- Expand React Native rendering coverage for more component patterns.
- Improve toolbar controls and state feedback in the preview host.
- Add more automated smoke and packaging checks before each release.
- Publish the extension and keep the Marketplace listing current.

## Support

- File issues in the GitHub repository.
- Open pull requests for fixes, polish, and documentation improvements.
- Keep repo notes in [`CONTEXT.md`](CONTEXT.md) and work items in [`TASKS.md`](TASKS.md).
- If you use a shared frameworks folder, set it through `LXC React Previewer: Select Frameworks Folder`.

## Local Rebuild Script

Use [`build-release.sh`](scripts/build-release.sh) with a version like `0.1.6` to stamp the metadata, rebuild the extension, and package a matching VSIX.

Use [`install-release.sh`](scripts/install-release.sh) with the same version to uninstall the existing VS Code extension if present and install the newly built VSIX.

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md) for the release history and unreleased notes.

## Organization

**Lexvora Consulting**

This project is maintained under the Lexvora Consulting brand.

Brand asset: [`assets/lexvora-consulting-logo.png`](assets/lexvora-consulting-logo.png)

## Supported Development Environments

- macOS development and testing is the current primary setup
- Windows testing and feedback are welcome
- Linux support can be explored later if it helps the extension

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
3. Add tests, checks, and packaging validation.
4. Prepare release metadata and publish notes.
5. Continue polishing the README and marketplace story.

## Contributing

Read [`TASKS.md`](TASKS.md) before starting work.
Read [`CONTEXT.md`](CONTEXT.md) for project direction and contribution rules.
Use small commits and keep changes aligned with the previewer goal.
