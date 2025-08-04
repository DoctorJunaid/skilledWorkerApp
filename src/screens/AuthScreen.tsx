import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Animated,
    Dimensions,
} from 'react-native';
import { Storage } from '../utils/storage';
import CustomAlert from '../components/CustomAlert';

const { height } = Dimensions.get('window');

interface AuthScreenProps {
    onAuthSuccess?: () => void;
}

const AuthScreen = ({ onAuthSuccess }: AuthScreenProps) => {
    const [isLogin, setIsLogin] = useState(false);
    const [cardAnim] = useState(new Animated.Value(height));
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ 
        title: '', 
        message: '', 
        type: 'default' as 'default' | 'success' | 'error' | 'warning',
        onConfirm: () => {}
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        // Animate card sliding up when component mounts
        Animated.timing(cardAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
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

    const showCustomAlert = (title: string, message: string, type: 'default' | 'success' | 'error' | 'warning' = 'default', onConfirm?: () => void) => {
        setAlertConfig({ 
            title, 
            message, 
            type,
            onConfirm: onConfirm || (() => setShowAlert(false))
        });
        setShowAlert(true);
    };

    const validateForm = () => {
        if (!email.trim()) {
            showCustomAlert('Validation Error', 'Please enter your email address to continue.', 'error');
            return false;
        }
        if (!email.includes('@')) {
            showCustomAlert('Invalid Email', 'Please enter a valid email address with @ symbol.', 'error');
            return false;
        }
        if (!password.trim()) {
            showCustomAlert('Password Required', 'Please enter your password to continue.', 'error');
            return false;
        }
        if (password.length < 6) {
            showCustomAlert('Weak Password', 'Password must be at least 6 characters long for security.', 'warning');
            return false;
        }
        if (!isLogin && !name.trim()) {
            showCustomAlert('Name Required', 'Please enter your name to create your account.', 'error');
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
                        'Welcome to HomeSkillFinder! Your account has been created successfully.', 
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
                    showCustomAlert('Signup Failed', 'Could not create account. Please try again.', 'error');
                }
            }
        } catch (error) {
            showCustomAlert('Connection Error', 'Something went wrong. Please check your connection and try again.', 'error');
            console.error('Auth error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

            {/* Welcome Message */}
            <View style={styles.welcomeSection}>
                <Text style={styles.welcomeTitle}>
                    {isLogin ? 'Welcome Back!' : 'Get Started'}
                </Text>
                <Text style={styles.welcomeSubtitle}>
                    {isLogin
                        ? 'Sign in to continue finding skilled workers'
                        : 'Create your account to find local experts'
                    }
                </Text>
            </View>

            {/* Auth Card */}
            <Animated.View
                style={[
                    styles.cardContainer,
                    {
                        transform: [{ translateY: cardAnim }],
                    }
                ]}>
                <View style={styles.card}>

                    {/* Form Fields */}
                    <View style={styles.form}>
                        {!isLogin && (
                            <TextInput
                                style={styles.input}
                                placeholder="Your name"
                                placeholderTextColor="#aaaaaa"
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Email address"
                            placeholderTextColor="#aaaaaa"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#aaaaaa"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity 
                        style={[styles.submitButton, loading && styles.submitButtonDisabled]} 
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.submitButtonText}>
                            {loading 
                                ? (isLogin ? 'Signing In...' : 'Creating Account...') 
                                : (isLogin ? 'Sign In' : 'Create Account')
                            }
                        </Text>
                    </TouchableOpacity>

                    {/* Toggle Section */}
                    <View style={styles.toggleSection}>
                        <Text style={styles.toggleQuestion}>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                        </Text>
                        <TouchableOpacity onPress={isLogin ? switchToSignup : switchToLogin}>
                            <Text style={styles.toggleLink}>
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Social Login Options */}
                    <View style={styles.socialSection}>
                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialButtonText}>Continue with Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>

            {/* Custom Alert */}
            <CustomAlert
                visible={showAlert}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onConfirm={alertConfig.onConfirm}
                showCancel={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    welcomeSection: {
        paddingTop: 80,
        paddingHorizontal: 30,
        paddingBottom: 40,
        alignItems: 'center',
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 12,
        textAlign: 'center',
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 22,
        fontWeight: '400',
    },
    cardContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    form: {
        marginBottom: 25,
    },
    input: {
        backgroundColor: '#f8f9fa',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 18,
        fontSize: 16,
        marginBottom: 20,
        color: '#333333',
        borderWidth: 2,
        borderColor: '#e9ecef',
        minHeight: 56,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    submitButton: {
        backgroundColor: '#ff8c00',
        paddingVertical: 20,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#ff8c00',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
        minHeight: 56,
        justifyContent: 'center',
    },
    submitButtonDisabled: {
        backgroundColor: '#cccccc',
        shadowOpacity: 0.1,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    toggleSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    toggleQuestion: {
        fontSize: 14,
        color: '#666666',
        marginRight: 5,
    },
    toggleLink: {
        fontSize: 14,
        color: '#ff8c00',
        fontWeight: '600',
    },
    socialSection: {
        marginTop: 10,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e9ecef',
    },
    dividerText: {
        marginHorizontal: 15,
        fontSize: 14,
        color: '#999999',
    },
    socialButton: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e9ecef',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    socialButtonText: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '500',
    },
});

export default AuthScreen;