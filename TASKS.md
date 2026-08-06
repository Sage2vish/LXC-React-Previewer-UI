# Task Plan

## Purpose

This file is the single working backlog for LXC React Previewer UI.
It tracks what has been completed, what is in progress, and what remains before the extension is ready for wider use.

## Status Key

- `[x]` done
- `[ ]` not started
- `[~]` in progress

## 1. Foundation

### 1.1 Repository Setup

- [x] Create the repository
  - [x] Initialize Git
  - [x] Connect the GitHub remote
  - [x] Add baseline project documentation
- [x] Establish the working folder
  - [x] Place the repo in `Documents/Development Work/git-repos/LXC-Repos/LXC-React-Previewer-UI`
  - [x] Keep shared tooling guidance for `Documents/Development Work/frameworks`

### 1.2 Extension Scaffold

- [x] Create the VS Code extension shell
  - [x] Add `package.json`
  - [x] Add TypeScript configuration
  - [x] Add the extension entrypoint
  - [x] Add workspace ignore rules
  - [x] Add build output configuration
- [x] Add initial commands
  - [x] Open preview command
  - [x] Refresh preview command

### 1.3 First Build

- [x] Compile the TypeScript output
  - [x] Generate `out/extension.js`
  - [x] Generate source maps
- [x] Package a local `.vsix`
  - [x] Create manifest files
  - [x] Create package archive

## 2. Product Direction

### 2.1 Project Goal

- [x] Define the core user need
  - [x] Preview a React Native `.tsx` file beside its source
  - [x] Avoid emulator and simulator dependency for the preview path
- [x] Define the target editor
  - [x] Visual Studio Code
  - [x] Installable as a `.vsix`

### 2.2 Brand and Positioning

- [x] Define the public identity
  - [x] Open source
  - [x] Maintained under Lexvora Consulting
  - [x] Contributor-friendly
- [x] Define the release posture
  - [x] Local install first
  - [ ] Marketplace-ready later

### 2.3 User Experience Principles

- [x] Keep the workflow simple
  - [x] Open file
  - [x] Show preview beside the editor
  - [x] Refresh on save
- [ ] Make the preview feel polished
  - [ ] Improve preview layout
  - [ ] Add stronger visual hierarchy
  - [ ] Reduce placeholder behavior

## 3. Preview Experience

### 3.1 Current Preview Shell

- [x] Open the active `.tsx` file
- [x] Show a preview panel beside the editor
- [x] Keep the current file context in memory
- [x] Refresh the panel when the file is saved
- [x] Keep the webview lifecycle and panel state stable
- [x] Render source metadata alongside the preview host

### 3.2 Real Renderer

- [ ] Replace the preview placeholder with a real React Native renderer
  - [ ] Decide the renderer strategy
  - [ ] Evaluate component parsing needs
  - [ ] Determine how props and style should be handled
  - [ ] Support the first useful subset of React Native UI patterns
- [ ] Handle common React Native patterns
  - [ ] Text
  - [ ] View
  - [ ] Image
  - [ ] Scrollable layouts
  - [ ] Basic style props

### 3.3 Update Behavior

- [ ] Improve live refresh behavior
  - [x] Refresh on save
  - [ ] Refresh when switching the active file
  - [x] Keep the preview panel synchronized with the selected source
- [ ] Add error handling
  - [ ] Show useful messages for non-`.tsx` files
  - [ ] Warn when a preview cannot be rendered
  - [ ] Avoid blank or silent failures

## 4. Marketplace Readiness

### 4.1 Public README

- [x] Add a polished README foundation
- [ ] Finalize the marketplace-facing README
  - [ ] Add screenshots
  - [ ] Add installation steps
  - [ ] Add usage steps
  - [ ] Add limitations
  - [ ] Add roadmap
  - [ ] Add support notes

### 4.2 Branding Assets

- [x] Add a license file
- [x] Add a brand logo asset
- [ ] Add marketplace icon assets if needed
- [ ] Polish extension display metadata

### 4.3 Publishing Metadata

- [ ] Add publisher-ready metadata
  - [ ] Confirm display name
  - [ ] Confirm extension identifier
  - [ ] Confirm versioning approach
  - [ ] Confirm category and keywords
- [ ] Prepare publish instructions
- [ ] Validate extension packaging

### 4.4 Marketplace Publishing

- [ ] Prepare the Marketplace release package
  - [ ] Confirm extension name and display name
  - [ ] Confirm publisher account
  - [ ] Confirm repository URL
  - [ ] Confirm license and ownership
  - [ ] Confirm version number for release
