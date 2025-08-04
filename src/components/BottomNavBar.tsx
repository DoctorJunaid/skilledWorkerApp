import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

// SVG icon strings from assets/SVG folder
const homeIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;

const searchIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>`;

const messageIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.1 63.1v287.1c0 35.25-28.75 63.1-64 63.1h-144l-124.9 93.68c-7.875 5.75-19.12 .0497-19.12-9.7v-83.98h-96c-35.25 0-64-28.75-64-63.1V63.1c0-35.25 28.75-63.1 64-63.1h384C483.2 0 511.1 28.75 511.1 63.1z"/></svg>`;

const userIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c39.77 0 72 32.24 72 72S295.8 272 256 272c-39.76 0-72-32.24-72-72S216.2 128 256 128zM256 448c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"/></svg>`;

interface BottomNavBarProps {
  activeTab: 'home' | 'search' | 'messages' | 'profile';
  onTabPress: (tab: 'home' | 'search' | 'messages' | 'profile') => void;
}

const BottomNavBar = ({ activeTab, onTabPress }: BottomNavBarProps) => {
  const isActive = (tab: string) => activeTab === tab;
  const iconColor = (tab: string) => isActive(tab) ? '#ffffff' : '#666666';

  const getSvgIcon = (tab: string) => {
    switch (tab) {
      case 'home':
        return homeIconSvg;
      case 'search':
        return searchIconSvg;
      case 'messages':
        return messageIconSvg;
      case 'profile':
        return userIconSvg;
      default:
        return homeIconSvg;
    }
  };

  const renderNavItem = (tab: 'home' | 'search' | 'messages' | 'profile', label: string) => (
    <TouchableOpacity
      key={tab}
      style={[
        styles.navItem,
        isActive(tab) && styles.activeNavItem
      ]}
      onPress={() => onTabPress(tab)}
      activeOpacity={0.7}
    >
      <View style={[
        styles.iconContainer,
        isActive(tab) && styles.activeIconContainer
      ]}>
        <SvgXml 
          xml={getSvgIcon(tab)} 
          fill={iconColor(tab)} 
          width="20" 
          height="20" 
        />
      </View>
      {isActive(tab) && (
        <View style={styles.activeIndicator} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderNavItem('home', 'Home')}
      {renderNavItem('search', 'Search')}
      {renderNavItem('messages', 'Messages')}
      {renderNavItem('profile', 'Profile')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: (screenWidth - 80) / 4,
    position: 'relative',
  },
  activeNavItem: {
    backgroundColor: '#fff3e0',
    transform: [{ scale: 1.1 }],
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#ff8c00',
    shadowColor: '#ff8c00',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 20,
    height: 3,
    backgroundColor: '#ff8c00',
    borderRadius: 2,
  },
});

export default BottomNavBar;