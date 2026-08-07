import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1600&q=80' }}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.shell}>
          <View style={styles.header}>
            <Text style={styles.kicker}>Home / Wallpaper</Text>
            <Text style={styles.title}>A layered home screen</Text>
            <Text style={styles.subtitle}>
              The point here is visual contrast: a strong background, floating panels, and a richer dashboard feel.
            </Text>
          </View>

          <View style={styles.panelRow}>
            <View style={[styles.panel, styles.panelWide]}>
              <Text style={styles.panelLabel}>Focus mode</Text>
              <Text style={styles.panelValue}>Creative build flow</Text>
              <Text style={styles.panelMeta}>A card that feels like a hero module rather than a simple block.</Text>
            </View>
            <View style={[styles.panel, styles.panelStack]}>
              <Text style={styles.panelLabel}>Wallpaper</Text>
              <Text style={styles.panelValue}>Deep sky</Text>
            </View>
          </View>

          <View style={styles.quickGrid}>
            <View style={styles.quickCard}>
              <Text style={styles.quickLabel}>Messages</Text>
              <Text style={styles.quickValue}>18</Text>
            </View>
            <View style={styles.quickCard}>
              <Text style={styles.quickLabel}>Tasks</Text>
              <Text style={styles.quickValue}>7 open</Text>
            </View>
            <View style={styles.quickCard}>
              <Text style={styles.quickLabel}>Build</Text>
              <Text style={styles.quickValue}>Ready</Text>
            </View>
          </View>

          <View style={styles.bottomCard}>
            <View style={styles.bottomChip} />
            <Text style={styles.bottomTitle}>Visual surface first</Text>
            <Text style={styles.bottomText}>
              This screen should feel like a real mobile home view with depth, layers, and a different rhythm from the
              profile, analytics, and settings screens.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#020617' },
  background: { flex: 1 },
  backgroundImage: { opacity: 0.38 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.35)',
  },
  shell: { flex: 1, padding: 18, gap: 14 },
  header: {
    borderRadius: 28,
    padding: 18,
    backgroundColor: 'rgba(10, 16, 33, 0.82)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    gap: 8,
  },
  kicker: {
    color: '#93c5fd',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  title: { color: '#f8fafc', fontSize: 32, lineHeight: 36, fontWeight: '900' },
  subtitle: { color: '#cbd5e1', fontSize: 15, lineHeight: 22 },
  panelRow: { flexDirection: 'row', gap: 12 },
  panel: {
    borderRadius: 24,
    padding: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.86)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
  },
  panelWide: { flex: 1.4, gap: 8 },
  panelStack: { flex: 0.9, gap: 8 },
  panelLabel: {
    color: '#7dd3fc',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  panelValue: { color: '#f8fafc', fontSize: 20, fontWeight: '900' },
  panelMeta: { color: '#cbd5e1', fontSize: 13, lineHeight: 18 },
  quickGrid: { flexDirection: 'row', gap: 12 },
  quickCard: {
    flex: 1,
    minHeight: 98,
    borderRadius: 22,
    padding: 14,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(248, 250, 252, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
  },
  quickLabel: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quickValue: { color: '#0f172a', fontSize: 24, fontWeight: '900' },
  bottomCard: {
    flex: 1,
    borderRadius: 30,
    padding: 18,
    backgroundColor: 'rgba(9, 14, 26, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.18)',
    gap: 10,
  },
  bottomChip: { width: 66, height: 8, borderRadius: 999, backgroundColor: '#38bdf8' },
  bottomTitle: { color: '#f8fafc', fontSize: 20, fontWeight: '900' },
  bottomText: { color: '#cbd5e1', fontSize: 14, lineHeight: 21 },
});
