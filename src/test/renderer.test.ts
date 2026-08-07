import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { buildPreviewModel, DEVICE_PROFILES } from '../previewModel';
import { buildModuleGraph } from '../moduleBundler';

test('buildPreviewModel renders device chrome and embeds the real source for a ready file', () => {
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

  const model = buildPreviewModel(source, '/tmp/SamplePreview.tsx', DEVICE_PROFILES[0], 'ios-18');

  assert.equal(model.fileName, '/tmp/SamplePreview.tsx');
  assert.equal(model.status, 'ready');
  assert.equal(model.platformOS, 'ios');
  assert.ok(model.previewHtml.includes('device-toolbar'));
  assert.ok(model.previewHtml.includes('id="rn-root"'));
  // The raw (untranspiled) source is embedded as-is; Babel standalone transpiles it client-side.
  assert.ok(model.bundlePayloadJson.includes('Hello Lexvora'));
  assert.ok(model.bundlePayloadJson.includes('SamplePreview.tsx'));
});

test('buildPreviewModel waits for a default export instead of guessing content', () => {
  const source = `
    import React from 'react';
    export function NotDefaultYet() {
      return null;
    }
  `;

  const model = buildPreviewModel(source, '/tmp/Draft.tsx', DEVICE_PROFILES[0], 'ios-18');

  assert.equal(model.status, 'waiting');
  assert.equal(model.bundlePayloadJson, '');
  assert.ok(model.previewHtml.includes('export default'));
});

test('buildModuleGraph walks relative imports and inlines local image assets as data URIs', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lxc-preview-'));
  try {
    fs.mkdirSync(path.join(dir, 'components'));
    fs.writeFileSync(
      path.join(dir, 'components', 'Card.tsx'),
      `import React from 'react';\nimport { Text } from 'react-native';\nexport default function Card() { return <Text>card</Text>; }\n`
    );
    fs.writeFileSync(path.join(dir, 'logo.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]));

    const entryPath = path.join(dir, 'Screen.tsx');
    const entrySource = [
      "import React from 'react';",
      "import Card from './components/Card';",
      "import logo from './logo.png';",
      'export default function Screen() { return null; }',
    ].join('\n');
    fs.writeFileSync(entryPath, entrySource);

    const bundle = buildModuleGraph(entryPath, entrySource);

    assert.equal(bundle.entryId, 'Screen.tsx');
    assert.ok(bundle.modules['Screen.tsx']);
    assert.equal(bundle.modules['components/Card.tsx']?.kind, 'source');
    assert.ok(bundle.modules['components/Card.tsx']?.code.includes('card'));
    assert.equal(bundle.modules['logo.png']?.kind, 'asset');
    assert.ok(bundle.modules['logo.png']?.code.startsWith('data:image/png;base64,'));
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('buildModuleGraph skips imports it cannot resolve on disk instead of throwing', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lxc-preview-'));
  try {
    const entryPath = path.join(dir, 'Screen.tsx');
    const entrySource = [
      "import React from 'react';",
      "import Missing from './does-not-exist';",
      'export default function Screen() { return null; }',
    ].join('\n');
    fs.writeFileSync(entryPath, entrySource);

    const bundle = buildModuleGraph(entryPath, entrySource);

    assert.equal(Object.keys(bundle.modules).length, 1);
    assert.ok(bundle.modules['Screen.tsx']);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
