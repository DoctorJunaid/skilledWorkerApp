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
    TextInput,
} from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import CustomAlert from '../components/CustomAlert';

const { width: screenWidth } = Dimensions.get('window');

interface SearchResultsScreenProps {
    onBack?: () => void;
    onWorkerPress?: (workerId: string) => void;
    searchQuery?: string;
}

interface Worker {
    id: string;
    name: string;
    profession: string;
    description: string;
    rating: number;
    experience: string;
    avatar: string;
    hourlyRate: string;
    location: string;
}

const SearchResultsScreen = ({ onBack, onWorkerPress, searchQuery = '' }: SearchResultsScreenProps) => {
    const [filterLocation, setFilterLocation] = useState('Remote');
    const [filterService, setFilterService] = useState('Electrical');
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ title: '', message: '', type: 'default' as any });

    // Mock search results data
    const searchResults: Worker[] = [
        {
            id: '1',
            name: 'John Smith',
            profession: 'Plumber',
            description: 'Expert in plumbing and electrical repairs with over 10 years of experience.',
            rating: 4.5,
            experience: '10+ years',
            avatar: '🔧',
            hourlyRate: '$65/hour',
            location: 'New York, NY'
        },
        {
            id: '2',
            name: 'Emily Johnson',
            profession: 'Carpenter',
            description: 'Specialized in carpentry and woodworking with a creative approach.',
            rating: 4.8,
            experience: '8 years',
            avatar: '🔨',
            hourlyRate: '$55/hour',
            location: 'Brooklyn, NY'
        },
        {
            id: '3',
            name: 'Michael Brown',
            profession: 'Electrician',
            description: 'Experienced electrician known for quick and reliable service.',
            rating: 4.7,
            experience: '12 years',
            avatar: '⚡',
            hourlyRate: '$70/hour',
            location: 'Queens, NY'
        }
    ];

    const showCustomAlert = (title: string, message: string, type: any = 'default') => {
        setAlertConfig({ title, message, type });
        setShowAlert(true);
    };

    const handleNavigation = (tab: 'home' | 'search' | 'messages' | 'profile') => {
        if (tab === 'home') {
            onBack?.();
        }
        console.log('Navigate to:', tab);
    };

    const handleWorkerPress = (workerId: string) => {
        onWorkerPress?.(workerId);
    };

    const renderWorkerCard = (worker: Worker) => (
        <View key={worker.id} style={styles.workerCard}>
            <View style={styles.workerHeader}>
                <View style={styles.workerAvatar}>
                    <Text style={styles.workerAvatarText}>{worker.avatar}</Text>
                </View>
                <View style={styles.workerInfo}>
                    <Text style={styles.workerName}>{worker.name}</Text>
                    <Text style={styles.workerDescription}>{worker.description}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.starIcon}>⭐</Text>
                        <Text style={styles.rating}>{worker.rating}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.viewProfileButton}
                onPress={() => handleWorkerPress(worker.id)}
                activeOpacity={0.8}
            >
                <Text style={styles.viewProfileText}>View Profile</Text>
            </TouchableOpacity>
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
                <Text style={styles.headerTitle}>Search Results</Text>
                <View style={styles.headerSpacer} />
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    {/* Search Header */}
                    <View style={styles.searchHeader}>
                        <Text style={styles.brandIcon}>🔍</Text>
                        <Text style={styles.brandName}>SkilledConnect</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            placeholderTextColor="#999999"
                            defaultValue={searchQuery}
                        />
                    </View>

                    {/* Filter Section */}
                    <Text style={styles.sectionLabel}>Filter Results</Text>
                    <View style={styles.filterContainer}>
                        <View style={styles.filterRow}>
                            <View style={styles.filterItem}>
                                <Text style={styles.filterLabel}>Location</Text>
                                <TouchableOpacity style={styles.filterDropdown}>
                                    <Text style={styles.filterValue}>{filterLocation}</Text>
                                    <Text style={styles.dropdownArrow}>▼</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.filterItem}>
                                <Text style={styles.filterLabel}>Service</Text>
                                <TouchableOpacity style={styles.filterDropdown}>
                                    <Text style={styles.filterValue}>{filterService}</Text>
                                    <Text style={styles.dropdownArrow}>▼</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Ratings Filter */}
                        <View style={styles.ratingsFilter}>
                            <Text style={styles.filterLabel}>Ratings</Text>
                            <View style={styles.ratingsSlider}>
                                <View style={styles.sliderTrack}>
                                    <View style={styles.sliderFill} />
                                    <View style={styles.sliderThumb} />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Results */}
                    <Text style={styles.resultsTitle}>
                        Found {searchResults.length} skilled workers
                    </Text>
                    
                    {searchResults.map(renderWorkerCard)}
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

            {/* Bottom Navigation */}
            <BottomNavBar activeTab="search" onTabPress={handleNavigation} />
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
    searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    brandIcon: {
        fontSize: 24,
        marginRight: 8,
    },
    brandName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        marginRight: 15,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333333',
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 15,
    },
    filterContainer: {
        marginBottom: 25,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    filterItem: {
        flex: 0.48,
    },
    filterLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 8,
    },
    filterDropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    filterValue: {
        fontSize: 16,
        color: '#333333',
    },
    dropdownArrow: {
        fontSize: 12,
        color: '#666666',
    },
    ratingsFilter: {
        marginTop: 10,
    },
    ratingsSlider: {
        marginTop: 10,
    },
    sliderTrack: {
        height: 6,
        backgroundColor: '#e9ecef',
        borderRadius: 3,
        position: 'relative',
    },
    sliderFill: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: 6,
        width: '60%',
        backgroundColor: '#ff8c00',
        borderRadius: 3,
    },
    sliderThumb: {
        position: 'absolute',
        right: '40%',
        top: -6,
        width: 18,
        height: 18,
        backgroundColor: '#ff8c00',
        borderRadius: 9,
        shadowColor: '#ff8c00',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 20,
    },
    workerCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    workerHeader: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    workerAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ff8c00',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    workerAvatarText: {
        fontSize: 24,
    },
    workerInfo: {
        flex: 1,
    },
    workerName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 6,
    },
    workerDescription: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
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
        fontWeight: '600',
        color: '#333333',
    },
    viewProfileButton: {
        backgroundColor: '#ff8c00',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
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
    viewProfileText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default SearchResultsScreen;