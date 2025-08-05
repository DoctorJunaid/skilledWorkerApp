import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { ANIMATION } from '../constants';

export const useAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const fadeIn = (duration = ANIMATION.duration.normal) => {
    return Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    });
  };

  const fadeOut = (duration = ANIMATION.duration.normal) => {
    return Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    });
  };

  const slideIn = (duration = ANIMATION.duration.normal) => {
    return Animated.timing(slideAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    });
  };

  const scaleIn = (duration = ANIMATION.duration.normal) => {
    return Animated.timing(scaleAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    });
  };

  const staggeredEntrance = (delay = 100) => {
    return Animated.stagger(delay, [
      fadeIn(),
      slideIn(),
      scaleIn(),
    ]);
  };

  const smoothTransition = (callback?: () => void) => {
    return Animated.sequence([
      fadeOut(ANIMATION.duration.fast),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: ANIMATION.duration.fast,
        useNativeDriver: true,
      })
    ]).start(callback);
  };

  return {
    fadeAnim,
    slideAnim,
    scaleAnim,
    fadeIn,
    fadeOut,
    slideIn,
    scaleIn,
    staggeredEntrance,
    smoothTransition,
  };
};

export const useStaggeredAnimation = (count: number) => {
  const animations = useRef(
    Array.from({ length: count }, () => new Animated.Value(0))
  ).current;

  const startStaggered = (delay = 100) => {
    const animationSequence = animations.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: ANIMATION.duration.normal,
        delay: index * delay,
        useNativeDriver: true,
      })
    );

    Animated.parallel(animationSequence).start();
  };

  const resetAnimations = () => {
    animations.forEach(anim => anim.setValue(0));
  };

  return {
    animations,
    startStaggered,
    resetAnimations,
  };
};