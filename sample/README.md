# Sample Source Tree

This folder is a test workspace for React Native preview behavior.

## How It Is Meant To Be Used

- Treat this folder as a React source root.
- Nested folders are allowed.
- Any `.tsx` file inside this tree should be usable as a preview target.
- The preview workflow should be tested against real folder structures, not only flat files.

## Example Structure

```text
sample/
  README.md
  SamplePreview.tsx
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
  components/
    cards/
      PreviewCard.tsx
```

## What To Open

- `SamplePreview.tsx` for the baseline editorial card
- `screens/Profile/ProfileScreen.tsx` for a portrait-style profile card
- `screens/Analytics/AnalyticsScreen.tsx` for a chart and metrics layout
- `screens/Commerce/CommerceScreen.tsx` for a product and promo layout
- `screens/Settings/SettingsScreen.tsx` for a settings and preferences layout

## Test Rule

If a file sits anywhere under `sample/`, it should be treated as a valid React source candidate for manual preview testing.
