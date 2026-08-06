import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <Text style={styles.text}>This nested sample file is here for preview testing.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0f172a' },
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { color: '#f8fafc', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  text: { color: '#cbd5e1', fontSize: 16, lineHeight: 24 },
});
