import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function AnalyticsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>Analytics</Text>
          <Text style={styles.title}>Campaign Snapshot</Text>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80' }}
          style={styles.thumbnail}
        />
      </View>

      <View style={styles.chartPanel}>
        <View style={[styles.bar, styles.barShort]} />
        <View style={[styles.bar, styles.barTall]} />
        <View style={[styles.bar, styles.barMid]} />
        <View style={[styles.bar, styles.barPeak]} />
        <View style={[styles.bar, styles.barMid]} />
        <View style={[styles.bar, styles.barTall]} />
      </View>

      <View style={styles.metricGrid}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Reach</Text>
          <Text style={styles.metricValue}>82k</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Clicks</Text>
          <Text style={styles.metricValue}>14.3k</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>CTR</Text>
          <Text style={styles.metricValue}>6.8%</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#07111f',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 18,
  },
  kicker: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  thumbnail: {
    width: 88,
    height: 88,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  chartPanel: {
    flex: 1,
    borderRadius: 28,
    backgroundColor: '#0f172a',
    padding: 18,
    borderWidth: 1,
    borderColor: '#1e293b',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 18,
    minHeight: 260,
  },
  bar: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#2563eb',
  },
  barShort: { height: 72, opacity: 0.55 },
  barMid: { height: 118, opacity: 0.75 },
  barTall: { height: 164, opacity: 0.88 },
  barPeak: {
    height: 198,
    backgroundColor: '#38bdf8',
  },
  metricGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metric: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
    backgroundColor: '#111d33',
    borderWidth: 1,
    borderColor: '#243553',
  },
  metricLabel: {
    color: '#93c5fd',
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  metricValue: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '900',
  },
});
