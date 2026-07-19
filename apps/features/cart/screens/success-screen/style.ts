import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef8ec',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    borderRadius: 26,
    padding: 26,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowColor: '#1f2937',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 4,
  },
  icon: {
    fontSize: 44,
    marginBottom: 14,
  },
  title: {
    color: '#14532d',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    color: '#4b5f4d',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  orderIdBox: {
    marginTop: 18,
    width: '100%',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  orderIdLabel: {
    color: '#4b5563',
    fontSize: 13,
    fontWeight: '600',
  },
  orderIdValue: {
    marginTop: 6,
    color: '#111827',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  doneButton: {
    marginTop: 22,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#16a34a',
  },
  doneButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});