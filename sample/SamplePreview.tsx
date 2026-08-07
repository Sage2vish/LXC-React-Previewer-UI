import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const sampleCards = [
  {
    title: 'Home',
    label: 'Wallpaper + panels',
    body: 'A layered home screen with a strong visual background, floating cards, and a modern dashboard feel.',
    accent: '#7dd3fc',
    tint: '#0b1220',
    image: 'https://images.unsplash.com/photo-1516405662554-5e5d0c76a53b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Profile',
    label: 'Identity + details',
    body: 'A portrait-forward profile with avatar emphasis, descriptive copy, and structured personal data.',
    accent: '#f59e0b',
    tint: '#1f1407',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Analytics',
    label: 'Graph + finance',
    body: 'A sharp analytics board using chart bars, status chips, and payment-style summary blocks.',
    accent: '#22c55e',
    tint: '#05131a',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Settings',
    label: 'Sectioned controls',
    body: 'An iPhone-settings-inspired surface with grouped options and clear control hierarchy.',
    accent: '#c084fc',
    tint: '#090816',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function SamplePreview() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>Sample Gallery</Text>
          </View>
          <Text style={styles.title}>Select a screen to preview</Text>
          <Text style={styles.body}>
            This file is the gallery hub. Each target under `sample/screens/` is intentionally different so we can
            verify that the preview handles distinct compositions, colors, and content density.
          </Text>
        </View>

        <View style={styles.grid}>
          {sampleCards.map((card) => (
            <View key={card.title} style={[styles.card, { backgroundColor: card.tint, borderColor: card.accent }]}>
              <Image source={{ uri: card.image }} style={styles.image} />
              <View style={[styles.badge, { borderColor: card.accent }]}>
                <Text style={[styles.badgeText, { color: card.accent }]}>{card.label}</Text>
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardBody}>{card.body}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>What to test</Text>
          <Text style={styles.footerText}>
            Open each file directly from the `sample/` tree and check that the preview engine keeps the layouts
            visually distinct instead of normalizing them into the same shape.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050814',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  hero: {
    borderRadius: 30,
    backgroundColor: '#0b1220',
    borderWidth: 1,
    borderColor: '#22304d',
    padding: 18,
    gap: 10,
  },
  heroTag: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: 'rgba(125, 211, 252, 0.1)',
  },
  heroTagText: {
    color: '#7dd3fc',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  title: {
    color: '#f8fafc',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
  },
  body: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
  },
  grid: {
    gap: 14,
  },
  card: {
    borderRadius: 26,
    padding: 14,
    borderWidth: 1,
    gap: 10,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 22,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardTitle: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '900',
  },
  cardBody: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(96, 165, 250, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.16)',
  },
  footerTitle: {
    color: '#dbeafe',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  footerText: {
    color: '#bfdbfe',
    fontSize: 14,
    lineHeight: 20,
  },
});
