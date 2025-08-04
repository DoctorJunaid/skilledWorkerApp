import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import CustomAlert from '../components/CustomAlert';

const { width: screenWidth } = Dimensions.get('window');

interface WorkerProfileScreenProps {
    onBack?: () => void;
    workerId?: string;
}

interface WorkerProfile {
    id: string;
    name: string;
    profession: string;
    experience: string;
    biography: string;
    skills: string[];
    hourlyRate: string;
    reviews: Review[];
    avatar: string;
    rating: number;
    totalReviews: number;
}

interface Review {
    id: string;
    reviewer: string;
    rating: number;
    comment: string;
    date: string;
}

const WorkerProfileScreen = ({ onBack, workerId = '1' }: WorkerProfileScreenProps) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ title: '', message: '', type: 'default' as any });

    // Mock worker profile data
    const workerProfile: WorkerProfile = {
        id: workerId,
        name: 'Alex Johnson',
        profession: 'Electrician',
        experience: '5 years experience',
        biography: 'Alex Johnson is a skilled electrician with over five years of experience in various residential and commercial projects. Known for exceptional problem-solving abilities and a commitment to safety.',
        skills: [
            'Electrical wiring',
            'Circuit troubleshooting',
            'Lighting installation',
            'Renewable energy systems'
        ],
        hourlyRate: '$60 per hour',
        rating: 4.8,
        totalReviews: 127,
        avatar: '⚡',
        reviews: [
            {
                id: '1',
                reviewer: 'Sarah Lewis',
                rating: 5,
                comment: 'Outstanding service and attention to detail. Highly recommend!',
                date: '2 weeks ago'
            },
            {
                id: '2',
                reviewer: 'Mark Thompson',
                rating: 5,
                comment: 'Very professional and efficient work. Will hire again.',
                date: '1 month ago'
            }
        ]
    };

    const showCustomAlert = (title: string, message: string, type: any = 'default') => {
        setAlertConfig({ title, message, type });
        setShowAlert(true);
    };

    const handleContact = () => {
        showCustomAlert(
            'Contact Worker',
            `Would you like to send a message to ${workerProfile.name}?`,
            'default'
        );
    };

    const renderSkill = (skill: string, index: number) => (
        <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>• {skill}</Text>
        </View>
    );

    const renderReview = (review: Review) => (
        <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>{review.reviewer}</Text>
                    <View style={styles.reviewRating}>
                        {[...Array(5)].map((_, i) => (
                            <Text key={i} style={[
                                styles.reviewStar,
                                i < review.rating ? styles.reviewStarFilled : styles.reviewStarEmpty
                            ]}>
                                ⭐
                            </Text>
                        ))}
                    </View>
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            <Text style={styles.reviewComment}>"{review.comment}"</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Worker Profile</Text>
                <View style={styles.headerSpacer} />
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    {/* Profile Header */}
                    <View style={styles.profileHeader}>
                        <View style={styles.profileInfo}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{workerProfile.avatar}</Text>
                            </View>
                            <View style={styles.basicInfo}>
                                <Text style={styles.name}>{workerProfile.name}</Text>
                                <Text style={styles.profession}>
                                    {workerProfile.profession} | {workerProfile.experience}
                                </Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.starIcon}>⭐</Text>
                                    <Text style={styles.rating}>{workerProfile.rating}</Text>
                                    <Text style={styles.reviewCount}>({workerProfile.totalReviews} reviews)</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity 
                            style={styles.contactButton}
                            onPress={handleContact}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.contactButtonText}>Contact</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Biography Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Biography</Text>
                        <Text style={styles.biography}>{workerProfile.biography}</Text>
                    </View>

                    {/* Skills Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.skillsContainer}>
                            {workerProfile.skills.map(renderSkill)}
                        </View>
                    </View>

                    {/* Hourly Rates Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Hourly Rates</Text>
                        <Text style={styles.hourlyRate}>{workerProfile.hourlyRate}</Text>
                    </View>

                    {/* Reviews Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Reviews</Text>
                        {workerProfile.reviews.map(renderReview)}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity 
                            style={styles.messageButton}
                            onPress={handleContact}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.messageButtonText}>Send Message</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.hireButton}
                            onPress={() => showCustomAlert('Hire Worker', 'Would you like to hire this worker for your project?', 'success')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.hireButtonText}>Hire Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Custom Alert */}
            <CustomAlert
                visible={showAlert}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onConfirm={() => setShowAlert(false)}
                showCancel={false}
            />
        </KeyboardAvoidingView>
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
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    backIcon: {
        fontSize: 20,
        color: '#333333',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333333',
    },
    headerSpacer: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 25,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    profileHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 30,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    profileInfo: {
        flexDirection: 'row',
        flex: 1,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ff8c00',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        shadowColor: '#ff8c00',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    avatarText: {
        fontSize: 32,
    },
    basicInfo: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 6,
    },
    profession: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        fontSize: 16,
        marginRight: 4,
    },
    rating: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333333',
        marginRight: 4,
    },
    reviewCount: {
        fontSize: 14,
        color: '#666666',
    },
    contactButton: {
        backgroundColor: '#ff8c00',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        shadowColor: '#ff8c00',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    contactButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 15,
    },
    biography: {
        fontSize: 16,
        color: '#666666',
        lineHeight: 24,
    },
    skillsContainer: {
        flexDirection: 'column',
    },
    skillTag: {
        marginBottom: 8,
    },
    skillText: {
        fontSize: 16,
        color: '#666666',
        lineHeight: 24,
    },
    hourlyRate: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ff8c00',
    },
    reviewCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    reviewerInfo: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    reviewRating: {
        flexDirection: 'row',
    },
    reviewStar: {
        fontSize: 12,
        marginRight: 2,
    },
    reviewStarFilled: {
        opacity: 1,
    },
    reviewStarEmpty: {
        opacity: 0.3,
    },
    reviewDate: {
        fontSize: 12,
        color: '#999999',
    },
    reviewComment: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
        fontStyle: 'italic',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 12,
    },
    messageButton: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ff8c00',
    },
    messageButtonText: {
        color: '#ff8c00',
        fontSize: 16,
        fontWeight: '700',
    },
    hireButton: {
        flex: 1,
        backgroundColor: '#ff8c00',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#ff8c00',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    hireButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default WorkerProfileScreen;