import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components';
import { useTheme } from '../components/ThemeProvider';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  onGetStarted?: () => void;
  onLogin?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted, onLogin }) => {
  const theme = useTheme();
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(30)).current;
  const imageScale = useRef(new Animated.Value(0.8)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate elements with staggered delays
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(titleTranslateY, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(subtitleTranslateY, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 200);

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(imageScale, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 400);

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 600);
  }, []);

  const handleGetStarted = () => {
    console.log('Get Started pressed');
    if (onGetStarted) {
      onGetStarted();
    }
  };

  const handleLogin = () => {
    console.log('Log in pressed');
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={theme.COLORS.surface} barStyle="dark-content" />

      <View style={styles.content}>
        <Animated.Text 
          style={[
            styles.title, 
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }],
            }
          ]} 
          numberOfLines={2}
        >
          Skilled Professional Finder
        </Animated.Text>
        
        <Animated.Text 
          style={[
            styles.subtitle, 
            {
              opacity: subtitleOpacity,
              transform: [{ translateY: subtitleTranslateY }],
            }
          ]}
        >
          Find skilled workers from home
        </Animated.Text>

        {/* Illustration */}
        <Animated.View 
          style={[
            styles.illustrationContainer, 
            {
              opacity: imageOpacity,
              transform: [{ scale: imageScale }],
            }
          ]}
        >
          <Image
            source={require('../../assets/welcome-screen/f0a1d727-a2fb-481e-ab58-4c01e64ea40c.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View 
          style={[
            styles.buttonContainer, 
            {
              opacity: buttonOpacity,
              transform: [{ scale: buttonScale }],
            }
          ]}
        >
          <View style={styles.buttonsRow}>
            <Button
              variant="outline"
              size="large"
              onPress={handleLogin}
              style={styles.loginButton}
              label="Log in"
            />
            
            <Button
              variant="primary"
              size="large"
              onPress={handleGetStarted}
              style={styles.getStartedButton}
              label="Get started"
            />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.surface,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.SPACING.xl,
    paddingVertical: theme.SPACING.xxl,
  },
  title: {
    fontSize: theme.FONT_SIZES.title,
    fontWeight: theme.FONT_WEIGHTS.bold,
    color: theme.COLORS.text.primary,
    textAlign: 'center',
    marginBottom: theme.SPACING.sm,
    letterSpacing: 0.5,
    lineHeight: theme.FONT_SIZES.title * 1.2,
  },
  subtitle: {
    fontSize: theme.FONT_SIZES.md,
    fontWeight: theme.FONT_WEIGHTS.regular,
    color: theme.COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: theme.SPACING.xxl,
    letterSpacing: 0.3,
  },
  illustrationContainer: {
    width: Math.min(width * 0.8, 320),
    height: Math.min(height * 0.35, 300),
    marginBottom: theme.SPACING.xxl,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Math.min(140, width * 0.35),
    backgroundColor: '#fff9f5',
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  illustration: {
    width: '85%',
    height: '85%',
  },
  buttonContainer: {
    width: '100%',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginButton: {
    flex: 1,
    marginRight: theme.SPACING.sm,
  },
  getStartedButton: {
    flex: 1,
    marginLeft: theme.SPACING.sm,
  },
});

export default WelcomeScreen;