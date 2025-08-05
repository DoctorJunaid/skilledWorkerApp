import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Storage } from '../utils/storage';
import { BottomNavBar, CustomAlert, Card, Avatar, Badge, Button, Header } from '../components';
import { useTheme } from '../components/ThemeProvider';

const { width, height } = Dimensions.get('window');

// Enhanced data structure for Supabase preparation
const mockFeaturedWorkers = [
  {
    id: 1,
    name: 'Alex Johnson',
    profession: 'Plumber • $50/hr',
    rating: 4.9,
    reviews: 94,
    avatar: 'https://example.com/avatar1.jpg', // Will be replaced with actual images
    avatarText: 'AJ',
    verified: true,
    available: true,
    profileImage: null,
    hourlyRate: 50,
    category: 'plumbing',
    location: { lat: 31.5204, lng: 74.3587 },
    distance: '2.1 km'
  },
  {
    id: 2,
    name: 'Samantha Lee',
    profession: 'Electrician • $50/hr',
    rating: 4.8,
    reviews: 89,
    avatar: 'https://example.com/avatar2.jpg',
    avatarText: 'SL',
    verified: true,
    available: true,
    profileImage: null,
    hourlyRate: 50,
    category: 'electrical',
    location: { lat: 31.5304, lng: 74.3487 },
    distance: '1.8 km'
  },
  {
    id: 3,
    name: 'Michael Brown',
    profession: 'Carpenter • $45/hr',
    rating: 4.7,
    reviews: 72,
    avatar: 'https://example.com/avatar3.jpg',
    avatarText: 'MB',
    verified: true,
    available: false,
    profileImage: null,
    hourlyRate: 45,
    category: 'carpentry',
    location: { lat: 31.5104, lng: 74.3687 },
    distance: '3.2 km'
  }
];

const mockTopCategories = [
  { 
    id: 1, 
    name: 'Home Repair', 
    icon: 'construct-outline', 
    count: 24,
    color: '#FF8C00',
    backgroundColor: '#FFF4E6'
  },
  { 
    id: 2, 
    name: 'Painting', 
    icon: 'brush-outline', 
    count: 18,
    color: '#FF8C00',
    backgroundColor: '#FFF4E6'
  },
  { 
    id: 3, 
    name: 'Cleaning', 
    icon: 'sparkles-outline', 
    count: 32,
    color: '#FF8C00',
    backgroundColor: '#FFF4E6'
  },
  { 
    id: 4, 
    name: 'Electrical', 
    icon: 'flash-outline', 
    count: 15,
    color: '#FF8C00',
    backgroundColor: '#FFF4E6'
  },
  { 
    id: 5, 
    name: 'Plumbing', 
    icon: 'water-outline', 
    count: 21,
    color: '#FF8C00',
    backgroundColor: '#FFF4E6'
  },
  { 
    id: 6, 
    name: 'Gardening', 
    icon: 'leaf-outline', 
    count: 19,
    color: '#FF8C00',
    backgroundColor: '#FFF4E6'
  }
];

// Mock location - will be dynamic with Supabase/GPS
const mockUserLocation = {
  city: 'Lahore',
  country: 'Pakistan',
  area: 'DHA Phase 5'
};

interface HomeScreenProps {
  onSignOut?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToMessages?: () => void;
}

