import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 999,
		paddingHorizontal: 4,
		paddingVertical: 4,
		backgroundColor: '#f8efe2',
		borderWidth: 1,
		borderColor: '#ead7bb',
	},
	buttonText: {
		minWidth: 34,
		textAlign: 'center',
		borderRadius: 999,
		paddingHorizontal: 8,
		paddingVertical: 4,
		color: '#92400e',
		fontSize: 12,
		fontWeight: '700',
		letterSpacing: 0.6,
	},
	buttonTextActive: {
		backgroundColor: '#d97706',
		color: '#fffdf8',
	},
});