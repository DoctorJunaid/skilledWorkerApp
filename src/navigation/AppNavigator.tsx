import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import OptionScreen from '../screens/OptionScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import WorkerProfileScreen from '../screens/WorkerProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import SettingsScreen from '../screens/SettingsScreen';

// SVG icons
import { homeIconSvg, searchIconSvg, messageIconSvg, settingsIconSvg } from '../assets/icons';
import { useTheme } from '../components/ThemeProvider';

// Stack navigator types
export type AuthStackParamList = {
  Welcome: undefined;
  Option: undefined;
  Auth: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  SearchResults: { query: string };
  WorkerProfile: { workerId: string };
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Messages: undefined;
  Settings: undefined;
};

// Create navigators
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Tab Navigator
const MainTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSvg;

          if (route.name === 'Home') {
            iconSvg = homeIconSvg;
          } else if (route.name === 'Search') {
            iconSvg = searchIconSvg;
          } else if (route.name === 'Messages') {
            iconSvg = messageIconSvg;
          } else if (route.name === 'Settings') {
            iconSvg = settingsIconSvg;
          }

          return <SvgXml xml={iconSvg} width={size} height={size} fill={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          borderTopColor: theme.colors.border.dark,
          backgroundColor: theme.colors.surface,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Messages" component={MessageScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Auth Stack
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Option" component={OptionScreen} />
      <AuthStack.Screen name="Auth" component={AuthScreen} />
    </AuthStack.Navigator>
  );
};

// Main Stack
const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="SearchResults" component={SearchResultsScreen} />
      <MainStack.Screen name="WorkerProfile" component={WorkerProfileScreen} />
    </MainStack.Navigator>
  );
};

// Root Navigator
const AppNavigator = ({ isLoggedIn = false }) => {
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;