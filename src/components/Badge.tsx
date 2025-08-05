import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from './ThemeProvider';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  label?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  dot = false,
}) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'success':
        return theme.colors.status.success;
      case 'warning':
        return theme.colors.status.warning;
      case 'error':
        return theme.colors.status.error;
      case 'info':
        return theme.colors.status.info;
      default:
        return theme.colors.primary;
    }
  };

  const getSize = () => {
    if (dot) {
      switch (size) {
        case 'small':
          return 8;
        case 'medium':
          return 12;
        case 'large':
          return 16;
        default:
          return 12;
      }
    }
    return undefined;
  };

  const getPadding = () => {
    if (dot) return 0;
    
    switch (size) {
      case 'small':
        return { paddingVertical: 2, paddingHorizontal: 6 };
      case 'medium':
        return { paddingVertical: 4, paddingHorizontal: 8 };
      case 'large':
        return { paddingVertical: 6, paddingHorizontal: 12 };
      default:
        return { paddingVertical: 4, paddingHorizontal: 8 };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return theme.fontSizes.xs;
      case 'medium':
        return theme.fontSizes.sm;
      case 'large':
        return theme.fontSizes.md;
      default:
        return theme.fontSizes.sm;
    }
  };

  const dotSize = getSize();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: getBackgroundColor(),
          ...getPadding(),
          width: dot ? dotSize : undefined,
          height: dot ? dotSize : undefined,
          borderRadius: dot ? dotSize ? dotSize / 2 : 0 : theme.borderRadius.round,
        },
        style,
      ]}
    >
      {!dot && label && (
        <Text
          style={[
            styles.text,
            {
              color: theme.colors.text.white,
              fontSize: getFontSize(),
            },
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Badge;