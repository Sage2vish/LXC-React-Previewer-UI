# VS Code Publish Checklist

## Purpose

This file tracks only the VS Code release and Marketplace work.
Use it as the separate checklist for packaging, publishing, and Marketplace readiness.

## Status Key

- `[x]` done
- `[ ]` not started
- `[~]` blocked or in progress

## 1. Build And Package

- [x] Keep the extension versioned
  - [x] Use `0.1.6` for the current release line
  - [x] Rebuild the VSIX package after branding updates
- [x] Produce a valid VSIX package
  - [x] Package the extension with `vsce`
  - [x] Confirm the VSIX contents include the extension files
  - [x] Confirm the package is installable in VS Code
- [x] Keep release artifacts organized
  - [x] Store packaged VSIX output in the release flow
  - [x] Keep local source and release files separate

## 2. Marketplace Branding

- [x] Use the Lexvora Consulting marketplace logo
  - [x] Add the logo asset to `assets/`
  - [x] Point `package.json` icon metadata at the logo
  - [x] Add the logo to `README.md`
- [x] Keep the public listing visually branded
  - [x] Use the Lexvora Consulting name and identity
  - [x] Keep the branding aligned with the extension preview
  - [x] Use matching gold and blue presentation tokens
- [x] Keep the preview command icon-backed
  - [x] Remove the `$(eye)` editor title override
  - [x] Use the asset icon for the preview command

## 3. Repository Sync

- [x] Commit release-ready changes to Git
  - [x] Commit the packaging and branding updates
  - [x] Push the current `main` branch to GitHub
- [x] Keep the GitHub repo synchronized
  - [x] Confirm the remote repository is current
  - [x] Keep the release line on `0.1.6`

## 4. Marketplace Publish

- [x] Create or verify publisher identity
  - [x] Confirm the Marketplace publisher account
  - [ ] Confirm the publisher auth session is active
- [ ] Publish the extension to the Marketplace
  - [ ] Run the publish command with valid auth
  - [ ] Verify the Marketplace listing appears publicly
  - [ ] Verify the listing shows the new logo
  - [ ] Verify the installed extension matches the listing
- [ ] Record release notes
  - [ ] Add the published version to the release log
  - [ ] Record the Marketplace URL
  - [ ] Record the publish timestamp

## 5. Current Blocker

- [~] Marketplace publish is blocked by missing publisher auth in this session
  - [x] Packaging is complete
  - [x] GitHub sync is complete
  - [x] VS Code install artifact exists
  - [ ] Marketplace publish still needs publisher authentication
  - [ ] Microsoft Entra / Azure auth chain is not available in the current session

## 6. Ready State

- [x] Extension metadata is prepared
- [x] Marketplace logo asset is prepared
- [x] README branding is prepared
- [x] VSIX package is prepared
- [x] GitHub repository is synced
- [ ] Marketplace auth session still needs to be completed in the active VS Code session

## 7. Publish Command

When auth is available, run:

`vsce publish --packagePath "lxc-react-previewer-ui-0.1.6.vsix" --no-dependencies --azure-credential`

## 8. Notes

- The VSIX file exists and is packaged successfully.
- The Marketplace publish step is the only remaining external dependency.
- GitHub sync and local packaging do not block publish anymore.
- The latest publish attempt failed with `Can not acquire a Microsoft Entra ID access token`.
