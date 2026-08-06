import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type PreviewCardProps = {
  title: string;
  body: string;
};

export default function PreviewCard({ title, body }: PreviewCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#334155',
  },
  title: {
    color: '#7dd3fc',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  body: {
    color: '#e2e8f0',
    fontSize: 14,
    lineHeight: 20,
  },
});
