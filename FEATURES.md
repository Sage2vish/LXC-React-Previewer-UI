# Features

## Release Map

## Release Roadmap

### `0.1.1`

- No distinct `0.1.1` release tag is present in the current git history.
- The early scaffold baseline is represented by the initial extension setup and preview workflow commits.

### `0.1.2`

- Initial extension scaffold
- Open and refresh preview commands
- First packaged `.vsix`
- GitHub remote and repository setup

### `0.1.3`

- Mobile-style preview update
- Marketplace branding pass
- Extension icon branding refresh
- README and marketplace polish

### `0.1.4`

- Preview device settings
- Frameworks-folder selection refinements
- Preview action cleanup
- Icon-led command presentation
- Release docs and task tracking updates

### `0.1.5`

- Marketplace publisher alignment fix
- Extension metadata updated for the signed-in publisher account
- Release package prepared for the Marketplace upload retry

### `0.1.6`

- Device presets from iPhone 11 through iPhone 14
- In-preview device dropdown with phone, pixels, and PPI labels
- Separate in-preview iOS version dropdown
- Working preview toolbar buttons
- Preview-helper scope preserved without drag-and-drop editor behavior

### `0.1.6` Feature Details

#### Goal

Keep the extension as a preview helper for React Native `.tsx` files while improving device selection, iOS selection, and preview controls inside the preview UI.

#### Feature List

- Device presets from iPhone 11 through iPhone 14
- In-preview device dropdown with phone, pixels, and PPI labels
- Separate in-preview iOS version dropdown
- Functional preview toolbar buttons
- Logo and preview branding polish
- Preview-helper scope preserved without drag-and-drop editor behavior

#### Detailed Tasks

- Build the device dropdown with saved state
- Build the iOS dropdown with saved state
- Make the preview buttons call real extension commands
- Keep the controls inside the preview UI
- Keep the feature limited to a helper/designer workflow

#### Exit Criteria

- The dropdowns are visible in the preview UI
- The toolbar buttons work
- The selected device and iOS version persist across sessions
- The preview still behaves like a helper, not a designer canvas

## Icon-Led Preview Command

### Summary

Replace the old preview command button that showed the `Open` codicon with an icon-led command that uses the provided asset icons from `assets/icons-all-size/`.

### User Benefit

- Removes the codicon-only `Open` presentation from the preview action
- Uses the extension's existing branded artwork
- Keeps the preview action visually consistent across VS Code surfaces

### Assets Used

- `assets/icons-all-size/icon-16.png`
- `assets/icons-all-size/icon-32.png`
- `assets/icons-all-size/icon-64.png`
- `assets/icons-all-size/icon-128.png`
- `assets/icons-all-size/icon-256.png`
- `assets/icons-all-size/icon-512.png`

### Expected Behavior

- The preview command is shown as `Preview`
- The editor title action uses the asset-backed command icon
- The packaged extension stays on version `0.1.6`

### Notes

- VS Code command metadata uses a single icon reference, so the smallest asset is used for the command entry while the larger images remain available for packaging and Marketplace branding.
