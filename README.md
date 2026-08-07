<table>
  <tr>
    <td width="92" valign="middle">
      <img src="assets/lexvora-consulting-marketplace-logo.png" alt="Lexvora Consulting logo" width="72" />
    </td>
    <td valign="middle">
      <h1>LXC React Previewer UI</h1>
      <p><strong>React Native UI Preview - Inside VS Code</strong></p>
      <p>Preview your <code>.tsx</code> screens directly beside your source code. No simulator. No emulator. Less waiting. More building.</p>
    </td>
  </tr>
</table>

<p align="left">
  <img src="https://img.shields.io/badge/VS%20Code-Extension-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" alt="VS Code Extension" />
  <img src="https://img.shields.io/badge/React%20Native-Preview-38BDF8?style=for-the-badge&logo=react&logoColor=white" alt="React Native Preview" />
  <img src="https://img.shields.io/badge/TypeScript-Strong%20Typing-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Open%20Source-Contributor%20Friendly-2F7D32?style=for-the-badge" alt="Open Source" />
</p>

<p>
  <a href="#what-it-is">What It Is</a> ·
  <a href="#how-it-works">How It Works</a> ·
  <a href="#why-it-feels-faster">Why It Feels Faster</a> ·
  <a href="#sample-previews">Sample Previews</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#supported-scope-v01x">Supported Scope</a> ·
  <a href="#roadmap">Roadmap</a>
</p>

---

## Hero

<p>
  <img src="assets/marketplace-hero.svg" alt="LXC React Previewer UI hero" />
</p>

## What It Is

LXC React Previewer UI is an open-source VS Code extension from Lexvora Consulting that previews React Native <code>.tsx</code> screens beside the source file in the editor.

It is designed for fast UI iteration, a polished local workflow, and a preview experience that feels focused instead of placeholder-driven.

## Key Promise

- Preview source-side in VS Code
- Keep the current file context visible
- Refresh on save
- Avoid emulator and simulator overhead
- Stay open source and contributor-friendly

## How It Works

<table>
  <tr>
    <td align="center"><strong>1</strong><br/>Open a <code>.tsx</code> screen</td>
    <td align="center"><strong>→</strong></td>
    <td align="center"><strong>2</strong><br/>Launch Preview in VS Code</td>
    <td align="center"><strong>→</strong></td>
    <td align="center"><strong>3</strong><br/>Edit and save</td>
    <td align="center"><strong>→</strong></td>
    <td align="center"><strong>4</strong><br/>See the update instantly</td>
    <td align="center"><strong>→</strong></td>
    <td align="center"><strong>5</strong><br/>Iterate faster</td>
  </tr>
</table>

### Workflow Details

- Open any React Native screen
- Run the preview command
- Keep source and preview side by side
- Save the file to refresh the preview
- Use the frameworks folder picker when shared runtime packages live elsewhere

## Why It Feels Faster

<table>
  <tr>
    <td>
      <strong>Instant UI loop</strong><br/>
      See the current screen without waiting on device launches.
    </td>
    <td>
      <strong>Side-by-side context</strong><br/>
      Keep the source and preview together in one editor flow.
    </td>
    <td>
      <strong>No simulator</strong><br/>
      Preview without launching an emulator or device.
    </td>
    <td>
      <strong>.tsx focused</strong><br/>
      Built around React Native screen files, not generic mockups.
    </td>
    <td>
      <strong>Framework aware</strong><br/>
      Works with the shared frameworks folder and local packages.
    </td>
    <td>
      <strong>Local and private</strong><br/>
      Everything runs locally in your VS Code workflow.
    </td>
  </tr>
</table>

## Preview Surface

The extension currently focuses on:

- Source-side preview shell
- Device presets for iPhone, iPad, Android phone, and Android tablet families
- Phone, pixel, and PPI labels in the device picker
- Separate iOS version selector
- Working preview toolbar actions
- Lexvora Consulting branding and visual polish

## Sample Previews

Use the `sample/` tree to compare different layouts and image treatments.