- [ ] Prepare Marketplace listing content
  - [ ] Write a concise product summary
  - [ ] Write a long-form description
  - [ ] Add feature highlights
  - [ ] Add usage notes
  - [ ] Add limitations and known issues
  - [ ] Add support and contribution notes
- [ ] Prepare Marketplace visuals
  - [ ] Add extension icon
  - [ ] Add screenshots
  - [ ] Add preview imagery or a short demo
- [ ] Validate Marketplace requirements
  - [ ] Confirm `package.json` metadata
  - [ ] Confirm `README.md` content
  - [ ] Confirm `LICENSE`
  - [ ] Confirm `.vsix` package contents
  - [ ] Confirm extension activation and commands
- [ ] Publish to the VS Code Marketplace
  - [ ] Create or verify publisher identity
  - [ ] Publish the first version
  - [ ] Verify the Marketplace listing
  - [ ] Install the published extension in VS Code
  - [ ] Record the published version and release notes

## 5. Cross-Platform Support

### 5.1 macOS Baseline

- [x] Document macOS as the primary development environment
  - [x] Keep the repo installable on a Mac
  - [x] Record the Mac frameworks folder for shared packages

### 5.2 Windows Review

- [ ] Prepare Windows contributor testing notes
  - [ ] Confirm path handling
  - [ ] Confirm packaging flow
  - [ ] Confirm VS Code install behavior
  - [ ] Confirm contribution steps are clear

### 5.3 Optional Linux Review

- [ ] Review Linux compatibility later
  - [ ] Check file system assumptions
  - [ ] Check packaging assumptions

## 6. Documentation

### 6.1 Core Docs

- [x] Create `README.md`
- [x] Create `CONTEXT.md`
- [x] Create `CONTRIBUTING.md`
- [x] Create `LICENSE`
- [x] Create the Lexvora Consulting logo asset

### 6.2 Project Notes

- [x] Keep one source of truth for planning
- [x] Merge the old `TODO.md` into this file
- [x] Remove any stale references to `TODO.md`
- [ ] Add a release checklist
- [ ] Add screenshots and visual references

### 6.3 Contribution Guidance

- [x] Tell contributors to read the docs first
- [x] Keep major decisions in `CONTEXT.md`
- [x] Keep work items in this file
- [ ] Add a short issue/PR template if needed

## 7. Cleanup And Governance

- [x] Remove the duplicate tracker
- [x] Keep `TASKS.md` as the single backlog file
- [x] Confirm the repo contains no stale TODO references
- [ ] Confirm docs and branding are aligned
- [ ] Commit the documentation set as a coherent update

## 8. Implementation Backlog

### 8.1 Source Import Or Build Out

- [ ] Import the actual application source if available
- [ ] Or implement the missing application source from scratch
- [ ] Decide the minimum viable implementation path

### 8.2 Dependencies And Scripts

- [ ] Identify required dependencies
- [ ] Confirm build scripts
- [ ] Confirm packaging scripts
- [ ] Confirm lint and validation scripts
- [ ] Verify the local toolchain is available in this environment

### 8.3 Quality And Validation

- [ ] Fix lint issues
- [ ] Fix build issues
- [ ] Fix packaging issues
- [ ] Add automated validation where practical
- [ ] Run an end-to-end preview smoke test inside VS Code

### 8.4 Release Path

- [ ] Commit all completed work
- [ ] Push to GitHub
- [ ] Create a release candidate
- [ ] Prepare Marketplace submission notes
- [ ] Keep the GitHub repository synchronized after every meaningful milestone
- [ ] Prepare the Marketplace publish runbook
  - [ ] Verify publisher access
  - [ ] Verify version bump
  - [ ] Verify package contents
  - [ ] Verify listing copy
  - [ ] Verify icon and screenshots
  - [ ] Verify install smoke test
  - [ ] Verify final release notes

## 9. Acceptance Criteria

The project can be considered ready for a first public release when all of the following are true:

- The extension installs in VS Code
- A `.tsx` file can be opened and previewed beside the source
- The preview refreshes reliably after save
- The README presents the project clearly as open source and Lexvora Consulting maintained
- The repo has a license, branding, and contributor guidance
- The packaging flow works from a clean checkout
- The repository is ready for GitHub publishing and future marketplace work
- The Marketplace listing is prepared and publishable
- The extension can be installed from the VS Code Marketplace
- The release notes and listing materials are complete

## 10. Milestones

- Milestone 1: repository scaffold complete
- Milestone 2: preview command opens a side panel
- Milestone 3: preview refreshes on save
- Milestone 4: open-source docs and branding complete
- Milestone 5: Windows contributor notes added
- Milestone 6: packaging and validation complete
- Milestone 7: Marketplace listing prepared
- Milestone 8: GitHub release or publish complete
