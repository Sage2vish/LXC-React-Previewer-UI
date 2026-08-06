import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SamplePreview() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.kicker}>Lexvora Consulting</Text>
          <Text style={styles.title}>LXC React Previewer UI</Text>
          <Text style={styles.body}>
            This sample screen is meant for checking the preview workflow inside VS Code.
          </Text>
          <Text style={styles.body}>
            The React Native runtime dependencies should live in the shared frameworks folder:
          </Text>
          <Text style={styles.path}>/Users/SageVish/Documents/Development Work/frameworks</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 24,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
  },
  kicker: {
    color: '#38bdf8',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  title: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
  },
  body: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  path: {
    color: '#93c5fd',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6,
  },
});