const HomeScreen = ({ onSignOut, onNavigateToProfile, onNavigateToSearch, onNavigateToMessages }: HomeScreenProps) => {
  const theme = useTheme();
  const [user, setUser] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'default' as 'default' | 'success' | 'error' | 'warning',
    onConfirm: () => { },
    onCancel: () => { }
  });

  // Animation values
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-20)).current;
  const searchOpacity = useRef(new Animated.Value(0)).current;
  const searchScale = useRef(new Animated.Value(0.95)).current;
  const categoriesOpacity = useRef(new Animated.Value(0)).current;
  const featuredOpacity = useRef(new Animated.Value(0)).current;
  const servicesOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadUserData();
    startAnimations();
  }, []);

  const startAnimations = () => {
    // Fast, lightweight animations for performance
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(searchOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(searchScale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(categoriesOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(featuredOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

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

  const renderCategoryCard = (category: any) => (
    <TouchableOpacity key={category.id} style={styles.categoryCard} activeOpacity={0.9}>
      <View style={styles.categoryIconContainer}>
        <Icon name={category.icon} size={22} color="#ff8c00" />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );

  const renderFeaturedService = (service: any) => (
    <View key={service.id} style={styles.featuredCard}>
      <View style={styles.featuredHeader}>
        <View style={styles.workerAvatar}>
          <Text style={styles.workerAvatarText}>{service.worker.avatar}</Text>
        </View>
        <View style={styles.featuredInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.featuredTitle}>{service.title}</Text>
            {service.worker.verified && (
              <Icon name="verified" size={16} color="#ffffff" style={styles.verifiedIcon} />
            )}
          </View>
          <Text style={styles.featuredSubtitle}>{service.subtitle}</Text>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Icon name="bookmark-border" size={20} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>
      </View>

      <Text style={styles.featuredDescription}>{service.description}</Text>

      <View style={styles.featuredFooter}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color="#ffffff" />
          <Text style={styles.ratingText}>{service.rating}</Text>
          <Text style={styles.reviewsText}>({service.reviews})</Text>
        </View>
        <Text style={styles.priceText}>${service.price}/hour</Text>
      </View>
    </View>
  );

  const renderFeaturedWorkerCard = (worker: any) => (
    <Card key={worker.id} style={styles.newWorkerCard} onPress={() => {}} elevation={2}>
      <View style={styles.workerCardHeader}>
        <Avatar 
          size="medium" 
          text={worker.avatarText} 
          verified={worker.verified}
        />
        <View style={styles.newWorkerInfo}>
          <View style={styles.workerNameContainer}>
            <Text style={styles.newWorkerName}>{worker.name}</Text>
            <TouchableOpacity style={styles.bookmarkIcon}>
              <Icon name="bookmark-outline" size={16} color={theme.COLORS.text.secondary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.newWorkerProfession}>{worker.profession}</Text>
          <View style={styles.workerTypeContainer}>
            <Badge variant="primary" size="small" label="Expert level" />
            <Text style={styles.workerRate}>150K/year</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderTopCategoryCard = (category: any) => (
    <Card key={category.id} style={styles.topCategoryCard} onPress={() => {}} elevation={1}>
      <View style={[styles.topCategoryIconContainer, { backgroundColor: category.backgroundColor }]}>
        <Icon name={category.icon} size={32} color={category.color} />
      </View>
      <Text style={styles.topCategoryName}>{category.name}</Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={theme.COLORS.surface} barStyle="dark-content" />
      
      <Header title="Find a worker" transparent />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

        {/* Search Bar */}
        <Animated.View 
          style={[
            styles.searchContainer,
            {
              opacity: searchOpacity,
              transform: [{ scale: searchScale }],
            }
          ]}
        >
          <View style={styles.searchRow}>
            <TouchableOpacity
              style={styles.searchInput}
              onPress={handleSearchInputPress}
              activeOpacity={0.8}
            >
              <Icon name="search" size={20} color={theme.COLORS.text.secondary} style={styles.searchIcon} />
              <Text style={styles.searchPlaceholder}>Enter skill or task</Text>
            </TouchableOpacity>
            <Button 
              variant="outline" 
              size="small" 
              icon="options-outline" 
              iconOnly 
              onPress={() => {}}
              style={styles.filterButton}
            />
          </View>
        </Animated.View>

        {/* Featured Workers */}
        <Animated.View style={[styles.featuredSection, { opacity: featuredOpacity }]}>
          <Text style={styles.sectionTitle}>Featured Workers</Text>
          {mockFeaturedWorkers.map(renderFeaturedWorkerCard)}
        </Animated.View>

        {/* Top Categories */}
        <Animated.View style={[styles.categoriesSection, { opacity: categoriesOpacity }]}>
          <Text style={styles.sectionTitle}>Top Categories</Text>
          <View style={styles.topCategoriesGrid}>
            {mockTopCategories.slice(0, 2).map(renderTopCategoryCard)}
          </View>
        </Animated.View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Math.max(20, height * 0.02),
    paddingHorizontal: Math.max(24, width * 0.06),
    paddingBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#ff8c00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  userDetails: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 0.4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fffbf7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#fff2e6',
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  titleContainer: {
    paddingHorizontal: Math.max(24, width * 0.06),
    marginBottom: height * 0.03,
  },
  mainTitle: {
    fontSize: Math.min(32, width * 0.08),
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 0.8,
    lineHeight: Math.min(38, width * 0.095),
  },
  mainTitleAccent: {
    fontSize: Math.min(32, width * 0.08),
    fontWeight: '700',
    color: '#ff8c00',
    letterSpacing: 0.8,
    lineHeight: Math.min(38, width * 0.095),
  },
  searchContainer: {
    paddingHorizontal: Math.max(24, width * 0.06),
    marginBottom: height * 0.04,
  },
  searchInput: {
    backgroundColor: '#fffbf7',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff2e6',
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
    minHeight: 58,
  },
  searchIcon: {
    marginRight: 14,
  },
  searchPlaceholder: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    flex: 1,
    letterSpacing: 0.3,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingLeft: 4,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#666666',
    marginLeft: 6,
    letterSpacing: 0.2,
  },
  categoriesSection: {
    marginBottom: height * 0.04,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    paddingHorizontal: Math.max(24, width * 0.06),
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  categoriesContainer: {
    paddingLeft: Math.max(24, width * 0.06),
    paddingRight: 12,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginRight: 14,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: '#fff9f5',
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff9f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 4,
    letterSpacing: 0.2,
  },

  featuredSection: {
    marginBottom: height * 0.04,
  },
  featuredCard: {
    backgroundColor: '#ff8c00',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: Math.max(24, width * 0.06),
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  workerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff2e6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  workerAvatarText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ff8c00',
    letterSpacing: 0.5,
  },
  featuredInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#ffffff',
    letterSpacing: 0.6,
    marginRight: 8,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    fontWeight: '200',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    letterSpacing: 0.4,
  },
  bookmarkButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  featuredDescription: {
    fontSize: 14,
    fontWeight: '200',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
    letterSpacing: 0.4,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ffffff',
    marginLeft: 6,
    letterSpacing: 0.3,
  },
  reviewsText: {
    fontSize: 12,
    fontWeight: '200',
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#ffffff',
    letterSpacing: 0.6,
  },
  servicesSection: {
    marginBottom: height * 0.02,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Math.max(24, width * 0.06),
    marginBottom: 18,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ff8c00',
    letterSpacing: 0.4,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginHorizontal: Math.max(24, width * 0.06),
    marginBottom: 16,
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: '#fff9f5',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  serviceAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#fff2e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  serviceAvatarText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ff8c00',
    letterSpacing: 0.4,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#2c2c2c',
    letterSpacing: 0.4,
    marginRight: 6,
  },
  serviceVerifiedIcon: {
    marginLeft: 4,
  },
  serviceRole: {
    fontSize: 13,
    fontWeight: '200',
    color: '#8a8a8a',
    marginTop: 3,
    letterSpacing: 0.3,
  },
  serviceBookmarkButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#fffbf7',
  },
  serviceDescription: {
    fontSize: 13,
    fontWeight: '200',
    color: '#8a8a8a',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceRatingText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#2c2c2c',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  serviceReviewsText: {
    fontSize: 11,
    fontWeight: '200',
    color: '#8a8a8a',
    marginLeft: 3,
    letterSpacing: 0.2,
  },
  servicePriceText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ff8c00',
    letterSpacing: 0.4,
  },
  // Worker Card Styles
  workersSection: {
    marginBottom: height * 0.02,
  },
  workerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: Math.max(24, width * 0.06),
    marginBottom: 18,
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: '#fff9f5',
  },
  workerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  workerLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  workerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  workerRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 60,
  },
  workerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  workerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 0.3,
  },
  workerVerifiedIcon: {
    marginLeft: 6,
  },
  workerProfession: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  workerDistance: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
    letterSpacing: 0.1,
  },
  workerStatus: {
    alignItems: 'flex-end',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  availabilityText: {
    fontSize: 11,
    fontWeight: '300',
    color: '#8a8a8a',
    letterSpacing: 0.2,
  },
  workerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workerRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerRatingText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#2c2c2c',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  workerReviewsText: {
    fontSize: 11,
    fontWeight: '200',
    color: '#8a8a8a',
    marginLeft: 3,
    letterSpacing: 0.2,
  },
  workerPriceText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#ff8c00',
    letterSpacing: 0.4,
  },
  // New cleaner worker card styles
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ff8c00',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  workerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 12,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '300',
    color: '#8a8a8a',
    letterSpacing: 0.2,
  },
  workerPrice: {
    fontSize: 18,
    fontWeight: '400',
    color: '#ff8c00',
    letterSpacing: 0.4,
  },
  workerPriceUnit: {
    fontSize: 11,
    fontWeight: '200',
    color: '#8a8a8a',
    letterSpacing: 0.2,
    marginTop: 2,
  },
  workerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '400',
    color: '#2c2c2c',
    marginLeft: 4,
    letterSpacing: 0.2,
  },
  bottomSpacing: {
    height: 100,
  },
  titleSection: {
    marginBottom: theme.SPACING.md,
  },
  
  // New Header Styles
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF4E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 0.3,
  },
  profileButton: {
    padding: 4,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  
  // Featured Worker Card Styles
  featuredWorkerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: Math.max(24, width * 0.06),
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredWorkerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredWorkerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  featuredWorkerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featuredWorkerAvatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.3,
  },
  featuredWorkerInfo: {
    flex: 1,
  },
  featuredWorkerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  featuredWorkerProfession: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  featuredWorkerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredWorkerReviews: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  
  // Top Categories Styles
  topCategoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topCategoryCard: {
    backgroundColor: theme.COLORS.primaryBackground,
    borderRadius: theme.BORDER_RADIUS.lg,
    padding: theme.SPACING.md,
    alignItems: 'center',
    flex: 0.48,
    minHeight: 120,
    justifyContent: 'center',
  },
  topCategoryIconContainer: {
    marginBottom: theme.SPACING.sm,
  },
  topCategoryName: {
    fontSize: theme.FONT_SIZES.md,
    fontWeight: theme.FONT_WEIGHTS.semibold,
    color: theme.COLORS.text.primary,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  
  // New Title Section Styles
  titleSection: {
    paddingHorizontal: Math.max(24, width * 0.06),
    paddingTop: Math.max(20, height * 0.02),
    marginBottom: height * 0.03,
  },
  
  // Updated Search Styles
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF4E6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff2e6',
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // New Worker Card Styles
  newWorkerCard: {
    backgroundColor: theme.COLORS.primary,
    borderRadius: theme.BORDER_RADIUS.lg,
    padding: theme.SPACING.md,
    marginHorizontal: 0,
    marginBottom: theme.SPACING.md,
    shadowColor: theme.COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  workerCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  newWorkerInfo: {
    flex: 1,
  },
  workerNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  newWorkerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  bookmarkIcon: {
    padding: 4,
  },
  newWorkerProfession: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  workerTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workerTypeTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: theme.SPACING.sm,
    paddingVertical: theme.SPACING.xs,
    borderRadius: theme.BORDER_RADIUS.md,
  },
  workerTypeText: {
    fontSize: theme.FONT_SIZES.xs,
    fontWeight: theme.FONT_WEIGHTS.medium,
    color: theme.COLORS.white,
    letterSpacing: 0.3,
  },
  workerRate: {
    fontSize: theme.FONT_SIZES.sm,
    fontWeight: theme.FONT_WEIGHTS.semibold,
    color: theme.COLORS.white,
    letterSpacing: 0.3,
  },
});

export default HomeScreen;