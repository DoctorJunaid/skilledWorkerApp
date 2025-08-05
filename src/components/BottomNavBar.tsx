import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants';

const { width: screenWidth } = Dimensions.get('window');

// SVG icon strings from assets/SVG folder
const homeIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;

const searchIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>`;

const messageIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M511.1 63.1v287.1c0 35.25-28.75 63.1-64 63.1h-144l-124.9 93.68c-7.875 5.75-19.12 .0497-19.12-9.7v-83.98h-96c-35.25 0-64-28.75-64-63.1V63.1c0-35.25 28.75-63.1 64-63.1h384C483.2 0 511.1 28.75 511.1 63.1z"/></svg>`;

const settingsIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"/></svg>`;

interface BottomNavBarProps {
  activeTab: 'home' | 'search' | 'messages' | 'settings';
  onTabPress: (tab: 'home' | 'search' | 'messages' | 'settings') => void;
}

const BottomNavBar = ({ activeTab, onTabPress }: BottomNavBarProps) => {
  const isActive = (tab: string) => activeTab === tab;
  const iconColor = (tab: string) => isActive(tab) ? COLORS.text.white : COLORS.text.secondary;

  const getSvgIcon = (tab: string) => {
    switch (tab) {
      case 'home':
        return homeIconSvg;
      case 'search':
        return searchIconSvg;
      case 'messages':
        return messageIconSvg;
      case 'settings':
        return settingsIconSvg;
      default:
        return homeIconSvg;
    }
  };

  const renderNavItem = (tab: 'home' | 'search' | 'messages' | 'settings', label: string) => (
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
      {renderNavItem('settings', 'Settings')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.dark,
    shadowColor: COLORS.shadow.dark,
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
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    minWidth: (screenWidth - 80) / 4,
    position: 'relative',
  },
  activeNavItem: {
    backgroundColor: COLORS.primaryBackground,
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
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.shadow.primary,
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
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});

export default BottomNavBar;