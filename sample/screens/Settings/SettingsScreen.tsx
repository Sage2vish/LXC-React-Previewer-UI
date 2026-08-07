import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.panel}>
        <Text style={styles.kicker}>Preferences</Text>
        <Text style={styles.title}>Control Center</Text>

        <View style={styles.option}>
          <Text style={styles.optionLabel}>Theme</Text>
          <Text style={styles.optionValue}>Midnight Blue</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Device family</Text>
          <Text style={styles.optionValue}>iPhone + iPad + Android</Text>
        </View>
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Preview mode</Text>
          <Text style={styles.optionValue}>Helper only</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0b1020',
    padding: 20,
  },
  panel: {
    flex: 1,
    borderRadius: 30,
    padding: 22,
    backgroundColor: '#101828',
    borderWidth: 1,
    borderColor: '#283548',
  },
  kicker: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  title: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 20,
  },
  option: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#243246',
  },
  optionLabel: {
    color: '#94a3b8',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  optionValue: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
});
