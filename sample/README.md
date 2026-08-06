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
    Home/
      HomeScreen.tsx
    Profile/
      ProfileScreen.tsx
  components/
    cards/
      PreviewCard.tsx
```

## Test Rule

If a file sits anywhere under `sample/`, it should be treated as a valid React source candidate for manual preview testing.
