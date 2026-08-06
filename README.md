# LXC React Previewer UI

<p align="center">
  <img src="assets/lexvora-consulting-logo.svg" alt="Lexvora Consulting" width="180" />
</p>

<p align="center">
  <strong>Source-side React Native preview for VS Code</strong>
</p>

<p align="center">
  <a href="#what-it-is">What It Is</a> ·
  <a href="#visual-style">Visual Style</a> ·
  <a href="#preview-workflow">Preview Workflow</a> ·
  <a href="#sample-test-case">Sample Test Case</a> ·
  <a href="#contributing">Contributing</a>
</p>

<div align="center">

<table>
  <tr>
    <td align="center">
      <strong>Platform</strong><br/>Visual Studio Code
    </td>
    <td align="center">
      <strong>Package</strong><br/>`.vsix`
    </td>
    <td align="center">
      <strong>Brand</strong><br/>Lexvora Consulting
    </td>
    <td align="center">
      <strong>Focus</strong><br/>React Native `.tsx`
    </td>
  </tr>
</table>

</div>

---

## What It Is

LXC React Previewer UI is an open-source VS Code extension that previews a React Native `.tsx` screen beside its source code without needing an emulator or simulator.

It is designed for fast UI iteration, a cleaner local workflow, and a more visually focused development loop.

## Visual Style

The project aims for a polished, dramatic GitHub presence and a preview shell that feels intentional rather than placeholder-driven.

<table>
  <tr>
    <td width="50%">

### Design Goals

- Bold, high-contrast presentation
- Clear source-and-preview side-by-side layout
- Strong visual hierarchy
- Clean open-source branding
- A workflow that feels fast and deliberate

    </td>
    <td width="50%">

### Product Shape

- Open a `.tsx` file
- Show the preview beside the source
- Refresh on save
- Keep the current file context in memory
- Stay ready for a richer React Native renderer

    </td>
  </tr>
</table>

## Preview Workflow

<div align="center">

<table>
  <tr>
    <td align="center"><strong>1</strong><br/>Open a `.tsx` file</td>
    <td align="center"><strong>2</strong><br/>Run the preview command</td>
    <td align="center"><strong>3</strong><br/>Inspect source and preview side by side</td>
    <td align="center"><strong>4</strong><br/>Save the file and watch it refresh</td>
  </tr>
</table>

</div>

### Commands

- `LXC React Previewer: Open Preview`
- `LXC React Previewer: Refresh Preview`
- `LXC React Previewer: Select Frameworks Folder`

### Current Behavior

<table>
  <tr>
    <td width="50%">

#### Working Today

- Opens the active `.tsx` file
- Shows a preview panel beside the editor
- Keeps the panel tied to the selected file
- Refreshes when the file is saved
- Stores a shared frameworks folder selection
- Displays source metadata in the preview shell

    </td>
    <td width="50%">

#### Still In Progress

- Real React Native renderer
- Preview refresh when switching files
- Better error handling for unsupported cases
- Automated smoke tests
- Marketplace publishing prep

    </td>
  </tr>
</table>

## Sample Test Case

Use the `sample/` tree to validate the preview experience.

<div align="center">

<table>
  <tr>
    <td align="center"><strong>Sample Root</strong><br/>`sample/`</td>
    <td align="center"><strong>Nested Files</strong><br/>React source anywhere below it</td>
    <td align="center"><strong>Goal</strong><br/>Preview workflow sanity check</td>
  </tr>
</table>

</div>

### Try It

1. Open the repository in VS Code.
2. Open a `.tsx` file under `sample/`.
3. Run `LXC React Previewer: Open Preview`.
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

<table>
  <tr>
    <td width="50%">

### Finished

- Repository and GitHub remote
- Extension scaffold
- First build and package
- Core product direction
- Preview shell and save refresh
- Sample test content
- Brand and documentation base

    </td>
    <td width="50%">

### Next Major Work

- Real renderer
- Better live update behavior
- Smoke tests
- Marketplace-facing polish
- Packaging and publish prep

    </td>
  </tr>
</table>

## Open Source

This project is open source and welcomes contributors.

- Improvements should stay focused on the previewer
- Issues, pull requests, and documentation help are welcome
- Track major decisions in [`CONTEXT.md`](CONTEXT.md)
- Track work items and subtasks in [`TASKS.md`](TASKS.md)
- License: [`MIT`](LICENSE)

## Organization

**Lexvora Consulting**

This project is maintained under the Lexvora Consulting brand.

Brand asset:

[`assets/lexvora-consulting-logo.svg`](assets/lexvora-consulting-logo.svg)

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

