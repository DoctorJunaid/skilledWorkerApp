import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Storage } from '../utils/storage';
import BottomNavBar from '../components/BottomNavBar';
import CustomAlert from '../components/CustomAlert';

const { width: screenWidth } = Dimensions.get('window');

interface HomeScreenProps {
  onSignOut?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToMessages?: () => void;
}

const HomeScreen = ({ onSignOut, onNavigateToProfile, onNavigateToSearch, onNavigateToMessages }: HomeScreenProps) => {
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'default' as 'default' | 'success' | 'error' | 'warning',
    onConfirm: () => { },
    onCancel: () => { }
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await Storage.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleNavigation = (tab: 'home' | 'search' | 'messages' | 'profile') => {
    if (tab === 'profile') {
      onNavigateToProfile?.();
    } else if (tab === 'search') {
      onNavigateToSearch?.();
    } else if (tab === 'messages') {
      onNavigateToMessages?.();
    }
    console.log('Navigate to:', tab);
  };

  const handleSearchPress = () => {
    onNavigateToSearch?.();
  };

  const handleSearchInputPress = () => {
    onNavigateToSearch?.();
  };

  const showCustomAlert = (title: string, message: string, type: 'default' | 'success' | 'error' | 'warning' = 'default', onConfirm?: () => void, onCancel?: () => void) => {
    setAlertConfig({
      title,
      message,
      type,
      onConfirm: onConfirm || (() => setShowAlert(false)),
      onCancel: onCancel || (() => setShowAlert(false))
    });
    setShowAlert(true);
  };

  const handleSignOut = () => {
    showCustomAlert(
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      'warning',
      async () => {
        setShowAlert(false);
        await Storage.logout();
        if (onSignOut) {
          onSignOut();
        }
      },
      () => setShowAlert(false)
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'A'}</Text>
            </View>
            <View>
              <Text style={styles.userName}>{user?.name || 'Alex Smith'}</Text>
              <Text style={styles.userRole}>Home Service Expert</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton} onPress={handleSignOut}>
            <Text style={styles.logoutIcon}>🚪</Text>
          </TouchableOpacity>
        </View>

        {/* Main Title */}
        <Text style={styles.mainTitle}>Find a skilled worker</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity
            style={styles.searchInput}
            onPress={handleSearchInputPress}
            activeOpacity={0.7}
          >
            <Text style={styles.searchPlaceholder}>Enter service type or keyword</Text>
            <View style={styles.searchIconInInput}>
              <Text style={styles.searchIconText}>🔍</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchPress}
            activeOpacity={0.8}
          >
            <Text style={styles.searchButtonIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Services */}
        <Text style={styles.sectionTitle}>Featured services</Text>

        <View style={styles.featuredCard}>
          <View style={styles.featuredHeader}>
            <View style={styles.featuredIcon}>
              <Text style={styles.featuredIconText}>🔧</Text>
            </View>
            <View style={styles.featuredInfo}>
              <Text style={styles.featuredTitle}>Plumbing Specialist</Text>
              <Text style={styles.featuredSubtitle}>Expert plumber available</Text>
            </View>
            <TouchableOpacity style={styles.bookmarkButton}>
              <Text style={styles.bookmarkIconText}>🔖</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.featuredDescription}>Full-time / Freelance</Text>

          <View style={styles.featuredFooter}>
            <TouchableOpacity style={styles.expertButton}>
              <Text style={styles.expertButtonText}>Expert</Text>
            </TouchableOpacity>
            <Text style={styles.priceText}>$70/hour</Text>
          </View>
        </View>

        {/* Recommended Section */}
        <Text style={styles.sectionTitle}>Recommended for plumbing needs</Text>

        {/* Service Cards */}
        {[
          { name: 'Painter', role: 'Interior Designer', type: 'Part time / Freelance', price: '$50/hour', icon: '🎨' },
          { name: 'Handyman', role: 'Home Fixer', type: 'Full time / On-site', price: '$60/hour', icon: '🔨' },
          { name: 'Gardener', role: 'Garden Maintenance', type: 'Part time / Freelance', price: '$45/hour', icon: '🌱' },
        ].map((service, index) => (
          <View key={index} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceAvatar}>
                <Text style={styles.serviceAvatarText}>{service.icon}</Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceRole}>{service.role}</Text>
              </View>
              <TouchableOpacity style={styles.bookmarkButton}>
                <Text style={styles.serviceBookmarkIconText}>🔖</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.serviceType}>{service.type}</Text>

            <View style={styles.serviceFooter}>
              <TouchableOpacity style={styles.recommendedButton}>
                <Text style={styles.recommendedButtonText}>Recommended</Text>
              </TouchableOpacity>
              <Text style={styles.priceText}>{service.price}</Text>
            </View>
          </View>
        ))}

        {/* Bottom spacing for navbar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Custom Alert */}
      <CustomAlert
        visible={showAlert}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onConfirm={alertConfig.onConfirm}
        onCancel={alertConfig.onCancel}
        showCancel={alertConfig.onCancel !== undefined}
      />

      {/* Bottom Navigation */}
      <BottomNavBar activeTab="home" onTabPress={handleNavigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff8c00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  userRole: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    fontSize: 18,
    color: '#666666',
  },
  bookmarkIconText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  serviceBookmarkIconText: {
    fontSize: 16,
    color: '#666666',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#999999',
    flex: 1,
  },
  searchIconInInput: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff8c00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconText: {
    fontSize: 12,
  },
  searchButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ff8c00',
    justifyContent: 'center',
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
  searchButtonIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  featuredCard: {
    backgroundColor: '#d2691e',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featuredIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featuredIconText: {
    fontSize: 20,
  },
  featuredInfo: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  featuredSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  bookmarkButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  featuredDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expertButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  expertButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff3e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceAvatarText: {
    fontSize: 18,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  serviceRole: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  serviceType: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendedButton: {
    backgroundColor: '#ff8c00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  recommendedButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen;