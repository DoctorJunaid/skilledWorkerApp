import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Storage } from '../utils/storage';
import BottomNavBar from '../components/BottomNavBar';
import CustomAlert from '../components/CustomAlert';

interface SettingsScreenProps {
  onBack?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToMessages?: () => void;
  onSignOut?: () => void;
}

const SettingsScreen = ({ 
  onBack, 
  onNavigateToProfile, 
  onNavigateToHome, 
  onNavigateToSearch, 
  onNavigateToMessages,
  onSignOut 
}: SettingsScreenProps) => {
  const [user, setUser] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'default' as 'default' | 'success' | 'error' | 'warning',
    onConfirm: () => {},
    onCancel: () => {}
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

  const showCustomAlert = (
    title: string, 
    message: string, 
    type: 'default' | 'success' | 'error' | 'warning' = 'default',
    onConfirm?: () => void,
    onCancel?: () => void
  ) => {
    setAlertConfig({
      title,
      message,
      type,
      onConfirm: onConfirm || (() => setShowAlert(false)),
      onCancel: onCancel || (() => setShowAlert(false))
    });
    setShowAlert(true);
  };

  const handleLogOut = () => {
    showCustomAlert(
      'Log Out',
      'Are you sure you want to log out of your account?',
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

  const handleNavigation = (tab: 'home' | 'search' | 'messages' | 'settings') => {
    if (tab === 'home') {
      onNavigateToHome?.();
    } else if (tab === 'search') {
      onNavigateToSearch?.();
    } else if (tab === 'messages') {
      onNavigateToMessages?.();
    }
    console.log('Navigate to:', tab);
  };

  const settingsOptions = [
    { id: 1, title: 'My Profile', icon: 'person-outline', onPress: onNavigateToProfile },
    { id: 2, title: 'Profile View', icon: 'eye-outline', onPress: () => console.log('Profile View') },
    { id: 3, title: 'Quick Message', icon: 'chatbubble-outline', onPress: () => console.log('Quick Message') },
    { id: 4, title: 'Notifications', icon: 'notifications-outline', onPress: () => console.log('Notifications') },
    { id: 5, title: 'Task Automation', icon: 'settings-outline', onPress: () => console.log('Task Automation') },
    { id: 6, title: 'Support', icon: 'help-circle-outline', onPress: () => console.log('Support') },
  ];

  const renderSettingOption = (option: any) => (
    <TouchableOpacity 
      key={option.id} 
      style={styles.settingOption}
      onPress={option.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingIconContainer}>
        <Icon name={option.icon} size={20} color="#ffffff" />
      </View>
      <Text style={styles.settingText}>{option.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.settingsContainer}>
          {/* Settings Header */}
          <View style={styles.settingsHeader}>
            <Text style={styles.settingsTitle}>Settings</Text>
          </View>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>{user?.name?.charAt(0) || 'S'}</Text>
            </View>
            <Text style={styles.profileName}>Skilled Worker</Text>
          </View>

          {/* Settings Grid */}
          <View style={styles.settingsGrid}>
            {settingsOptions.map(renderSettingOption)}
          </View>

          {/* Upgrade Plan Badge */}
          <View style={styles.upgradeBadge}>
            <Text style={styles.upgradeBadgeText}>UPGRADE PLAN</Text>
          </View>

          {/* Log Out Button */}
          <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
            <Text style={styles.logOutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
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
      <BottomNavBar activeTab="settings" onTabPress={handleNavigation} />
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
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  settingsHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0.5,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.5,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0.3,
  },
  settingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  settingOption: {
    width: '48%',
    backgroundColor: '#ff8c00',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 100,
    justifyContent: 'center',
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  settingIconContainer: {
    marginBottom: 8,
  },
  settingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  upgradeBadge: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 30,
  },
  upgradeBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  logOutButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  logOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    letterSpacing: 0.3,
  },
});

export default SettingsScreen;