import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export const AppHeader = () => (
  <View style={styles.header}>
    <Text style={styles.text}>I am Header</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'android' ? 76 : 100,
    marginTop: Platform.OS === 'ios' ? 0 : 24,
    ...Platform.select({
      ios: { backgroundColor: '#f00', paddingTop: 24},
      android: { backgroundColor: '#00f'}
    }),
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 24
  }
});