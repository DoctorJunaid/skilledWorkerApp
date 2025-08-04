import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
} from 'react-native';

interface WelcomeScreenProps {
    onGetStarted?: () => void;
}

const WelcomeScreen = ({onGetStarted}: WelcomeScreenProps) => {
    const handleGetStarted = () => {
        console.log('Get Started pressed');
        if (onGetStarted) {
            onGetStarted();
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#2c2c2c" barStyle="light-content" />

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>Skilled Professional Finder</Text>
                <Text style={styles.subtitle}>
                    Find skilled workers from home
                </Text>

                {/* Illustration */}
                <View style={styles.illustrationContainer}>
                    <Image
                        source={require('../../assets/welcome-screen/f0a1d727-a2fb-481e-ab58-4c01e64ea40c.png')}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                {/* Get Started Button */}
                <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 80,
        paddingBottom: 50,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 50,
        textAlign: 'center',
        letterSpacing: 0.3,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: '300',
        color: '#555555',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 30,
        paddingTop: 20,
        letterSpacing: 0.3,
    },
    illustrationContainer: {
        width: 280,
        height: 280,
        marginBottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustration: {
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: '#ff8c00',
        paddingVertical: 18,
        paddingHorizontal: 80,
        borderRadius: 30,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#ff8c00',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '600',
    },
});

export default WelcomeScreen;