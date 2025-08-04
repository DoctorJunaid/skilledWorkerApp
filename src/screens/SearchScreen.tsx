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
import BottomNavBar from '../components/BottomNavBar';
import CustomAlert from '../components/CustomAlert';

const { width: screenWidth } = Dimensions.get('window');

interface SearchScreenProps {
    onBack?: () => void;
    onSearch?: (query: string) => void;
}

const SearchScreen = ({ onBack, onSearch }: SearchScreenProps) => {
    const [selectedServiceType, setSelectedServiceType] = useState('Plumbing');
    const [selectedProfessional, setSelectedProfessional] = useState('John Doe');
    const [selectedLocation, setSelectedLocation] = useState('New York, NY');
    const [selectedTags, setSelectedTags] = useState<string[]>(['Plumbing']);
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ title: '', message: '' });

    const serviceTypes = ['Plumbing', 'Electrical', 'Painting', 'Cleaning', 'Gardening', 'Carpentry', 'HVAC'];
    const professionals = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'];
    const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ'];

    const showCustomAlert = (title: string, message: string) => {
        setAlertConfig({ title, message });
        setShowAlert(true);
    };

    const handleTagPress = (tag: string) => {
        setSelectedTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            } else {
                return [...prev, tag];
            }
        });
    };

    const handleSearch = () => {
        if (selectedTags.length === 0) {
            showCustomAlert('No Service Selected', 'Please select at least one service type to continue.');
            return;
        }
        
        // Navigate to search results with the search query
        const searchQuery = `${selectedTags.join(', ')} in ${selectedLocation}`;
        onSearch?.(searchQuery);
    };

    const handleNavigation = (tab: 'home' | 'search' | 'messages' | 'profile') => {
        if (tab === 'home') {
            onBack?.();
        }
        console.log('Navigate to:', tab);
    };

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
                <Text style={styles.headerTitle}>Search</Text>
                <TouchableOpacity style={styles.starButton}>
                    <Text style={styles.starIcon}>⭐</Text>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    {/* Main Title */}
                    <Text style={styles.mainTitle}>Find Home Services</Text>

                    {/* Service Type */}
                    <Text style={styles.sectionLabel}>Service type</Text>
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownIcon}>👤</Text>
                        <Text style={styles.dropdownText}>{selectedServiceType}</Text>
                        <Text style={styles.dropdownArrow}>▼</Text>
                    </TouchableOpacity>

                    {/* Professional Name */}
                    <Text style={styles.sectionLabel}>Professional name</Text>
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownIcon}>📍</Text>
                        <Text style={styles.dropdownText}>{selectedProfessional}</Text>
                        <Text style={styles.dropdownArrow}>▼</Text>
                    </TouchableOpacity>

                    {/* Service Location */}
                    <Text style={styles.sectionLabel}>Service location</Text>
                    <TouchableOpacity style={styles.locationDropdown}>
                        <Text style={styles.dropdownIcon}>🗺️</Text>
                        <Text style={styles.dropdownText}>{selectedLocation}</Text>
                        <TouchableOpacity style={styles.locationButton}>
                            <Text style={styles.locationButtonIcon}>📍</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    {/* Upgrade Plan Button */}
                    <TouchableOpacity style={styles.upgradeButton}>
                        <Text style={styles.upgradeButtonText}>UPGRADE PLAN</Text>
                    </TouchableOpacity>

                    {/* Budget Range */}
                    <Text style={styles.sectionLabel}>Budget range</Text>
                    <View style={styles.budgetContainer}>
                        <View style={styles.budgetChart}>
                            {/* Budget bars visualization */}
                            <View style={styles.budgetBars}>
                                <View style={[styles.budgetBar, { height: 20 }]} />
                                <View style={[styles.budgetBar, { height: 35 }]} />
                                <View style={[styles.budgetBar, { height: 25 }]} />
                                <View style={[styles.budgetBar, { height: 40 }]} />
                                <View style={[styles.budgetBar, { height: 30 }]} />
                                <View style={[styles.budgetBar, { height: 45 }]} />
                                <View style={[styles.budgetBar, { height: 35 }]} />
                                <View style={[styles.budgetBar, { height: 25 }]} />
                                <View style={[styles.budgetBar, { height: 30 }]} />
                            </View>
                            <View style={styles.budgetLabels}>
                                <Text style={styles.budgetLabel}>$0</Text>
                                <Text style={styles.budgetLabel}>$500</Text>
                                <Text style={styles.budgetLabel}>$1000</Text>
                                <Text style={styles.budgetLabel}>$1500</Text>
                            </View>
                        </View>
                    </View>

                    {/* Service Type Tags */}
                    <Text style={styles.sectionLabel}>Service type</Text>
                    <View style={styles.tagsContainer}>
                        <View style={styles.tagsRow}>
                            {serviceTypes.slice(0, 3).map((service) => (
                                <TouchableOpacity
                                    key={service}
                                    style={[
                                        styles.tag,
                                        selectedTags.includes(service) && styles.tagSelected
                                    ]}
                                    onPress={() => handleTagPress(service)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.tagText,
                                        selectedTags.includes(service) && styles.tagTextSelected
                                    ]}>
                                        {service}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.tagsRow}>
                            {serviceTypes.slice(3, 5).map((service) => (
                                <TouchableOpacity
                                    key={service}
                                    style={[
                                        styles.tag,
                                        selectedTags.includes(service) && styles.tagSelected
                                    ]}
                                    onPress={() => handleTagPress(service)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.tagText,
                                        selectedTags.includes(service) && styles.tagTextSelected
                                    ]}>
                                        {service}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            <View style={styles.tagPlaceholder} />
                        </View>
                    </View>

                    {/* Search Button */}
                    <TouchableOpacity
                        style={[
                            styles.searchButton,
                            selectedTags.length === 0 && styles.searchButtonDisabled
                        ]}
                        onPress={handleSearch}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.searchButtonText}>Search Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Custom Alert */}
            <CustomAlert
                visible={showAlert}
                title={alertConfig.title}
                message={alertConfig.message}
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
    starButton: {
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
    starIcon: {
        fontSize: 20,
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
    mainTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 30,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666666',
        marginBottom: 12,
        marginTop: 20,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 8,
    },
    locationDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 8,
        position: 'relative',
    },
    dropdownIcon: {
        fontSize: 16,
        marginRight: 12,
        color: '#666666',
    },
    dropdownText: {
        flex: 1,
        fontSize: 16,
        color: '#333333',
    },
    dropdownArrow: {
        fontSize: 12,
        color: '#666666',
    },
    locationButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ff8c00',
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationButtonIcon: {
        fontSize: 14,
    },
    upgradeButton: {
        backgroundColor: '#000000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: 'center',
        marginVertical: 20,
    },
    upgradeButtonText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
    budgetContainer: {
        marginBottom: 10,
    },
    budgetChart: {
        alignItems: 'center',
    },
    budgetBars: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 50,
        marginBottom: 10,
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    budgetBar: {
        width: 8,
        backgroundColor: '#ff8c00',
        borderRadius: 4,
        marginHorizontal: 2,
    },
    budgetLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    budgetLabel: {
        fontSize: 12,
        color: '#666666',
    },
    tagsContainer: {
        marginBottom: 20,
    },
    tagsRow: {
        flexDirection: 'row',
        marginBottom: 12,
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: '#ff8c00',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        minWidth: (screenWidth - 90) / 3.2, // Dynamic width based on screen size
        maxWidth: (screenWidth - 90) / 2.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
        numberOfLines: 1,
    },
    searchButton: {
        backgroundColor: '#ff8c00',
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    searchButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    searchButtonDisabled: {
        backgroundColor: '#cccccc',
        opacity: 0.6,
    },
    tagSelected: {
        backgroundColor: '#ff6b35',
        transform: [{ scale: 1.05 }],
        shadowColor: '#ff8c00',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    tagTextSelected: {
        fontWeight: '700',
    },
    tagPlaceholder: {
        minWidth: (screenWidth - 90) / 3.2,
    },
});

export default SearchScreen;