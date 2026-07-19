import { DefaultTheme, type Theme } from '@react-navigation/native';
import { navigationPalette } from './styles';

export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: navigationPalette.background,
    card: navigationPalette.surface,
    text: navigationPalette.text,
    border: navigationPalette.border,
    primary: navigationPalette.primary,
    notification: navigationPalette.notification,
  },
};