import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const HomeScreen = (navigation) => {
  const [refreshing, setRefreshing] = useState(false);
  const [webViewKey, setWebViewKey] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setWebViewKey(prevKey => prevKey + 1);
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <WebView
          key={webViewKey}
          style={styles.container}
          source={{ uri: 'https://shivamrai09.vercel.app/' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20
  },
  container: {
    flex: 1,
    height: '100%',
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
});

export default HomeScreen;