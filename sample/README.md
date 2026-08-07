# Sample Source Tree

This folder is the preview test bed for the extension.

The goal is not to keep every screen visually similar. The goal is to prove that the previewer can handle distinct mobile layouts, different content densities, and different visual systems without flattening them into one generic template.

## How to use it

- Treat `sample/` as a React Native source root.
- Open any `.tsx` file inside this tree as a preview candidate.
- Use the gallery hub in `SamplePreview.tsx` to jump between the major test cases.
- Keep nested folders in play so the previewer is tested against realistic source structure.

## Screen roles

- `SamplePreview.tsx`: gallery hub and sample selector
- `screens/HomeScreen.tsx`: wallpaper-heavy home view with layered panels
- `screens/ProfileScreen.tsx`: portrait-first profile surface with avatar and personal details
- `screens/AnalyticsScreen.tsx`: graph-driven analytics and payment-style summary view
- `screens/CommerceScreen.tsx`: storefront-style product and promotion layout
- `screens/SettingsScreen.tsx`: sectioned settings surface inspired by iPhone settings

## Expected behavior

- Each screen should look meaningfully different.
- The home screen should feel visual and layered.
- The profile screen should emphasize the profile picture and identity details.
- The analytics screen should lean toward charting, metrics, and finance-like blocks.
- The settings screen should be organized into grouped sections, not a simple list.
- The gallery hub should make it easy to understand what each sample is meant to prove.

## Test rule

If a file sits anywhere under `sample/`, it should be considered valid preview content for manual testing.
