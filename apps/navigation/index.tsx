import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppRouter } from '../router';
import { navigationTheme } from './theme';

export function MainNavigator() {
	return (
		<NavigationContainer theme={navigationTheme}>
			<AppRouter />
		</NavigationContainer>
	);
}
