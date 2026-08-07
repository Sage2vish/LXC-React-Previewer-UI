"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const fs = __importStar(require("node:fs"));
const os = __importStar(require("node:os"));
const path = __importStar(require("node:path"));
const previewModel_1 = require("../previewModel");
const moduleBundler_1 = require("../moduleBundler");
(0, node_test_1.default)('buildPreviewModel renders device chrome and embeds the real source for a ready file', () => {
    const source = `
    import React from 'react';
    import { SafeAreaView, Text, View } from 'react-native';

    export default function SamplePreview() {
      return (
        <SafeAreaView>
          <View>
            <Text>Hello Lexvora</Text>
          </View>
        </SafeAreaView>
      );
    }
  `;
    const model = (0, previewModel_1.buildPreviewModel)(source, '/tmp/SamplePreview.tsx', previewModel_1.DEVICE_PROFILES[0], 'ios-18');
    strict_1.default.equal(model.fileName, '/tmp/SamplePreview.tsx');
    strict_1.default.equal(model.status, 'ready');
    strict_1.default.equal(model.platformOS, 'ios');
    strict_1.default.ok(model.previewHtml.includes('device-toolbar'));
    strict_1.default.ok(model.previewHtml.includes('id="rn-root"'));
    // The raw (untranspiled) source is embedded as-is; Babel standalone transpiles it client-side.
    strict_1.default.ok(model.bundlePayloadJson.includes('Hello Lexvora'));
    strict_1.default.ok(model.bundlePayloadJson.includes('SamplePreview.tsx'));
});
(0, node_test_1.default)('buildPreviewModel waits for a default export instead of guessing content', () => {
    const source = `
    import React from 'react';
    export function NotDefaultYet() {
      return null;
    }
  `;
    const model = (0, previewModel_1.buildPreviewModel)(source, '/tmp/Draft.tsx', previewModel_1.DEVICE_PROFILES[0], 'ios-18');
    strict_1.default.equal(model.status, 'waiting');
    strict_1.default.equal(model.bundlePayloadJson, '');
    strict_1.default.ok(model.previewHtml.includes('export default'));
});
(0, node_test_1.default)('buildModuleGraph walks relative imports and inlines local image assets as data URIs', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lxc-preview-'));
    try {
        fs.mkdirSync(path.join(dir, 'components'));
        fs.writeFileSync(path.join(dir, 'components', 'Card.tsx'), `import React from 'react';\nimport { Text } from 'react-native';\nexport default function Card() { return <Text>card</Text>; }\n`);
        fs.writeFileSync(path.join(dir, 'logo.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]));
        const entryPath = path.join(dir, 'Screen.tsx');
        const entrySource = [
            "import React from 'react';",
            "import Card from './components/Card';",
            "import logo from './logo.png';",
            'export default function Screen() { return null; }',
        ].join('\n');
        fs.writeFileSync(entryPath, entrySource);
        const bundle = (0, moduleBundler_1.buildModuleGraph)(entryPath, entrySource);
        strict_1.default.equal(bundle.entryId, 'Screen.tsx');
        strict_1.default.ok(bundle.modules['Screen.tsx']);
        strict_1.default.equal(bundle.modules['components/Card.tsx']?.kind, 'source');
        strict_1.default.ok(bundle.modules['components/Card.tsx']?.code.includes('card'));
        strict_1.default.equal(bundle.modules['logo.png']?.kind, 'asset');
        strict_1.default.ok(bundle.modules['logo.png']?.code.startsWith('data:image/png;base64,'));
    }
    finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
});
(0, node_test_1.default)('buildModuleGraph skips imports it cannot resolve on disk instead of throwing', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lxc-preview-'));
    try {
        const entryPath = path.join(dir, 'Screen.tsx');
        const entrySource = [
            "import React from 'react';",
            "import Missing from './does-not-exist';",
            'export default function Screen() { return null; }',
        ].join('\n');
        fs.writeFileSync(entryPath, entrySource);
        const bundle = (0, moduleBundler_1.buildModuleGraph)(entryPath, entrySource);
        strict_1.default.equal(Object.keys(bundle.modules).length, 1);
        strict_1.default.ok(bundle.modules['Screen.tsx']);
    }
    finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
});
//# sourceMappingURL=renderer.test.js.map