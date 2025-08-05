import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Storage } from '../utils/storage';
import { Button, Input, CustomAlert, useTheme } from '../components';

const { width, height } = Dimensions.get('window');

interface AuthScreenProps {
  onAuthSuccess?: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'default' as 'default' | 'success' | 'error' | 'warning',
    onConfirm: () => {},
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Animation values
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(40)).current;
  const buttonScale = useRef(new Animated.Value(0.9)).current;
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
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(formTranslateY, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 200);

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
    }, 400);
  }, []);

  const switchToLogin = () => {
    setIsLogin(true);
    // Clear form when switching
    setEmail('');
    setPassword('');
    setName('');
  };

  const switchToSignup = () => {
    setIsLogin(false);
    // Clear form when switching
    setEmail('');
    setPassword('');
    setName('');
  };

  const showCustomAlert = (
    title: string,
    message: string,
    type: 'default' | 'success' | 'error' | 'warning' = 'default',
    onConfirm?: () => void
  ) => {
    setAlertConfig({
      title,
      message,
      type,
      onConfirm: onConfirm || (() => setShowAlert(false)),
    });
    setShowAlert(true);
  };

  const validateForm = () => {
    if (!email.trim()) {
      showCustomAlert(
        'Validation Error',
        'Please enter your email address to continue.',
        'error'
      );
      return false;
    }
    if (!email.includes('@')) {
      showCustomAlert(
        'Invalid Email',
        'Please enter a valid email address with @ symbol.',
        'error'
      );
      return false;
    }
    if (!password.trim()) {
      showCustomAlert(
        'Password Required',
        'Please enter your password to continue.',
        'error'
      );
      return false;
    }
    if (password.length < 6) {
      showCustomAlert(
        'Weak Password',
        'Password must be at least 6 characters long for security.',
        'warning'
      );
      return false;
    }
    if (!isLogin && !name.trim()) {
      showCustomAlert(
        'Name Required',
        'Please enter your name to create your account.',
        'error'
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      if (isLogin) {
        // Login logic - verify credentials
        const result = await Storage.verifyLogin(email, password);

        if (result.success) {
          showCustomAlert(
            'Welcome Back! 🎉',
            'Successfully signed in. Redirecting to your dashboard...',
            'success',
            () => {
              setShowAlert(false);
              if (onAuthSuccess) {
                onAuthSuccess();
              }
            }
          );
          console.log('Login successful:', result.user);
        } else {
          showCustomAlert('Login Failed', result.message, 'error');
        }
      } else {
        // Signup logic - save new user
        const success = await Storage.saveUser({ name, email, password });

        if (success) {
          // Auto-login after signup
          await Storage.verifyLogin(email, password);
          showCustomAlert(
            'Account Created! 🎉',
            'Welcome to Skilled Professional Finder! Your account has been created successfully.',
            'success',
            () => {
              setShowAlert(false);
              if (onAuthSuccess) {
                onAuthSuccess();
              }
            }
          );
          console.log('Signup successful for:', email);
        } else {
          showCustomAlert(
            'Signup Failed',
            'Could not create account. Please try again.',
            'error'
          );
        }
      }
    } catch (error) {
      showCustomAlert(
        'Connection Error',
        'Something went wrong. Please check your connection and try again.',
        'error'
      );
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={theme.COLORS.surface} barStyle="dark-content" />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <Animated.View 
            style={[
              styles.headerSection, 
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleTranslateY }],
              }
            ]}
          >
            <Text style={styles.welcomeTitle}>
              {isLogin ? 'Welcome Back!' : 'Join Us Today'}
            </Text>
            <Text style={styles.welcomeSubtitle}>
              {isLogin
                ? 'Sign in to continue finding skilled workers'
                : 'Create your account to get started'}
            </Text>
          </Animated.View>

          {/* Form Section */}
          <Animated.View 
            style={[
              styles.formContainer, 
              {
                opacity: formOpacity,
                transform: [{ translateY: formTranslateY }],
              }
            ]}
          >
            <View style={styles.form}>
              {!isLogin && (
                <View style={styles.inputWrapper}>
                  <Input
                    placeholder="Full name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    autoCorrect={false}
                    leftIcon={<Icon name="person" size={20} color={theme.COLORS.primary} />}
                  />
                </View>
              )}

              <View style={styles.inputWrapper}>
                <Input
                  placeholder="Email address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  leftIcon={<Icon name="email" size={20} color={theme.COLORS.primary} />}
                />
              </View>

              <View style={styles.inputWrapper}>
                <Input
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  leftIcon={<Icon name="lock" size={20} color={theme.COLORS.primary} />}
                  rightIcon={
                    <Icon
                      name={showPassword ? 'visibility-off' : 'visibility'}
                      size={20}
                      color={theme.COLORS.primary}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
              </View>
            </View>

            {/* Submit Button */}
            <Animated.View 
              style={{
                opacity: buttonOpacity,
                transform: [{ scale: buttonScale }],
              }}
            >
              <Button
                variant="primary"
                onPress={handleSubmit}
                disabled={loading}
                style={styles.submitButton}
              >
                {loading
                  ? isLogin
                    ? 'Signing In...'
                    : 'Creating Account...'
                  : isLogin
                  ? 'Sign In'
                  : 'Create Account'}
              </Button>
            </Animated.View>

            {/* Toggle Section */}
            <View style={styles.toggleSection}>
              <Text style={styles.toggleQuestion}>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </Text>
              <Button
                variant="text"
                onPress={isLogin ? switchToSignup : switchToLogin}
                style={styles.toggleButton}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Button>
            </View>

            {/* Social Login Section */}
            <View style={styles.socialSection}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <Button
                variant="outline"
                style={styles.socialButton}
                leftIcon={<Icon name="login" size={20} color={theme.COLORS.primary} />}
              >
                Continue with Google
              </Button>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Custom Alert */}
      <CustomAlert
        visible={showAlert}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onConfirm={alertConfig.onConfirm}
        showCancel={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.surface,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.SPACING.xl,
    paddingVertical: theme.SPACING.lg,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: theme.SPACING.xl,
    paddingTop: theme.SPACING.lg,
  },
  welcomeTitle: {
    fontSize: theme.FONT_SIZES.xxl,
    fontWeight: theme.FONT_WEIGHTS.light,
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.xs,
    textAlign: 'center',
    letterSpacing: 1.0,
  },
  welcomeSubtitle: {
    fontSize: theme.FONT_SIZES.md,
    fontWeight: theme.FONT_WEIGHTS.light,
    color: theme.COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.SPACING.lg,
    letterSpacing: 0.6,
  },
  formContainer: {
    backgroundColor: theme.COLORS.white,
    borderRadius: theme.BORDER_RADIUS.lg,
    padding: theme.SPACING.xl,
    shadowColor: theme.COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 0.5,
    borderColor: theme.COLORS.border,
    marginBottom: theme.SPACING.lg,
  },
  form: {
    marginBottom: theme.SPACING.xl,
  },
  inputWrapper: {
    marginBottom: theme.SPACING.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbf7',
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#fff2e6',
    paddingHorizontal: 18,
    minHeight: 58,
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 14,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2c2c2c',
    paddingVertical: 16,
    fontWeight: '300',
    letterSpacing: 0.3,
  },
  passwordToggle: {
    padding: 6,
    opacity: 0.7,
  },
  submitButton: {
    marginBottom: theme.SPACING.lg,
  },
  toggleSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.SPACING.xl,
  },
  toggleQuestion: {
    fontSize: theme.FONT_SIZES.sm,
    fontWeight: theme.FONT_WEIGHTS.light,
    color: theme.COLORS.textSecondary,
    marginRight: theme.SPACING.xs,
    letterSpacing: 0.3,
  },
  toggleButton: {
    marginLeft: 0,
    paddingLeft: 0,
  },
  socialSection: {
    marginTop: theme.SPACING.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: theme.COLORS.border,
  },
  dividerText: {
    marginHorizontal: theme.SPACING.md,
    fontSize: theme.FONT_SIZES.xs,
    fontWeight: theme.FONT_WEIGHTS.light,
    color: theme.COLORS.textTertiary,
    letterSpacing: 0.4,
  },
  socialButton: {
    marginBottom: theme.SPACING.sm,
  },
});

export default AuthScreen;