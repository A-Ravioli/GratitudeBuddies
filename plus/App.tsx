import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import { colors } from './app/utils/theme';
import { loadDefaultAssets } from './app/utils/assetUtils';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize the app
    async function prepareApp() {
      try {
        // Load any necessary assets
        await loadDefaultAssets();
        
        // Simulate a short loading time for smoother transition
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn('Error loading app resources:', e);
      } finally {
        setIsReady(true);
      }
    }

    prepareApp();
  }, []);

  if (!isReady) {
    return (
      <View style={[styles.container, styles.loading]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
