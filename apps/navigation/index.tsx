import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthModule } from '../features/auth/screens';
import { CartModule } from '../features/cart/screens/cart-screen';
import { OrderListModule } from '../features/cart/screens/order-list-screen';
import { CartSuccessScreen } from '../features/cart/screens/success-screen';
import { HomeModule } from '../features/home/screens';
import { ProductDetailModule } from '../features/product-detail/screens';
import { selectAccessToken } from '../features/auth/store';
import { useAppSelector } from '../store/hooks';
import type { MainTabParamList, RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

type EntryScreenProps = NativeStackScreenProps<RootStackParamList, 'Entry'>;

function EntryScreen({ navigation }: EntryScreenProps) {
	const accessToken = useAppSelector(selectAccessToken);

	useEffect(() => {
		navigation.reset({
			index: 0,
			routes: [
				accessToken
					? { name: 'MainTabs', params: { screen: 'HomeTab' } }
					: { name: 'Auth' },
			],
		});
	}, [accessToken, navigation]);

	return <View testID="entry-screen" />;
}


function MainTabsNavigator() {
	return (
		<Tab.Navigator
			initialRouteName="HomeTab"
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: '#14532d',
				tabBarInactiveTintColor: '#6b7280',
				tabBarStyle: {
					height: 66,
					paddingTop: 6,
					paddingBottom: 8,
				},
			}}>
			<Tab.Screen
				name="HomeTab"
				component={HomeModule}
				options={{
					tabBarLabel: 'Home',
					title: 'Home',
					tabBarIcon: ({ color }) => (
						<Text style={{ color, fontSize: 18 }}>🏠</Text>
					),
				}}
			/>
			<Tab.Screen
				name="OrdersTab"
				component={OrderListModule}
				options={{
					tabBarLabel: 'รายการที่สั่ง',
					title: 'รายการที่สั่ง',
					tabBarIcon: ({ color }) => (
						<Text style={{ color, fontSize: 18 }}>🧾</Text>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export function RootNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Entry"
				screenOptions={{
					animation: 'slide_from_right',
					headerShown: false,
				}}>
				<Stack.Screen name="Entry" component={EntryScreen} />
				<Stack.Screen name="Auth" component={AuthModule} />
				<Stack.Screen name="MainTabs" component={MainTabsNavigator} />
				<Stack.Screen name="Cart" component={CartModule} />
				<Stack.Screen name="CartSuccess" component={CartSuccessScreen} />
				<Stack.Screen name="ProductDetail" component={ProductDetailModule} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
