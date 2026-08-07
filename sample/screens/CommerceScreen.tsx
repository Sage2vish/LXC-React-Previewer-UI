import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function CommerceScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80' }}
          style={styles.heroImage}
        />
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Commerce / Bright</Text>
        </View>
      </View>

      <View style={styles.productStrip}>
        <View style={styles.productCard}>
          <Text style={styles.productLabel}>Headphones</Text>
          <Text style={styles.productPrice}>$149</Text>
        </View>
        <View style={styles.productCard}>
          <Text style={styles.productLabel}>Speaker</Text>
          <Text style={styles.productPrice}>$89</Text>
        </View>
      </View>

      <View style={styles.offerCard}>
        <Text style={styles.offerTitle}>Limited offer</Text>
        <Text style={styles.offerBody}>A storefront-style layout with warm gradients, dense product tiles, and high-contrast promos.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff2df', padding: 18, gap: 14 },
  hero: { height: 260, borderRadius: 30, overflow: 'hidden', borderWidth: 1, borderColor: '#f4c38a' },
  heroImage: { width: '100%', height: '100%' },
  heroBadge: {
    position: 'absolute',
    left: 16,
    top: 16,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: 'rgba(17, 24, 39, 0.72)',
  },
  heroBadgeText: {
    color: '#fef3c7',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  productStrip: { flexDirection: 'row', gap: 12 },
  productCard: {
    flex: 1,
    borderRadius: 22,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f7d9b1',
  },
  productLabel: {
    color: '#9a3412',
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  productPrice: { color: '#1f2937', fontSize: 28, fontWeight: '900' },
  offerCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: '#fff6ea',
    borderWidth: 1,
    borderColor: '#f2b872',
  },
  offerTitle: {
    color: '#b45309',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  offerBody: { color: '#7c2d12', fontSize: 15, lineHeight: 22 },
});
