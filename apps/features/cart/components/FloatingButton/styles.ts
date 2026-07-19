import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f2937',
    shadowColor: '#111827',
    shadowOpacity: 0.24,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 8,
    zIndex: 20,
  },
  buttonText: {
    color: '#fffdf8',
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -2,
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    backgroundColor: '#dc2626',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
});