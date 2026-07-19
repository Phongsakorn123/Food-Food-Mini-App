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
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 18,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  backButtonText: {
    color: '#355e3b',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    color: '#162317',
    fontSize: 30,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 12,
    color: '#576759',
    fontSize: 15,
    lineHeight: 22,
  },
  orderIdLabel: {
    color: '#4b5f4d',
    fontSize: 13,
    fontWeight: '700',
  },
  orderIdValue: {
    marginTop: 4,
    marginBottom: 20,
    color: '#162317',
    fontSize: 18,
    fontWeight: '800',
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
  itemCard: {
    marginBottom: 14,
    borderRadius: 24,
    padding: 18,
    backgroundColor: '#ffffff',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemName: {
    flex: 1,
    marginRight: 12,
    color: '#162317',
    fontSize: 18,
    fontWeight: '700',
  },
  itemPrice: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
  },
  removeButtonText: {
    color: '#b91c1c',
    fontSize: 18,
  },
  quantityRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#edf3e9',
  },
  quantityButtonText: {
    color: '#27412b',
    fontSize: 20,
    fontWeight: '800',
  },
  quantityValue: {
    color: '#162317',
    fontSize: 18,
    fontWeight: '800',
  },
  totalPrice: {
    color: '#92400e',
    fontSize: 16,
    fontWeight: '700',
  },
  summaryCard: {
    marginTop: 10,
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#d9f99d',
  },
  summaryLabel: {
    color: '#365314',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  summaryValue: {
    marginTop: 8,
    color: '#1a2e05',
    fontSize: 26,
    fontWeight: '800',
  },
  checkoutButton: {
    marginTop: 18,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#16a34a',
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});