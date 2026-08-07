import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.shell}>
        <View style={styles.ribbon}>
          <Text style={styles.ribbonText}>Portrait / Luxe</Text>
        </View>

        <View style={styles.topRow}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80' }}
            style={styles.avatar}
          />
          <View style={styles.identity}>
            <Text style={styles.name}>Sage Vish</Text>
            <Text style={styles.role}>Visual systems and product UI</Text>
            <Text style={styles.bio}>A portrait card with warm tones, circular image treatment, and a balanced stat rail.</Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>projects</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>rating</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statValue}>21k</Text>
            <Text style={styles.statLabel}>views</Text>
          </View>
        </View>

        <View style={styles.footerCard}>
          <Text style={styles.footerTitle}>Designed for preview testing</Text>
          <Text style={styles.footerText}>This layout uses soft cream surfaces, a copper accent, and compact portrait framing.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#eddcc8', padding: 18 },
  shell: {
    flex: 1,
    borderRadius: 34,
    backgroundColor: '#fff7ef',
    borderWidth: 1,
    borderColor: '#e8caa4',
    padding: 18,
    gap: 16,
    shadowColor: '#7b4d1f',
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  ribbon: { alignSelf: 'flex-start', backgroundColor: '#2d1f12', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 },
  ribbonText: {
    color: '#f6d28e',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  topRow: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  avatar: { width: 126, height: 126, borderRadius: 28, borderWidth: 4, borderColor: '#fff' },
  identity: { flex: 1, gap: 8 },
  name: { color: '#2d1f12', fontSize: 30, lineHeight: 34, fontWeight: '900' },
  role: {
    color: '#9a5c28',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  bio: { color: '#5f513f', fontSize: 15, lineHeight: 22 },
  stats: { flexDirection: 'row', gap: 10 },
  statBlock: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ebd8bd',
    alignItems: 'center',
  },
  statValue: { color: '#2d1f12', fontSize: 24, fontWeight: '900' },
  statLabel: { color: '#8f7257', fontSize: 12, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.8 },
  footerCard: { borderRadius: 22, padding: 16, backgroundColor: '#fff2de', borderWidth: 1, borderColor: '#e7bc86' },
  footerTitle: { color: '#7b4d1f', fontSize: 16, fontWeight: '900', marginBottom: 6 },
  footerText: { color: '#66492a', fontSize: 14, lineHeight: 20 },
});
