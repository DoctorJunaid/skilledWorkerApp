import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Dimensions,
    Animated,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    showCancel?: boolean;
    confirmText?: string;
    cancelText?: string;
    type?: 'default' | 'success' | 'error' | 'warning';
}

const CustomAlert = ({
    visible,
    title,
    message,
    onConfirm,
    onCancel,
    showCancel = true,
    confirmText = 'OK',
    cancelText = 'Cancel',
    type = 'default'
}: CustomAlertProps) => {
    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return {
                    confirmButton: styles.successButton,
                    icon: '✅'
                };
            case 'error':
                return {
                    confirmButton: styles.errorButton,
                    icon: '❌'
                };
            case 'warning':
                return {
                    confirmButton: styles.warningButton,
                    icon: '⚠️'
                };
            default:
                return {
                    confirmButton: styles.defaultButton,
                    icon: 'ℹ️'
                };
        }
    };

    const typeStyles = getTypeStyles();

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>{typeStyles.icon}</Text>
                    </View>
                    
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    
                    <View style={styles.buttons}>
                        {showCancel && onCancel && (
                            <TouchableOpacity 
                                style={styles.cancelButton} 
                                onPress={onCancel}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.cancelButtonText}>{cancelText}</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity 
                            style={[
                                styles.confirmButton,
                                typeStyles.confirmButton,
                                !showCancel && styles.fullWidthButton
                            ]}
                            onPress={onConfirm}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.confirmButtonText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 30,
        width: '100%',
        maxWidth: Math.min(screenWidth - 40, 350),
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 15,
        },
        shadowOpacity: 0.3,
        shadowRadius: 25,
        elevation: 15,
        alignItems: 'center',
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        fontSize: 28,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 28,
    },
    message: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
    },
    buttons: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e9ecef',
    },
    cancelButtonText: {
        color: '#666666',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    defaultButton: {
        backgroundColor: '#ff8c00',
        shadowColor: '#ff8c00',
    },
    successButton: {
        backgroundColor: '#28a745',
        shadowColor: '#28a745',
    },
    errorButton: {
        backgroundColor: '#dc3545',
        shadowColor: '#dc3545',
    },
    warningButton: {
        backgroundColor: '#ffc107',
        shadowColor: '#ffc107',
    },
    confirmButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    fullWidthButton: {
        flex: 1,
    },
});

export default CustomAlert;