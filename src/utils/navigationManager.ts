// Centralized navigation management for production app
import { Animated } from 'react-native';
import { ANIMATION } from '../constants';

export type ScreenType = 
  | 'loading'
  | 'welcome' 
  | 'option'
  | 'auth'
  | 'home'
  | 'search'
  | 'messages'
  | 'settings'
  | 'profile'
  | 'searchResults'
  | 'workerProfile';

export class NavigationManager {
  private animations: Map<ScreenType, Animated.Value> = new Map();
  private currentScreen: ScreenType = 'loading';
  private onScreenChange?: (screen: ScreenType) => void;

  constructor(onScreenChange?: (screen: ScreenType) => void) {
    this.onScreenChange = onScreenChange;
    this.initializeAnimations();
  }

  private initializeAnimations() {
    const screens: ScreenType[] = [
      'loading', 'welcome', 'option', 'auth', 'home', 
      'search', 'messages', 'settings', 'profile', 
      'searchResults', 'workerProfile'
    ];

    screens.forEach(screen => {
      this.animations.set(screen, new Animated.Value(0));
    });
  }

  public getAnimation(screen: ScreenType): Animated.Value {
    return this.animations.get(screen) || new Animated.Value(0);
  }

  public getCurrentScreen(): ScreenType {
    return this.currentScreen;
  }

  public navigateTo(
    targetScreen: ScreenType, 
    callback?: () => void,
    skipAnimation = false
  ): Promise<void> {
    return new Promise((resolve) => {
      if (skipAnimation) {
        this.setCurrentScreen(targetScreen);
        this.getAnimation(targetScreen).setValue(1);
        callback?.();
        resolve();
        return;
      }

      // Fade out current screen
      const currentAnim = this.getAnimation(this.currentScreen);
      const targetAnim = this.getAnimation(targetScreen);

      Animated.timing(currentAnim, {
        toValue: 0,
        duration: ANIMATION.duration.fast,
        useNativeDriver: true,
      }).start(() => {
        // Update current screen
        this.setCurrentScreen(targetScreen);
        
        // Execute callback
        callback?.();

        // Fade in target screen
        Animated.timing(targetAnim, {
          toValue: 1,
          duration: ANIMATION.duration.normal,
          useNativeDriver: true,
        }).start(() => {
          resolve();
        });
      });
    });
  }

  public quickTransition(targetScreen: ScreenType, callback?: () => void): Promise<void> {
    return this.navigateTo(targetScreen, callback, false);
  }

  public instantTransition(targetScreen: ScreenType, callback?: () => void): void {
    this.navigateTo(targetScreen, callback, true);
  }

  private setCurrentScreen(screen: ScreenType) {
    this.currentScreen = screen;
    this.onScreenChange?.(screen);
  }

  public resetAllAnimations() {
    this.animations.forEach(anim => anim.setValue(0));
  }

  public preloadScreen(screen: ScreenType) {
    // Preload screen animation for faster transitions
    this.getAnimation(screen).setValue(0);
  }
}

// Singleton instance for global use
export const navigationManager = new NavigationManager();