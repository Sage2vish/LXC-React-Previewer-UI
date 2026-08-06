# Tasks

## 1. Foundation

- [x] Create the repository
  - [x] Initialize Git
  - [x] Connect the GitHub remote
  - [x] Add baseline docs
- [x] Create the extension scaffold
  - [x] Add `package.json`
  - [x] Add TypeScript configuration
  - [x] Add extension entrypoint
  - [x] Add workspace ignore rules
- [x] Create the first packaged build
  - [x] Compile the TypeScript output
  - [x] Package a local `.vsix`

## 2. Product Direction

- [x] Define the open-source direction
  - [x] Lexvora Consulting attribution
  - [x] Public contribution-friendly posture
- [x] Define the primary user goal
  - [x] Preview a React Native `.tsx` file beside its code
  - [x] Avoid emulator and simulator dependencies
- [x] Define the target platform
  - [x] VS Code extension
  - [x] `.vsix` install format

## 3. Preview Experience

- [x] Add a preview command
  - [x] Open the active `.tsx` file
  - [x] Show a preview panel beside the editor
- [x] Add preview refresh behavior
  - [x] Refresh when the file is saved
  - [x] Keep the current file context in memory
- [ ] Replace the preview placeholder with a real React Native renderer
  - [ ] Decide renderer strategy
  - [ ] Render component output
  - [ ] Handle common RN patterns

## 4. Marketplace Readiness

- [ ] Polish the marketplace-facing README
  - [ ] Add screenshots
  - [ ] Add usage steps
  - [ ] Add limitations
  - [ ] Add roadmap
- [ ] Add a proper license file
- [ ] Add icon and brand assets
- [ ] Add publisher metadata
- [ ] Validate extension packaging
- [ ] Prepare publish instructions

## 5. Cross-Platform Notes

- [x] macOS development is the current baseline
  - [x] Document the macOS setup path
  - [x] Keep the repo installable on a local Mac
- [ ] Windows contributor testing
  - [ ] Confirm path handling
  - [ ] Confirm packaging flow
  - [ ] Confirm VS Code install behavior
- [ ] Optional Linux review

## 6. Ongoing Documentation

- [x] Create `CONTEXT.md`
  - [x] Record decisions
  - [x] Record contribution rules
- [x] Create `TASKS.md`
  - [x] Track tasks and subtasks
  - [x] Keep progress visible
- [ ] Add contributor guide
- [ ] Add release checklist

## Progress Checkpoints

- Checkpoint 1: repository scaffold complete
- Checkpoint 2: extension command opens preview
- Checkpoint 3: preview refreshes on save
- Checkpoint 4: real renderer in place
- Checkpoint 5: marketplace-ready packaging complete
- Checkpoint 6: GitHub release or publish complete
