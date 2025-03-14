import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { WebView } from 'react-native-webview';
const HomeScreen = (navigation ) => {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://shivamrai09.vercel.app/' }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
 
});

export default HomeScreen;