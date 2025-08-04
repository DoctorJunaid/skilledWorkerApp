import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import CustomAlert from '../components/CustomAlert';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MessageScreenProps {
    onBack?: () => void;
}

interface Message {
    id: string;
    text: string;
    timestamp: Date;
    isFromUser: boolean;
    status: 'sent' | 'delivered' | 'read';
    type: 'text' | 'image' | 'location' | 'service_request';
}

interface Chat {
    id: string;
    name: string;
    profession: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: Date;
    unreadCount: number;
    isOnline: boolean;
    rating: number;
}

const MessageScreen = ({ onBack }: MessageScreenProps) => {
    const [activeTab, setActiveTab] = useState<'chats' | 'conversation'>('chats');
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ title: '', message: '', type: 'default' as any });
    const scrollViewRef = useRef<ScrollView>(null);

    // Mock chat data
    const [chats] = useState<Chat[]>([
        {
            id: '1',
            name: 'John Smith',
            profession: 'Plumber',
            avatar: '🔧',
            lastMessage: 'I can fix your pipe issue tomorrow morning',
            lastMessageTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
            unreadCount: 2,
            isOnline: true,
            rating: 4.8
        },
        {
            id: '2',
            name: 'Sarah Wilson',
            profession: 'House Cleaner',
            avatar: '🧹',
            lastMessage: 'Thank you for choosing our service!',
            lastMessageTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            unreadCount: 0,
            isOnline: false,
            rating: 4.9
        },
        {
            id: '3',
            name: 'Mike Johnson',
            profession: 'Electrician',
            avatar: '⚡',
            lastMessage: 'The electrical work is completed',
            lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            unreadCount: 1,
            isOnline: true,
            rating: 4.7
        },
        {
            id: '4',
            name: 'Emma Davis',
            profession: 'Painter',
            avatar: '🎨',
            lastMessage: 'I\'ll send you the color samples',
            lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            unreadCount: 0,
            isOnline: false,
            rating: 4.6
        }
    ]);

    // Mock messages for selected chat
    const mockMessages: Message[] = [
        {
            id: '1',
            text: 'Hi! I saw your plumbing service request. I can help you with that.',
            timestamp: new Date(Date.now() - 60 * 60 * 1000),
            isFromUser: false,
            status: 'read',
            type: 'text'
        },
        {
            id: '2',
            text: 'Great! When would you be available to check the issue?',
            timestamp: new Date(Date.now() - 55 * 60 * 1000),
            isFromUser: true,
            status: 'read',
            type: 'text'
        },
        {
            id: '3',
            text: 'I can come tomorrow morning around 9 AM. The issue seems to be with the main pipe connection.',
            timestamp: new Date(Date.now() - 50 * 60 * 1000),
            isFromUser: false,
            status: 'read',
            type: 'text'
        },
        {
            id: '4',
            text: 'Perfect! What would be the estimated cost for this repair?',
            timestamp: new Date(Date.now() - 45 * 60 * 1000),
            isFromUser: true,
            status: 'read',
            type: 'text'
        },
        {
            id: '5',
            text: 'Based on your description, it should be around $150-200. I\'ll give you the exact quote after inspection.',
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            isFromUser: false,
            status: 'delivered',
            type: 'text'
        }
    ];

    useEffect(() => {
        if (selectedChat) {
            setMessages(mockMessages);
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [selectedChat]);

    const showCustomAlert = (title: string, message: string, type: any = 'default') => {
        setAlertConfig({ title, message, type });
        setShowAlert(true);
    };

    const handleChatSelect = (chat: Chat) => {
        setSelectedChat(chat);
        setActiveTab('conversation');
    };

    const handleBackToChats = () => {
        setSelectedChat(null);
        setActiveTab('chats');
    };

    const handleSendMessage = () => {
        if (!messageText.trim()) {
            showCustomAlert('Empty Message', 'Please enter a message to send.', 'warning');
            return;
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            text: messageText.trim(),
            timestamp: new Date(),
            isFromUser: true,
            status: 'sent',
            type: 'text'
        };

        setMessages(prev => [...prev, newMessage]);
        setMessageText('');
        
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);

        // Simulate response after 2 seconds
        setTimeout(() => {
            const responseMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Thanks for your message! I\'ll get back to you shortly.',
                timestamp: new Date(),
                isFromUser: false,
                status: 'delivered',
                type: 'text'
            };
            setMessages(prev => [...prev, responseMessage]);
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }, 2000);
    };

    const handleNavigation = (tab: 'home' | 'search' | 'add' | 'messages' | 'profile') => {
        if (tab === 'home') {
            onBack?.();
        }
        console.log('Navigate to:', tab);
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'now';
        if (diffInMinutes < 60) return `${diffInMinutes}m`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
        return `${Math.floor(diffInMinutes / 1440)}d`;
    };

    const formatMessageTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const renderChatsList = () => (
        <ScrollView style={styles.chatsList} showsVerticalScrollIndicator={false}>
            {chats.map((chat) => (
                <TouchableOpacity
                    key={chat.id}
                    style={styles.chatItem}
                    onPress={() => handleChatSelect(chat)}
                    activeOpacity={0.7}
                >
                    <View style={styles.chatAvatar}>
                        <Text style={styles.chatAvatarText}>{chat.avatar}</Text>
                        {chat.isOnline && <View style={styles.onlineIndicator} />}
                    </View>
                    
                    <View style={styles.chatInfo}>
                        <View style={styles.chatHeader}>
                            <Text style={styles.chatName}>{chat.name}</Text>
                            <Text style={styles.chatTime}>{formatTime(chat.lastMessageTime)}</Text>
                        </View>
                        <View style={styles.chatSubHeader}>
                            <Text style={styles.chatProfession}>{chat.profession}</Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.starIcon}>⭐</Text>
                                <Text style={styles.rating}>{chat.rating}</Text>
                            </View>
                        </View>
                        <Text style={styles.lastMessage} numberOfLines={1}>
                            {chat.lastMessage}
                        </Text>
                    </View>
                    
                    {chat.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const renderConversation = () => (
        <KeyboardAvoidingView 
            style={styles.conversationContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Conversation Header */}
            <View style={styles.conversationHeader}>
                <TouchableOpacity style={styles.backButton} onPress={handleBackToChats}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                
                <View style={styles.conversationInfo}>
                    <View style={styles.conversationAvatar}>
                        <Text style={styles.conversationAvatarText}>{selectedChat?.avatar}</Text>
                        {selectedChat?.isOnline && <View style={styles.onlineIndicatorSmall} />}
                    </View>
                    <View>
                        <Text style={styles.conversationName}>{selectedChat?.name}</Text>
                        <Text style={styles.conversationStatus}>
                            {selectedChat?.isOnline ? 'Online' : 'Last seen recently'}
                        </Text>
                    </View>
                </View>
                
                <TouchableOpacity style={styles.callButton}>
                    <Text style={styles.callIcon}>📞</Text>
                </TouchableOpacity>
            </View>

            {/* Messages */}
            <ScrollView 
                ref={scrollViewRef}
                style={styles.messagesContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.messagesContent}
            >
                {messages.map((message) => (
                    <View
                        key={message.id}
                        style={[
                            styles.messageWrapper,
                            message.isFromUser ? styles.userMessageWrapper : styles.otherMessageWrapper
                        ]}
                    >
                        <View
                            style={[
                                styles.messageBubble,
                                message.isFromUser ? styles.userMessage : styles.otherMessage
                            ]}
                        >
                            <Text style={[
                                styles.messageText,
                                message.isFromUser ? styles.userMessageText : styles.otherMessageText
                            ]}>
                                {message.text}
                            </Text>
                        </View>
                        <Text style={[
                            styles.messageTime,
                            message.isFromUser ? styles.userMessageTime : styles.otherMessageTime
                        ]}>
                            {formatMessageTime(message.timestamp)}
                            {message.isFromUser && (
                                <Text style={styles.messageStatus}>
                                    {message.status === 'sent' ? ' ✓' : message.status === 'delivered' ? ' ✓✓' : ' ✓✓'}
                                </Text>
                            )}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Message Input */}
            <View style={styles.messageInputContainer}>
                <View style={styles.messageInputWrapper}>
                    <TextInput
                        style={styles.messageInput}
                        placeholder="Type a message..."
                        placeholderTextColor="#999999"
                        value={messageText}
                        onChangeText={setMessageText}
                        multiline
                        maxLength={500}
                    />
                    <TouchableOpacity style={styles.attachButton}>
                        <Text style={styles.attachIcon}>📎</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={[
                        styles.sendButton,
                        !messageText.trim() && styles.sendButtonDisabled
                    ]}
                    onPress={handleSendMessage}
                    disabled={!messageText.trim()}
                    activeOpacity={0.8}
                >
                    <Text style={styles.sendIcon}>➤</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
            
            {/* Header */}
            <View style={styles.header}>
                {activeTab === 'chats' ? (
                    <>
                        <TouchableOpacity style={styles.headerButton} onPress={onBack}>
                            <Text style={styles.headerIcon}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Messages</Text>
                        <TouchableOpacity style={styles.headerButton}>
                            <Text style={styles.headerIcon}>✏️</Text>
                        </TouchableOpacity>
                    </>
                ) : null}
            </View>

            {/* Content */}
            {activeTab === 'chats' ? renderChatsList() : renderConversation()}

            {/* Custom Alert */}
            <CustomAlert
                visible={showAlert}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onConfirm={() => setShowAlert(false)}
                showCancel={false}
            />

            {/* Bottom Navigation - only show on chats tab */}
            {activeTab === 'chats' && (
                <BottomNavBar activeTab="messages" onTabPress={handleNavigation} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 18,
        color: '#333333',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    chatsList: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f8f9fa',
    },
    chatAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#ff8c00',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        position: 'relative',
    },
    chatAvatarText: {
        fontSize: 24,
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#28a745',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    chatInfo: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    chatTime: {
        fontSize: 12,
        color: '#999999',
    },
    chatSubHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    chatProfession: {
        fontSize: 14,
        color: '#666666',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        fontSize: 12,
        marginRight: 2,
    },
    rating: {
        fontSize: 12,
        color: '#666666',
        fontWeight: '600',
    },
    lastMessage: {
        fontSize: 14,
        color: '#999999',
        lineHeight: 18,
    },
    unreadBadge: {
        backgroundColor: '#ff8c00',
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    unreadCount: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '700',
    },
    conversationContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    conversationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    backIcon: {
        fontSize: 18,
        color: '#333333',
    },
    conversationInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    conversationAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ff8c00',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        position: 'relative',
    },
    conversationAvatarText: {
        fontSize: 18,
    },
    onlineIndicatorSmall: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#28a745',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    conversationName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    conversationStatus: {
        fontSize: 12,
        color: '#28a745',
        marginTop: 2,
    },
    callButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    callIcon: {
        fontSize: 16,
    },
    messagesContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    messagesContent: {
        paddingVertical: 16,
    },
    messageWrapper: {
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    userMessageWrapper: {
        alignItems: 'flex-end',
    },
    otherMessageWrapper: {
        alignItems: 'flex-start',
    },
    messageBubble: {
        maxWidth: screenWidth * 0.75,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        marginBottom: 4,
    },
    userMessage: {
        backgroundColor: '#ff8c00',
        borderBottomRightRadius: 6,
    },
    otherMessage: {
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 6,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    userMessageText: {
        color: '#ffffff',
    },
    otherMessageText: {
        color: '#1a1a1a',
    },
    messageTime: {
        fontSize: 12,
        marginHorizontal: 16,
    },
    userMessageTime: {
        color: '#999999',
        textAlign: 'right',
    },
    otherMessageTime: {
        color: '#999999',
        textAlign: 'left',
    },
    messageStatus: {
        color: '#28a745',
    },
    messageInputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    messageInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#f8f9fa',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 12,
        maxHeight: 100,
    },
    messageInput: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
        paddingVertical: 8,
        maxHeight: 80,
    },
    attachButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    attachIcon: {
        fontSize: 16,
        color: '#666666',
    },
    sendButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ff8c00',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ff8c00',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    sendButtonDisabled: {
        backgroundColor: '#cccccc',
        shadowOpacity: 0,
        elevation: 0,
    },
    sendIcon: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '700',
    },
});

export default MessageScreen;