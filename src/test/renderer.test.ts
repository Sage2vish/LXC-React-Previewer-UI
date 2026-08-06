import test from 'node:test';
import assert from 'node:assert/strict';
import { buildPreviewModel } from '../previewModel';

test('buildPreviewModel summarizes a TSX preview source', () => {
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

  const model = buildPreviewModel(source, 'SamplePreview.tsx', '/Users/SageVish/Documents/Development Work/frameworks');

  assert.equal(model.fileName, 'SamplePreview.tsx');
  assert.equal(model.status, 'ready');
  assert.ok(model.summary.includes('Default export'));
  assert.ok(model.previewHtml.includes('device-toolbar'));
  assert.ok(model.previewHtml.includes('Good Morning'));
  assert.ok(model.previewHtml.includes('Hello Lexvora'));
  assert.ok(model.frameworksLabel.includes('frameworks'));
});
