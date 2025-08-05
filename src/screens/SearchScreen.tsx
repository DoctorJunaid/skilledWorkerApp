import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ScrollView,
    SafeAreaView,
    Modal,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../components/BottomNavBar';
import CustomAlert from '../components/CustomAlert';

interface SearchScreenProps {
    onBack?: () => void;
    onSearch?: (query: string) => void;
}

const SearchScreen = ({ onBack, onSearch }: SearchScreenProps) => {
    const [selectedSkill, setSelectedSkill] = useState('Cleaning');
    const [selectedSpecialty, setSelectedSpecialty] = useState('Deep Cleaning');
    const [selectedCity, setSelectedCity] = useState('Berlin, DE');

    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({ title: '', message: '' });
    
    // Dropdown states
    const [showSkillDropdown, setShowSkillDropdown] = useState(false);
    const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    const skills = ['Cleaning', 'Plumbing', 'Electrical', 'Painting', 'Gardening', 'Carpentry'];
    const specialties = {
        'Cleaning': ['Deep Cleaning', 'Regular Cleaning', 'Office Cleaning', 'Window Cleaning'],
        'Plumbing': ['Pipe Repair', 'Drain Cleaning', 'Fixture Installation', 'Emergency Plumbing'],
        'Electrical': ['Wiring', 'Light Installation', 'Circuit Repair', 'Panel Upgrade'],
        'Painting': ['Interior Painting', 'Exterior Painting', 'Wall Preparation', 'Color Consultation'],
        'Gardening': ['Lawn Care', 'Tree Trimming', 'Garden Design', 'Pest Control'],
        'Carpentry': ['Furniture Repair', 'Custom Cabinets', 'Flooring', 'Door Installation']
    };
    const cities = ['Berlin, DE', 'Munich, DE', 'Hamburg, DE', 'Frankfurt, DE', 'Cologne, DE', 'Stuttgart, DE'];

    const showCustomAlert = (title: string, message: string) => {
        setAlertConfig({ title, message });
        setShowAlert(true);
    };

    const handleSkillSelect = (skill: string) => {
        setSelectedSkill(skill);
        setSelectedSpecialty(specialties[skill][0]); // Auto-select first specialty
        setShowSkillDropdown(false);
    };

    const handleSpecialtySelect = (specialty: string) => {
        setSelectedSpecialty(specialty);
        setShowSpecialtyDropdown(false);
    };

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
        setShowCityDropdown(false);
    };



    const handleSearch = () => {
        if (!selectedSkill || !selectedSpecialty || !selectedCity) {
            showCustomAlert('Missing Information', 'Please fill in all required fields to search.');
            return;
        }

        const searchQuery = {
            skill: selectedSkill,
            specialty: selectedSpecialty,
            city: selectedCity
        };
        
        showCustomAlert(
            'Search Started!', 
            `Searching for ${selectedSkill} specialists in ${selectedCity}...`
        );
        
        onSearch?.(JSON.stringify(searchQuery));
    };

    const handleNavigation = (tab: 'home' | 'search' | 'messages' | 'profile') => {
        if (tab === 'home') {
            onBack?.();
        }
        console.log('Navigate to:', tab);
    };

    const renderDropdownModal = (
        visible: boolean,
        onClose: () => void,
        items: string[],
        onSelect: (item: string) => void,
        title: string
    ) => (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity 
                style={styles.modalOverlay} 
                activeOpacity={1} 
                onPress={onClose}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => onSelect(item)}
                            >
                                <Text style={styles.modalItemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Search</Text>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.phoneContainer}>
                    {/* ASMRWO Header */}
                    <View style={styles.brandHeader}>
                        <Text style={styles.brandText}>ASMRWO</Text>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Skill Dropdown */}
                        <Text style={styles.sectionLabel}>Skill</Text>
                        <TouchableOpacity 
                            style={styles.dropdown}
                            onPress={() => setShowSkillDropdown(true)}
                        >
                            <Text style={styles.dropdownText}>{selectedSkill}</Text>
                            <Icon name="chevron-down" size={20} color="#999" />
                        </TouchableOpacity>

                        {/* Specialty Dropdown */}
                        <Text style={styles.sectionLabel}>Specialty</Text>
                        <TouchableOpacity 
                            style={styles.dropdown}
                            onPress={() => setShowSpecialtyDropdown(true)}
                        >
                            <Text style={styles.dropdownText}>{selectedSpecialty}</Text>
                            <Icon name="chevron-down" size={20} color="#999" />
                        </TouchableOpacity>

                        {/* City Input */}
                        <Text style={styles.sectionLabel}>City</Text>
                        <TouchableOpacity 
                            style={styles.dropdown}
                            onPress={() => setShowCityDropdown(true)}
                        >
                            <Text style={styles.dropdownText}>{selectedCity}</Text>
                            <Icon name="chevron-down" size={20} color="#999" />
                        </TouchableOpacity>





                        {/* Find Button */}
                        <TouchableOpacity style={styles.findButton} onPress={handleSearch}>
                            <Text style={styles.findButtonText}>Find</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Dropdown Modals */}
            {renderDropdownModal(
                showSkillDropdown,
                () => setShowSkillDropdown(false),
                skills,
                handleSkillSelect,
                'Select Skill'
            )}

            {renderDropdownModal(
                showSpecialtyDropdown,
                () => setShowSpecialtyDropdown(false),
                specialties[selectedSkill] || [],
                handleSpecialtySelect,
                'Select Specialty'
            )}

            {renderDropdownModal(
                showCityDropdown,
                () => setShowCityDropdown(false),
                cities,
                handleCitySelect,
                'Select City'
            )}

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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#F5F5F5',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#999',
        letterSpacing: 0.5,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    phoneContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        marginHorizontal: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        overflow: 'hidden',
    },
    brandHeader: {
        backgroundColor: '#CCCCCC',
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 2,
    },
    formContainer: {
        padding: 24,
        backgroundColor: '#FFFFFF',
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginTop: 16,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    dropdownText: {
        fontSize: 16,
        color: '#666',
        flex: 1,
    },

    findButton: {
        backgroundColor: '#ff8c00',
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#ff8c00',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    findButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        width: '80%',
        maxHeight: '60%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalItem: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    modalItemText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },

});

export default SearchScreen;