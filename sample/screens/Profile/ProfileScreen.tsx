import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.shell}>
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.kicker}>Profile preview</Text>
        <Text style={styles.title}>Sage Vish</Text>
        <Text style={styles.subtitle}>Portrait card with a single image, soft shadows, and compact hierarchy.</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>rating</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>21k</Text>
            <Text style={styles.statLabel}>views</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3efe8',
    padding: 20,
  },
  shell: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#fff8ef',
    padding: 20,
    borderWidth: 1,
    borderColor: '#eadbc8',
    shadowColor: '#6b4d2d',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    justifyContent: 'center',
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    borderColor: '#fff',
  },
  kicker: {
    textAlign: 'center',
    color: '#b36a2c',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  title: {
    textAlign: 'center',
    color: '#2d1f12',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#5f513f',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 22,
  },
  stat: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eadbc8',
  },
  statValue: {
    color: '#2d1f12',
    fontSize: 22,
    fontWeight: '900',
  },
  statLabel: {
    color: '#7a6a57',
    fontSize: 12,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
