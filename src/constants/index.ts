// Production-level constants and configurations

export const COLORS = {
  primary: '#ff8c00',
  primaryLight: '#FFF4E6',
  primaryDark: '#e67e00',
  primaryBackground: '#fff3e0',
  
  background: '#f8f9fa',
  surface: '#ffffff',
  
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    light: '#999999',
    white: '#ffffff',
  },
  
  border: {
    light: '#fff2e6',
    medium: '#E5E7EB',
    dark: '#f0f0f0',
  },
  
  status: {
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  },
  
  shadow: {
    primary: '#ff8c00',
    dark: '#000000',
  }
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const FONT_SIZES = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  title: 32,
} as const;

export const FONT_WEIGHTS = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 50,
} as const;

export const ANIMATION = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  }
} as const;

export const SKILLS = [
  'Cleaning',
  'Plumbing', 
  'Electrical',
  'Painting',
  'Gardening',
  'Carpentry'
] as const;

export const SPECIALTIES = {
  Cleaning: ['Deep Cleaning', 'Regular Cleaning', 'Office Cleaning', 'Window Cleaning'],
  Plumbing: ['Pipe Repair', 'Drain Cleaning', 'Fixture Installation', 'Emergency Plumbing'],
  Electrical: ['Wiring', 'Light Installation', 'Circuit Repair', 'Panel Upgrade'],
  Painting: ['Interior Painting', 'Exterior Painting', 'Wall Preparation', 'Color Consultation'],
  Gardening: ['Lawn Care', 'Tree Trimming', 'Garden Design', 'Pest Control'],
  Carpentry: ['Furniture Repair', 'Custom Cabinets', 'Flooring', 'Door Installation']
} as const;

export const CITIES = [
  'Berlin, DE',
  'Munich, DE', 
  'Hamburg, DE',
  'Frankfurt, DE',
  'Cologne, DE',
  'Stuttgart, DE'
] as const;