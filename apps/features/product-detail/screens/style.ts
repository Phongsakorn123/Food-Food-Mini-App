import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f4ea',
  },
  screenContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 18,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  backButtonText: {
    color: '#7c2d12',
    fontSize: 14,
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 28,
    backgroundColor: '#ead7c4',
    marginBottom: 20,
  },
  card: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: '#fffdf8',
    shadowColor: '#2f241f',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 4,
  },
  category: {
    marginBottom: 8,
    color: '#9a3412',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: '#1c1917',
    fontSize: 30,
    fontWeight: '800',
  },
  description: {
    marginTop: 12,
    color: '#57534e',
    fontSize: 15,
    lineHeight: 24,
  },
  price: {
    marginTop: 20,
    color: '#7c2d12',
    fontSize: 24,
    fontWeight: '800',
  },
  quantityCard: {
    marginTop: 24,
    borderRadius: 20,
    padding: 18,
    backgroundColor: '#f6efe3',
  },
  quantityLabel: {
    color: '#6b3e1d',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  quantityRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  quantityButtonText: {
    color: '#7c2d12',
    fontSize: 22,
    fontWeight: '700',
  },
  quantityValue: {
    color: '#1c1917',
    fontSize: 24,
    fontWeight: '800',
  },
  totalPrice: {
    marginTop: 18,
    color: '#1c1917',
    fontSize: 16,
    fontWeight: '700',
  },
  addButton: {
    marginTop: 24,
    alignItems: 'center',
    borderRadius: 18,
    paddingVertical: 16,
    backgroundColor: '#d97706',
  },
  addButtonText: {
    color: '#fffdf8',
    fontSize: 16,
    fontWeight: '800',
  },
});