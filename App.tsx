import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import WelcomeScreen from './src/screens/WelcomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SearchScreen from './src/screens/SearchScreen';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
import WorkerProfileScreen from './src/screens/WorkerProfileScreen';
import MessageScreen from './src/screens/MessageScreen';
import { Storage } from './src/utils/storage';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('loading');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const authFadeAnim = useRef(new Animated.Value(0)).current;
  const homeFadeAnim = useRef(new Animated.Value(0)).current;
  const profileFadeAnim = useRef(new Animated.Value(0)).current;
  const searchFadeAnim = useRef(new Animated.Value(0)).current;
  const searchResultsFadeAnim = useRef(new Animated.Value(0)).current;
  const workerProfileFadeAnim = useRef(new Animated.Value(0)).current;
  const messageFadeAnim = useRef(new Animated.Value(0)).current;
  const loadingFadeAnim = useRef(new Animated.Value(1)).current;

  // State for passing data between screens
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkerId, setSelectedWorkerId] = useState('');

  // Check if user is already logged in when app starts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const isLoggedIn = await Storage.isLoggedIn();
      const currentUser = await Storage.getCurrentUser();

      if (isLoggedIn && currentUser) {
        console.log('User already logged in:', currentUser.email);
        // User is logged in, go directly to home
        setCurrentScreen('home');
        Animated.timing(homeFadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        console.log('No user logged in, showing welcome screen');
        // No user logged in, show welcome screen
        setCurrentScreen('welcome');
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      // On error, default to welcome screen
      setCurrentScreen('welcome');
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } finally {
      setIsCheckingAuth(false);
      // Fade out loading screen
      Animated.timing(loadingFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleGetStarted = () => {
    // Fade out welcome screen
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('auth');
      // Fade in auth screen
      Animated.timing(authFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleAuthSuccess = () => {
    // Fade out auth screen
    Animated.timing(authFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('home');
      // Fade in home screen
      Animated.timing(homeFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNavigateToProfile = () => {
    // Fade out home screen
    Animated.timing(homeFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('profile');
      // Fade in profile screen
      Animated.timing(profileFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNavigateToSearch = () => {
    // Fade out home screen
    Animated.timing(homeFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('search');
      // Fade in search screen
      Animated.timing(searchFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNavigateToMessages = () => {
    // Fade out home screen
    Animated.timing(homeFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('messages');
      // Fade in message screen
      Animated.timing(messageFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBackFromProfile = () => {
    // Fade out profile screen
    Animated.timing(profileFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('home');
      // Fade in home screen
      Animated.timing(homeFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBackFromSearch = () => {
    // Fade out search screen
    Animated.timing(searchFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('home');
      // Fade in home screen
      Animated.timing(homeFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBackFromMessages = () => {
    // Fade out message screen
    Animated.timing(messageFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('home');
      // Fade in home screen
      Animated.timing(homeFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNavigateToSearchResults = (query: string) => {
    setSearchQuery(query);
    // Fade out search screen
    Animated.timing(searchFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('searchResults');
      // Fade in search results screen
      Animated.timing(searchResultsFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBackFromSearchResults = () => {
    // Fade out search results screen
    Animated.timing(searchResultsFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('search');
      // Fade in search screen
      Animated.timing(searchFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNavigateToWorkerProfile = (workerId: string) => {
    setSelectedWorkerId(workerId);
    // Fade out search results screen
    Animated.timing(searchResultsFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('workerProfile');
      // Fade in worker profile screen
      Animated.timing(workerProfileFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBackFromWorkerProfile = () => {
    // Fade out worker profile screen
    Animated.timing(workerProfileFadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('searchResults');
      // Fade in search results screen
      Animated.timing(searchResultsFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSignOut = () => {
    // Fade out current screen (home or profile)
    const currentAnim = currentScreen === 'home' ? homeFadeAnim : profileFadeAnim;
    Animated.timing(currentAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('welcome');
      // Reset all animations
      fadeAnim.setValue(0);
      authFadeAnim.setValue(0);
      homeFadeAnim.setValue(0);
      profileFadeAnim.setValue(0);
      // Fade in welcome screen
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  // Loading Screen
  if (isCheckingAuth) {
    return (
      <Animated.View style={[styles.loadingContainer, { opacity: loadingFadeAnim }]}>
        <Text style={styles.loadingTitle}>HomeSkillFinder</Text>
        <Text style={styles.loadingSubtitle}>Loading...</Text>
      </Animated.View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {currentScreen === 'welcome' && (
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
          }}>
          <WelcomeScreen onGetStarted={handleGetStarted} />
        </Animated.View>
      )}

      {currentScreen === 'auth' && (
        <Animated.View
          style={{
            flex: 1,
            opacity: authFadeAnim,
          }}>
          <AuthScreen onAuthSuccess={handleAuthSuccess} />
        </Animated.View>
      )}

      {currentScreen === 'home' && (
        <Animated.View
          style={{
            flex: 1,
            opacity: homeFadeAnim,
          }}>
          <HomeScreen
            onSignOut={handleSignOut}
            onNavigateToProfile={handleNavigateToProfile}
            onNavigateToSearch={handleNavigateToSearch}
            onNavigateToMessages={handleNavigateToMessages}
          />
        </Animated.View>
      )}

      {currentScreen === 'profile' && (
        <Animated.View
          style={{
            flex: 1,
            opacity: profileFadeAnim,
          }}>
          <ProfileScreen onBack={handleBackFromProfile} />
        </Animated.View>
      )}

      {currentScreen === 'search' && (
        <Animated.View
          style={{
            flex: 1,
            opacity: searchFadeAnim,
          }}>
          <SearchScreen 
            onBack={handleBackFromSearch} 
            onSearch={handleNavigateToSearchResults}
          />
        </Animated.View>
      )}

      {currentScreen === 'searchResults' && (
        <Animated.View
          style={{
            flex: 1,
            opacity: searchResultsFadeAnim,
          }}>
          <SearchResultsScreen 
            onBack={handleBackFromSearchResults}
            onWorkerPress={handleNavigateToWorkerProfile}
            searchQuery={searchQuery}
          />
        </Animated.View>
      )}

      {currentScreen === 'workerProfile' && (
        <Animated.View
          style={{
            flex: 1,
            opacity: workerProfileFadeAnim,
          }}>
          <WorkerProfileScreen 
            onBack={handleBackFromWorkerProfile}
            workerId={selectedWorkerId}
          />
        </Animated.View>
      )}

      {currentScreen === 'messages' && (
        <Animated.View
          style={{
            flex: 1,
            opacity: messageFadeAnim,
          }}>
          <MessageScreen onBack={handleBackFromMessages} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  loadingSubtitle: {
    fontSize: 16,
    color: '#ff8c00',
    fontWeight: '500',
  },
});

export default App;