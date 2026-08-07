import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.panel}>
        <Text style={styles.kicker}>Utility / Minimal</Text>
        <Text style={styles.title}>Control Center</Text>
        <Text style={styles.subtitle}>A stripped-down settings layout with very different spacing, color, and hierarchy.</Text>

        <View style={styles.option}>
          <Text style={styles.optionLabel}>Theme</Text>
          <Text style={styles.optionValue}>Midnight blue</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Device family</Text>
          <Text style={styles.optionValue}>iPhone + iPad + Android</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Preview mode</Text>
          <Text style={styles.optionValue}>Helper only</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Use this screen to confirm the preview handles a clean utility page as well as visual-heavy pages.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#07131f', padding: 18 },
  panel: {
    flex: 1,
    borderRadius: 30,
    padding: 22,
    backgroundColor: '#0d1a2a',
    borderWidth: 1,
    borderColor: '#1d3552',
    gap: 12,
  },
  kicker: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
  title: { color: '#f8fafc', fontSize: 32, fontWeight: '900' },
  subtitle: { color: '#c7d7ea', fontSize: 15, lineHeight: 22, marginBottom: 6 },
  option: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#23384f' },
  optionLabel: {
    color: '#8ba6c8',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  optionValue: { color: '#f8fafc', fontSize: 18, fontWeight: '800' },
  footer: {
    marginTop: 10,
    borderRadius: 18,
    padding: 16,
    backgroundColor: 'rgba(52, 211, 153, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  footerText: { color: '#d3f4e5', fontSize: 14, lineHeight: 20 },
});
