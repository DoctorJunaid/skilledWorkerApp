import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card, Button, useTheme } from '../components';

const { width, height } = Dimensions.get('window');

interface OptionScreenProps {
  onFindWorkers: () => void;
  onJoinAsWorker: () => void;
}

const OptionScreen: React.FC<OptionScreenProps> = ({
  onFindWorkers,
  onJoinAsWorker,
}) => {
  const theme = useTheme();
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const option1Scale = useRef(new Animated.Value(0.8)).current;
  const option1Opacity = useRef(new Animated.Value(0)).current;
  const option2Scale = useRef(new Animated.Value(0.8)).current;
  const option2Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate title
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(titleTranslateY, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate options with delay
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(option1Opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(option1Scale, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 200);
    
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(option2Opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(option2Scale, {
          toValue: 1,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 400);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={theme.COLORS.surface} barStyle="dark-content" />
      
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.titleContainer, 
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }],
            }
          ]}
        >
          <Text style={styles.title}>Choose Your Path</Text>
          <Text style={styles.subtitle}>
            How would you like to use our platform?
          </Text>
        </Animated.View>

        <View style={styles.optionsContainer}>
          <Animated.View 
            style={[
              styles.optionWrapper, 
              {
                opacity: option1Opacity,
                transform: [{ scale: option1Scale }],
              }
            ]}
          >
            <Card
              style={[styles.optionCard, styles.findWorkersCard]}
              onPress={onFindWorkers}
            >
              <View style={styles.iconContainer}>
                <Icon name="search" size={32} color={theme.COLORS.primary} />
              </View>
              <Text style={styles.optionTitle}>Find Workers</Text>
              <Text style={styles.optionDescription}>
                Discover skilled professionals for your projects
              </Text>
              <View style={styles.arrowContainer}>
                <Icon name="arrow-forward" size={20} color={theme.COLORS.primary} />
              </View>
            </Card>
          </Animated.View>

          <Animated.View 
            style={[
              styles.optionWrapper, 
              {
                opacity: option2Opacity,
                transform: [{ scale: option2Scale }],
              }
            ]}
          >
            <Card
              style={[styles.optionCard, styles.joinWorkerCard]}
              onPress={onJoinAsWorker}
            >
              <View style={styles.iconContainer}>
                <Icon name="work" size={32} color={theme.COLORS.secondary} />
              </View>
              <Text style={styles.optionTitle}>Join as Worker</Text>
              <Text style={styles.optionDescription}>
                Offer your skills and connect with clients
              </Text>
              <View style={styles.arrowContainer}>
                <Icon name="arrow-forward" size={20} color={theme.COLORS.secondary} />
              </View>
            </Card>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.surface,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.SPACING.xl,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: theme.SPACING.xxl,
  },
  title: {
    fontSize: theme.FONT_SIZES.xxl,
    fontWeight: theme.FONT_WEIGHTS.light,
    color: theme.COLORS.text,
    textAlign: 'center',
    marginBottom: theme.SPACING.sm,
    letterSpacing: 1.0,
  },
  subtitle: {
    fontSize: theme.FONT_SIZES.md,
    fontWeight: theme.FONT_WEIGHTS.light,
    color: theme.COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.SPACING.lg,
    letterSpacing: 0.6,
  },
  optionsContainer: {
    gap: theme.SPACING.xl,
  },
  optionWrapper: {
    width: '100%',
  },
  optionCard: {
    backgroundColor: theme.COLORS.white,
    borderRadius: theme.BORDER_RADIUS.lg,
    padding: theme.SPACING.xl,
    alignItems: 'center',
    shadowColor: theme.COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 0.5,
    borderColor: theme.COLORS.border,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  findWorkersCard: {
    borderLeftWidth: 3,
    borderLeftColor: theme.COLORS.primary,
    backgroundColor: theme.COLORS.backgroundLight,
  },
  joinWorkerCard: {
    borderLeftWidth: 3,
    borderLeftColor: theme.COLORS.secondary,
    backgroundColor: theme.COLORS.backgroundLight,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.SPACING.md,
    shadowColor: theme.COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  optionTitle: {
    fontSize: theme.FONT_SIZES.lg,
    fontWeight: theme.FONT_WEIGHTS.medium,
    color: theme.COLORS.text,
    marginBottom: theme.SPACING.xs,
    textAlign: 'center',
    letterSpacing: 0.8,
  },
  optionDescription: {
    fontSize: theme.FONT_SIZES.sm,
    fontWeight: theme.FONT_WEIGHTS.light,
    color: theme.COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.SPACING.md,
    letterSpacing: 0.4,
  },
  arrowContainer: {
    alignSelf: 'flex-end',
    backgroundColor: theme.COLORS.backgroundLight,
    borderRadius: theme.BORDER_RADIUS.md,
    padding: theme.SPACING.xs,
  },
});

export default OptionScreen;