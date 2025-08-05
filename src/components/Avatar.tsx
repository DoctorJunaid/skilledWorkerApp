import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from './ThemeProvider';

type AvatarSize = 'small' | 'medium' | 'large';

interface AvatarProps {
  uri?: string | null;
  name?: string;
  size?: AvatarSize;
  style?: ViewStyle;
  verified?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 'medium',
  style,
  verified = false,
}) => {
  const theme = useTheme();

  const getSize = () => {
    switch (size) {
      case 'small':
        return 36;
      case 'medium':
        return 48;
      case 'large':
        return 64;
      default:
        return 48;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return theme.fontSizes.sm;
      case 'medium':
        return theme.fontSizes.md;
      case 'large':
        return theme.fontSizes.lg;
      default:
        return theme.fontSizes.md;
    }
  };

  const getInitials = () => {
    if (!name) return '';
    
    const nameParts = name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (
      nameParts[0].charAt(0).toUpperCase() + 
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };

  const avatarSize = getSize();

  return (
    <View style={[style, { position: 'relative' }]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[
            styles.avatar,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              backgroundColor: theme.colors.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.initials,
              {
                fontSize: getFontSize(),
                color: theme.colors.text.white,
              },
            ]}
          >
            {getInitials()}
          </Text>
        </View>
      )}
      {verified && (
        <View
          style={[
            styles.verifiedBadge,
            {
              width: avatarSize / 3,
              height: avatarSize / 3,
              borderRadius: avatarSize / 6,
              borderColor: theme.colors.surface,
              backgroundColor: theme.colors.status.success,
              right: 0,
              bottom: 0,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#E1E1E1',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontWeight: '600',
  },
  verifiedBadge: {
    position: 'absolute',
    borderWidth: 2,
  },
});

export default Avatar;