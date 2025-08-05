import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Storage } from './src/utils/storage';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from './src/constants';
import { ThemeProvider } from './src/components/ThemeProvider';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      const loggedIn = await Storage.isLoggedIn();
      const currentUser = await Storage.getCurrentUser();

      if (loggedIn && currentUser) {
        console.log('User already logged in:', currentUser.email);
        setIsLoggedIn(true);
      } else {
        console.log('No user logged in, showing welcome screen');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
    }
  };

  // Loading Screen
  if (isLoggedIn === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingTitle}>SkilledConnect</Text>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigator isLoggedIn={isLoggedIn} />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: FONT_SIZES.title,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
});

export default App;