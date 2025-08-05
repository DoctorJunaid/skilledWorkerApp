// Global type definitions for production-level app

export type TabType = 'home' | 'search' | 'messages' | 'settings';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  verified: boolean;
  createdAt: string;
}

export interface Worker {
  id: string;
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  avatarText: string;
  verified: boolean;
  available: boolean;
  hourlyRate: number;
  category: string;
  location: {
    lat: number;
    lng: number;
  };
  distance: string;
  skills: string[];
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
  backgroundColor: string;
}

export interface SearchQuery {
  skill: string;
  specialty: string;
  city: string;
  minRate?: number;
  maxRate?: number;
}

export interface NavigationProps {
  onNavigateToHome?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToMessages?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToProfile?: () => void;
  onBack?: () => void;
  onSignOut?: () => void;
}

export interface AlertConfig {
  title: string;
  message: string;
  type: 'default' | 'success' | 'error' | 'warning';
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface SpecialtyMap {
  [key: string]: string[];
}