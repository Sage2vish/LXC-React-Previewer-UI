# Vendored runtime assets

These files are unmodified upstream builds, vendored locally so the preview
webview can execute a user's `.tsx` source without any network access at
render time (VS Code webviews cannot load remote `<script src>` under the
extension's Content-Security-Policy, and previews must work offline).

| File | Package | Version | License |
| --- | --- | --- | --- |
| `react.production.min.js` | [react](https://www.npmjs.com/package/react) | 18.3.1 | MIT |
| `react-dom.production.min.js` | [react-dom](https://www.npmjs.com/package/react-dom) | 18.3.1 | MIT |
| `babel.min.js` | [@babel/standalone](https://www.npmjs.com/package/@babel/standalone) | 7.26.4 | MIT |

They are used to transpile the previewed TypeScript/JSX source in-browser
(Babel standalone) and to render the resulting component tree (React +
ReactDOM) against the `react-native`-shaped shim in `assets/rn-web-runtime.js`.

To update: fetch the new UMD build from `https://unpkg.com/<package>@<version>/...`
and replace the file in place, then bump the version in this table.
