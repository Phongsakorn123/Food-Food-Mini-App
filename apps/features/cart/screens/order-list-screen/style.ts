import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6ef',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  title: {
    color: '#162317',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    color: '#576759',
    fontSize: 15,
    lineHeight: 22,
  },
  emptyCard: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  emptyText: {
    color: '#4b5f4d',
    fontSize: 16,
    lineHeight: 24,
  },
  orderCard: {
    marginBottom: 14,
    borderRadius: 24,
    padding: 18,
    backgroundColor: '#ffffff',
  },
  orderTitle: {
    color: '#162317',
    fontSize: 14,
    fontWeight: '700',
  },
  orderIdValue: {
    marginTop: 4,
    color: '#162317',
    fontSize: 18,
    fontWeight: '800',
  },
  orderMeta: {
    marginTop: 8,
    color: '#4b5f4d',
    fontSize: 14,
    lineHeight: 20,
  },
});