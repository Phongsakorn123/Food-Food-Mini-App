import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f3ea',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f7f3ea',
  },
  card: {
    position: 'relative',
    borderRadius: 24,
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
  cardTopRow: {
		alignItems: 'flex-end',
		marginBottom: 12,
	},
  eyebrow: {
    marginBottom: 8,
    color: '#9a3412',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  title: {
    color: '#1c1917',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    color: '#57534e',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  form: {
    gap: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e7dbc8',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#1c1917',
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 8,
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 16,
    backgroundColor: '#d97706',
  },
  buttonText: {
    color: '#fffdf8',
    fontSize: 16,
    fontWeight: '700',
  },
  tokenCard: {
    marginTop: 18,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#fff3c4',
  },
  tokenLabel: {
    marginBottom: 6,
    color: '#92400e',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  tokenValue: {
    color: '#431407',
    fontSize: 14,
    lineHeight: 20,
  },
});