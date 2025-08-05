import React, { createContext, useContext, ReactNode } from 'react';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, ANIMATION } from '../constants';

type ThemeContextType = {
  colors: typeof COLORS;
  spacing: typeof SPACING;
  fontSizes: typeof FONT_SIZES;
  fontWeights: typeof FONT_WEIGHTS;
  borderRadius: typeof BORDER_RADIUS;
  animation: typeof ANIMATION;
};

const ThemeContext = createContext<ThemeContextType>({
  colors: COLORS,
  spacing: SPACING,
  fontSizes: FONT_SIZES,
  fontWeights: FONT_WEIGHTS,
  borderRadius: BORDER_RADIUS,
  animation: ANIMATION,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = {
    colors: COLORS,
    spacing: SPACING,
    fontSizes: FONT_SIZES,
    fontWeights: FONT_WEIGHTS,
    borderRadius: BORDER_RADIUS,
    animation: ANIMATION,
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);