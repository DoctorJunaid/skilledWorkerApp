import React, { ReactNode } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from './ThemeProvider';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevation?: number;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  elevation = 2,
  noPadding = false,
}) => {
  const theme = useTheme();

  const cardStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: noPadding ? 0 : theme.spacing.lg,
    shadowColor: theme.colors.shadow.dark,
    shadowOffset: {
      width: 0,
      height: elevation,
    },
    shadowOpacity: 0.1,
    shadowRadius: elevation * 2,
    elevation: elevation,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.card, cardStyle, style]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.card, cardStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    overflow: 'hidden',
  },
});

export default Card;