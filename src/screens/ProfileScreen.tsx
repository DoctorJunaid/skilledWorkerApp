import React, { useState, useEffect } from 'react';
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
import { Storage } from '../utils/storage';
import BottomNavBar from '../components/BottomNavBar';
import CustomAlert from '../components/CustomAlert';

const { width: screenWidth } = Dimensions.get('window');

interface ProfileScreenProps {
  onBack?: () => void;
}

const ProfileScreen = ({ onBack }: ProfileScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ 
    title: '', 
    message: '', 
    type: 'default' as 'default' | 'success' | 'error' | 'warning',
    onConfirm: () => {}
  });

  // Form fields
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await Storage.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.name || '');
        setAge(currentUser.age || '');
        setCity(currentUser.city || '');
        setEmail(currentUser.email || '');
        setPhone(currentUser.phone || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const showCustomAlert = (title: string, message: string, type: 'default' | 'success' | 'error' | 'warning' = 'default', onConfirm?: () => void) => {
    setAlertConfig({ 
      title, 
      message, 
      type,
      onConfirm: onConfirm || (() => setShowAlert(false))
    });
    setShowAlert(true);
  };

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      showCustomAlert('Validation Error', 'Please enter your name to continue.', 'error');
      return;
    }
    if (!email.trim()) {
      showCustomAlert('Validation Error', 'Please enter your email address.', 'error');
      return;
    }
    if (!email.includes('@')) {
      showCustomAlert('Invalid Email', 'Please enter a valid email address with @ symbol.', 'error');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user profile
      const updatedUser = {
        ...user,
        name,
        age,
        city,
        email,
        phone,
        updatedAt: new Date().toISOString(),
      };

      // Save updated profile (in real app, this would be an API call)
      console.log('Profile updated:', updatedUser);
      
      showCustomAlert(
        'Profile Updated!', 
        'Your profile has been successfully updated with the new information.', 
        'success',
        () => {
          setShowAlert(false);
          if (onBack) {
            onBack();
          }
        }
      );
    } catch (error) {
      showCustomAlert('Update Failed', 'Failed to update profile. Please check your connection and try again.', 'error');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (tab: 'home' | 'search' | 'messages' | 'profile') => {
    if (tab === 'home') {
      onBack?.();
    }
    // Add other navigation logic here
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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Complete Profile Title */}
          <Text style={styles.profileTitle}>Complete your profile</Text>

          {/* Profile Picture Section */}
          <View style={styles.profilePictureSection}>
            <View style={styles.profilePicturePlaceholder}>
              <Text style={styles.userIcon}>👤</Text>
            </View>
            <Text style={styles.profilePictureText}>Add a profile picture</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor="#aaaaaa"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <View style={styles.dropdownContainer}>
              <TextInput
                style={[styles.input, styles.dropdownInput]}
                placeholder="Your Age"
                placeholderTextColor="#aaaaaa"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
              <Text style={styles.dropdownArrow}>▼</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Your City"
              placeholderTextColor="#aaaaaa"
              value={city}
              onChangeText={setCity}
              autoCapitalize="words"
            />

            <TextInput
              style={styles.input}
              placeholder="Your Email"
              placeholderTextColor="#aaaaaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TextInput
              style={styles.input}
              placeholder="Your Phone"
              placeholderTextColor="#aaaaaa"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Portfolio Upload Section */}
          <TouchableOpacity style={styles.portfolioSection}>
            <View style={styles.uploadIcon}>
              <Text style={styles.uploadArrow}>↑</Text>
            </View>
            <Text style={styles.portfolioText}>Upload your portfolio</Text>
          </TouchableOpacity>

          {/* Update Button */}
          <TouchableOpacity 
            style={[styles.updateButton, loading && styles.updateButtonDisabled]} 
            onPress={handleUpdateProfile}
            disabled={loading}
          >
            <Text style={styles.updateButtonText}>
              {loading ? 'Updating Profile...' : 'Update Profile'}
            </Text>
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
        showCancel={false}
      />

      {/* Bottom Navigation */}
      <BottomNavBar activeTab="profile" onTabPress={handleNavigation} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
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
    color: '#1a1a1a',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 30,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f8f9fa',
  },


  profileTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 35,
  },
  profilePictureSection: {
    alignItems: 'center',
    marginBottom: 35,
  },
  profilePicturePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#ff8c00',
    borderStyle: 'dashed',
  },
  userIcon: {
    fontSize: 40,
    color: '#cccccc',
  },
  profilePictureText: {
    fontSize: 15,
    color: '#666666',
    fontWeight: '500',
  },
  form: {
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 16,
    marginBottom: 20,
    color: '#333333',
    borderWidth: 2,
    borderColor: '#e9ecef',
    minHeight: 56,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  dropdownInput: {
    marginBottom: 0,
    paddingRight: 40,
  },
  dropdownArrow: {
    position: 'absolute',
    right: 16,
    top: 18,
    fontSize: 12,
    color: '#999999',
  },
  portfolioSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  uploadIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  uploadArrow: {
    fontSize: 16,
    color: '#666666',
  },
  portfolioText: {
    fontSize: 16,
    color: '#666666',
  },
  updateButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: 18,
    borderRadius: 25,
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
  updateButtonDisabled: {
    backgroundColor: '#cccccc',
    shadowOpacity: 0.1,
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ProfileScreen;