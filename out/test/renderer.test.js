"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const extension_1 = require("../extension");
(0, node_test_1.default)('buildPreviewModel summarizes a TSX preview source', () => {
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
    const model = (0, extension_1.buildPreviewModel)(source, 'SamplePreview.tsx', '/Users/SageVish/Documents/Development Work/frameworks');
    strict_1.default.equal(model.fileName, 'SamplePreview.tsx');
    strict_1.default.equal(model.status, 'ready');
    strict_1.default.ok(model.summary.includes('Default export'));
    strict_1.default.ok(model.previewHtml.includes('Basic JSX renderer'));
    strict_1.default.ok(model.previewHtml.includes('Hello Lexvora'));
    strict_1.default.ok(model.frameworksLabel.includes('frameworks'));
});
//# sourceMappingURL=renderer.test.js.map