| Sample | Purpose |
| --- | --- |
| [`SamplePreview.tsx`](sample/SamplePreview.tsx) | Baseline editorial card and hero image |
| [`ProfileScreen.tsx`](sample/screens/Profile/ProfileScreen.tsx) | Portrait-style profile layout |
| [`AnalyticsScreen.tsx`](sample/screens/Analytics/AnalyticsScreen.tsx) | Dashboard and chart-style screen |
| [`CommerceScreen.tsx`](sample/screens/Commerce/CommerceScreen.tsx) | Product and pricing layout |
| [`SettingsScreen.tsx`](sample/screens/Settings/SettingsScreen.tsx) | Utility panel and preference list |

### Sample File Tree

```text
sample/
  README.md
  SamplePreview.tsx
  components/
    cards/
      PreviewCard.tsx
  screens/
    Analytics/
      AnalyticsScreen.tsx
    Commerce/
      CommerceScreen.tsx
    Home/
      HomeScreen.tsx
    Profile/
      ProfileScreen.tsx
    Settings/
      SettingsScreen.tsx
```

## What You Should See

When the extension is working correctly, the preview UI should show:

- A branded top area
- A visible device dropdown with an obvious dropdown affordance
- An iOS version selector
- A preview shell that changes shape with the selected device family
- A source-side React Native preview panel
- Live refresh after save

## Getting Started

1. Open the repository in VS Code.
2. Open a `.tsx` file under `sample/`.
3. Run `Preview`.
4. Pick a device preset and iOS version if needed.
5. Save the file and confirm the preview updates.

## Installation

### From source

1. Clone this repository.
2. Build the extension for your local environment.
3. Open the folder in VS Code.
4. Start the extension host and open a `.tsx` file.

### From Marketplace

1. Open the VS Code Marketplace listing.
2. Install the extension.
3. Open a `.tsx` file and run `Preview`.
4. Use `LXC React Previewer: Refresh Preview` when needed.

## Commands

- `Preview`
- `LXC React Previewer: Refresh Preview`
- `LXC React Previewer: Select Frameworks Folder`
- `LXC React Previewer: Preview Settings`

## Frameworks Folder

If your shared React Native runtime packages live separately, keep them here:

`/Users/SageVish/Documents/Development Work/frameworks`

The extension remembers the folder you choose and shows it in the preview shell.

## Supported Scope - `0.1.x`

- `tsx` screens
- React Native preview helper workflow
- Source-side iteration in VS Code
- iPhone, iPad, Android phone, and Android tablet presets
- Phone, pixels, and PPI device labels
- Shared frameworks folder selection

## Limitations

- This is a preview helper, not a full drag-and-drop editor.
- The renderer is still evolving toward broader React Native coverage.
- Some complex React Native patterns may need follow-up rendering work.
- The app stays focused on source-side UI iteration rather than device emulation.

## Roadmap

- Expand renderer coverage for more React Native patterns
- Improve device-family behavior and shell fidelity
- Add more smoke tests and validation checks
- Keep the Marketplace listing polished and current
- Continue refining the sample preview set

## Open Source

This project is open source and maintained under Lexvora Consulting.

- Issues, pull requests, and documentation help are welcome
- Keep major decisions in [`CONTEXT.md`](CONTEXT.md)
- Keep implementation work in [`TASKS.md`](TASKS.md)
- License: [`MIT`](LICENSE)

## Build And Install

Use [`scripts/build-release.sh`](scripts/build-release.sh) with a version like `0.1.6` to stamp metadata, rebuild the extension, and package a matching VSIX.

Use [`scripts/install-release.sh`](scripts/install-release.sh) for the temporary smoke-test profile.

Use [`scripts/install-current.sh`](scripts/install-current.sh) to install the VSIX into your active VS Code profile.

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md) for the release history and unreleased notes.

## Brand System

Lexvora Consulting brand assets live in [`assets/`](assets/), including the marketplace logo, preview branding, and the hero artwork used above.

## Support

- File issues in the GitHub repository
- Open pull requests for fixes, polish, and documentation updates
- Keep repo notes in [`CONTEXT.md`](CONTEXT.md) and work items in [`TASKS.md`](TASKS.md)

---

<table>
  <tr>
    <td><strong>Lexvora Consulting</strong></td>
    <td align="right">LXC React Previewer UI - Preview better. Build faster.</td>
  </tr>
</table>
