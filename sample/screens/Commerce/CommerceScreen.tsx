import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function CommerceScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.kicker}>Storefront</Text>
          <Text style={styles.title}>Modern Commerce Card</Text>
        </View>
      </View>

      <View style={styles.productRow}>
        <View style={styles.product}>
          <Text style={styles.productName}>Headphones</Text>
          <Text style={styles.productPrice}>$149</Text>
        </View>
        <View style={styles.product}>
          <Text style={styles.productName}>Speaker</Text>
          <Text style={styles.productPrice}>$89</Text>
        </View>
      </View>

      <View style={styles.promo}>
        <Text style={styles.promoLabel}>Limited offer</Text>
        <Text style={styles.promoText}>Bright, product-led layout with bold imagery and compact pricing blocks.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff4e8',
    padding: 18,
    gap: 14,
  },
  banner: {
    borderRadius: 28,
    overflow: 'hidden',
    minHeight: 240,
    backgroundColor: '#1f2937',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  kicker: {
    color: '#fde68a',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
  },
  productRow: {
    flexDirection: 'row',
    gap: 12,
  },
  product: {
    flex: 1,
    borderRadius: 22,
    padding: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f3d2b4',
  },
  productName: {
    color: '#7c2d12',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },
  productPrice: {
    color: '#1f2937',
    fontSize: 24,
    fontWeight: '900',
  },
  promo: {
    borderRadius: 22,
    padding: 16,
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fdba74',
  },
  promoLabel: {
    color: '#ea580c',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  promoText: {
    color: '#7c2d12',
    fontSize: 15,
    lineHeight: 22,
  },
});
