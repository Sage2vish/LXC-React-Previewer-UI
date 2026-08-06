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

### 1.4 Foundation Status

- [x] Foundation work completed
  - [x] Repository setup complete
  - [x] Extension scaffold complete
  - [x] Initial build and package created

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
  - [x] Marketplace-ready later

### 2.3 User Experience Principles

- [x] Keep the workflow simple
  - [x] Open file
  - [x] Show preview beside the editor
  - [x] Refresh on save
- [x] Make the preview feel polished
  - [x] Improve preview layout
  - [x] Add stronger visual hierarchy
  - [x] Reduce placeholder behavior

### 2.4 Product Direction Status

- [x] Core product goal defined
- [x] VS Code and `.vsix` target established
- [x] Open-source Lexvora Consulting identity established
- [x] Basic workflow defined
- [x] Marketplace-ready release posture defined
- [x] Preview polish work completed

## 3. Preview Experience

### 3.1 Current Preview Shell

- [x] Open the active `.tsx` file
- [x] Show a preview panel beside the editor
- [x] Keep the current file context in memory
- [x] Refresh the panel when the file is saved
- [x] Keep the webview lifecycle and panel state stable
- [x] Render source metadata alongside the preview host
- [x] Add a sample `.tsx` screen for testing
  - [x] Create `sample/SamplePreview.tsx`
  - [x] Allow nested sample source structure
  - [x] Add nested sample React files
  - [x] Document how to open it in VS Code
  - [x] Document the visible preview check
- [x] Add the React Native frameworks picker
  - [x] Let the user choose a frameworks folder
  - [x] Store the frameworks folder in extension state
  - [x] Surface the selected folder in the preview shell
  - [x] Document the shared frameworks folder path
- [x] Add a visible preview icon in the top-left of the shell
  - [x] Use branded Lexvora Consulting styling
  - [x] Keep the icon visible in the preview panel

### 3.2 Real Renderer

- [x] Replace the preview placeholder with a practical React Native renderer
  - [x] Decide the renderer strategy
  - [x] Evaluate component parsing needs
  - [x] Determine how props and style should be handled
  - [x] Support the first useful subset of React Native UI patterns
- [x] Handle common React Native patterns
  - [x] Text
  - [x] View
  - [x] Image
  - [x] Scrollable layouts
  - [x] Basic style props

### 3.3 Update Behavior

- [x] Improve live refresh behavior
  - [x] Refresh on save
  - [x] Refresh when switching the active file
  - [x] Keep the preview panel synchronized with the selected source
- [x] Add error handling
  - [x] Show useful messages for non-`.tsx` files
  - [x] Warn when a preview cannot be rendered
  - [x] Avoid blank or silent failures

### 3.4 Self-Test And Smoke Check

- [x] Add at least one basic automated test
  - [x] Decide the test runner
  - [x] Add a smoke test for extension activation or preview rendering
  - [x] Verify the test can run locally
- [ ] Add a visible VS Code smoke check
  - [ ] Confirm the extension appears in the VS Code command palette
  - [ ] Confirm the preview opens in a VS Code window
  - [ ] Confirm the preview panel updates when a `.tsx` file is saved
  - [ ] Confirm the file context menu shows the preview command
  - [ ] Confirm the frameworks picker works and persists
- [x] Define the minimum required self-test for release
  - [x] Activation test
  - [x] Preview open test
  - [x] Save-refresh test
  - [x] Preview icon visible test

### 3.5 Preview Experience Status

- [x] Preview shell exists and is wired to the active file
- [x] Preview refreshes on save
- [x] Preview state is tracked correctly
- [x] Real renderer has been added
- [x] Switch-active-file refresh has been added
- [x] Error handling has been added
- [x] Automated smoke checks have been added

## 4. Marketplace Readiness

### 4.1 Public README

- [x] Add a polished README foundation
- [x] Upgrade the README into a highly visual GitHub landing page
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
- [x] Copy the Lexvora Consulting logo assets locally
  - [x] Add `assets/lexvora-consulting-logo.png`
  - [x] Add `assets/lexvora-consulting-logo-meta.png`
  - [x] Use the local branding image in the extension preview
- [x] Add `assets/marketplace-style.css` as the shared brand token source
- [x] Add `assets/marketplace-hero.svg` as the premium README hero
- [x] Add `assets/lexvora-consulting-mark.svg` as the primary brand mark
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

### 4.5 Marketplace Status

- [x] README foundation exists
- [x] License and brand asset exist
- [ ] Marketplace-facing README still needs completion
- [ ] Publisher metadata still needs completion
- [ ] Packaging validation still needs completion
- [ ] Marketplace publishing still needs completion

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

### 5.4 Cross-Platform Status

- [x] macOS baseline documented
- [ ] Windows contributor notes still need to be written
- [ ] Linux review still pending

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
- [x] Add a release checklist
- [x] Add screenshots and visual references
- [x] Add a sample test case to the README
- [x] Document that `sample/` can contain nested source files
- [x] Add a changelog

### 6.3 Contribution Guidance

- [x] Tell contributors to read the docs first
- [x] Keep major decisions in `CONTEXT.md`
- [x] Keep work items in this file
- [ ] Add a short issue/PR template if needed

### 6.4 Documentation Status

- [x] Core documentation exists
- [x] Planning and contribution docs exist
- [x] Stale TODO references removed
- [x] Release checklist added
- [x] Screenshots and visual references added
- [x] Changelog added
- [ ] Issue/PR template still optional and pending

## 7. Cleanup And Governance

- [x] Remove the duplicate tracker
- [x] Keep `TASKS.md` as the single backlog file
- [x] Confirm the repo contains no stale TODO references
- [ ] Confirm docs and branding are aligned
- [ ] Commit the documentation set as a coherent update

### 7.1 Cleanup Status

- [x] Duplicate tracker removed
- [x] Single backlog file retained
- [x] No stale TODO references remain in the docs
- [ ] Docs and branding still need one final alignment pass
- [ ] Documentation set has been updated, but this status note remains open until the next full review is committed

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
  - [ ] Verify the extension activates
  - [ ] Verify the preview opens
  - [ ] Verify save refresh works
  - [ ] Verify the preview icon renders

### 8.5 Test Requirements

- [ ] Keep at least one basic automated test in the repo
  - [ ] Extension activation smoke test
  - [ ] Preview command smoke test
  - [ ] File-save refresh smoke test
- [ ] Keep at least one manual VS Code self-test
  - [ ] Open command palette
  - [ ] Run the preview command
  - [ ] Observe the preview panel in a VS Code window
  - [ ] Save a `.tsx` file and confirm update
  - [ ] Repeat with a nested file under `sample/`
  - [ ] Use the frameworks picker before previewing
  - [ ] Open the file context menu and choose preview
- [x] Keep one sample screen for manual preview checks
  - [x] Add sample component source
  - [x] Document how to use it

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
- At least one automated smoke test exists and passes
- A manual self-test works inside a VS Code window
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
- Milestone 9: basic automated test and self-test in place
