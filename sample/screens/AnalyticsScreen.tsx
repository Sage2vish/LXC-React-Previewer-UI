import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function AnalyticsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Analytics / Neon</Text>
          <Text style={styles.title}>Campaign Snapshot</Text>
        </View>
        <View style={styles.pulseRing}>
          <Text style={styles.pulseValue}>73%</Text>
        </View>
      </View>

      <View style={styles.chartPanel}>
        <View style={[styles.bar, styles.barOne]} />
        <View style={[styles.bar, styles.barTwo]} />
        <View style={[styles.bar, styles.barThree]} />
        <View style={[styles.bar, styles.barFour]} />
        <View style={[styles.bar, styles.barFive]} />
        <View style={[styles.bar, styles.barSix]} />
      </View>

      <View style={styles.metricGrid}>
        <View style={styles.metric}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=500&q=80' }} style={styles.metricImage} />
          <Text style={styles.metricLabel}>Revenue</Text>
          <Text style={styles.metricValue}>$82k</Text>
        </View>
        <View style={styles.metric}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=500&q=80' }} style={styles.metricImage} />
          <Text style={styles.metricLabel}>Orders</Text>
          <Text style={styles.metricValue}>1,248</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Dark analytics screen with chart bars, finance-style metrics, and dense summary cards.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#03111f', padding: 18, gap: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kicker: {
    color: '#67e8f9',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: { color: '#f8fafc', fontSize: 30, lineHeight: 34, fontWeight: '900' },
  pulseRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 5,
    borderColor: 'rgba(103, 232, 249, 0.25)',
    backgroundColor: 'rgba(14, 165, 233, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseValue: { color: '#7dd3fc', fontWeight: '900', fontSize: 16 },
  chartPanel: {
    minHeight: 250,
    borderRadius: 30,
    padding: 18,
    backgroundColor: '#081a2f',
    borderWidth: 1,
    borderColor: '#173252',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 10,
  },
  bar: { flex: 1, borderRadius: 20 },
  barOne: { height: 88, backgroundColor: '#7c3aed' },
  barTwo: { height: 150, backgroundColor: '#22c55e' },
  barThree: { height: 120, backgroundColor: '#0ea5e9' },
  barFour: { height: 204, backgroundColor: '#38bdf8' },
  barFive: { height: 136, backgroundColor: '#2563eb' },
  barSix: { height: 172, backgroundColor: '#f59e0b' },
  metricGrid: { flexDirection: 'row', gap: 12 },
  metric: {
    flex: 1,
    borderRadius: 24,
    padding: 14,
    backgroundColor: '#0b1830',
    borderWidth: 1,
    borderColor: '#1b3451',
    gap: 8,
  },
  metricImage: { width: '100%', height: 90, borderRadius: 18 },
  metricLabel: {
    color: '#8ab4ff',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metricValue: { color: '#f8fafc', fontSize: 24, fontWeight: '900' },
  footer: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.18)',
  },
  footerText: { color: '#d2e6f7', fontSize: 14, lineHeight: 20 },
});
