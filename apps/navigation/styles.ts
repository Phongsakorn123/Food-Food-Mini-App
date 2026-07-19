import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';

export const navigationPalette = {
  background: '#eef4ea',
  surface: '#ffffff',
  text: '#162317',
  border: '#d6e2cf',
  primary: '#14532d',
  inactive: '#6b7280',
  notification: '#d97706',
} as const;

const styles = StyleSheet.create({
  tabBar: {
    height: 66,
    paddingTop: 6,
    paddingBottom: 8,
  },
  tabBarIcon: {
    fontSize: 18,
  },
});

export const rootStackScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
};

export const mainTabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarActiveTintColor: navigationPalette.primary,
  tabBarInactiveTintColor: navigationPalette.inactive,
  tabBarStyle: styles.tabBar,
};

export function getTabBarIconStyle(color: string): StyleProp<TextStyle> {
  return [styles.tabBarIcon, { color }];
}