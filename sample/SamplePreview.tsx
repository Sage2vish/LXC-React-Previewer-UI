import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SamplePreview() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9f?auto=format&fit=crop&w=900&q=80' }}
            style={styles.heroImage}
          />
          <View style={styles.heroCopy}>
            <Text style={styles.kicker}>Lexvora Consulting</Text>
            <Text style={styles.title}>Sample Preview One</Text>
            <Text style={styles.body}>Dark editorial card, landscape image, and layered callouts.</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Use cases</Text>
          <Text style={styles.body}>This screen checks hero imagery, stacked text, and a glass-like panel style.</Text>
        </View>

        <View style={styles.inlineNote}>
          <Text style={styles.inlineText}>Open this file first to confirm the baseline preview path.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#09111f',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  hero: {
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#101a2d',
    borderWidth: 1,
    borderColor: '#1f3356',
  },
  heroImage: {
    width: '100%',
    height: 180,
  },
  heroCopy: {
    padding: 18,
  },
  card: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: '#10192b',
    borderWidth: 1,
    borderColor: '#263756',
  },
  kicker: {
    color: '#7dd3fc',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 12,
  },
  body: {
    color: '#d4deeb',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  section: {
    color: '#93c5fd',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inlineNote: {
    borderRadius: 18,
    padding: 14,
    backgroundColor: 'rgba(125, 211, 252, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(125, 211, 252, 0.18)',
  },
  inlineText: {
    color: '#cce7ff',
    fontSize: 14,
    lineHeight: 20,
  },
});
