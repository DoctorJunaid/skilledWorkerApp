import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from './ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  rightComponent,
  transparent = false,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: transparent ? 'transparent' : theme.colors.surface,
          borderBottomColor: transparent ? 'transparent' : theme.colors.border.medium,
        },
      ]}
    >
      <StatusBar
        backgroundColor={transparent ? 'transparent' : theme.colors.surface}
        barStyle="dark-content"
        translucent={transparent}
      />
      <View style={styles.content}>
        {onBack && (
          <TouchableOpacity
            style={[styles.backButton, { marginRight: theme.spacing.md }]}
            onPress={onBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="arrow-back" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text.primary,
              fontSize: theme.fontSizes.lg,
              fontWeight: theme.fontWeights.semibold,
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View style={styles.rightContainer}>{rightComponent}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;