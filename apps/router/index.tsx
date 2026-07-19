import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthModule } from '../features/auth/screens';
import { CartModule } from '../features/cart/screens/cart-screen';
import { CartSuccessScreen } from '../features/cart/screens/success-screen';
import { ProductDetailModule } from '../features/product-detail/screens';
import { rootStackScreenOptions } from '../navigation/styles';
import type { RootStackParamList } from '../navigation/types';
import { EntryScreen } from './entry-screen';
import { MainTabsNavigator } from './main-tabs-navigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRouter() {
  return (
    <Stack.Navigator initialRouteName="Entry" screenOptions={rootStackScreenOptions}>
      <Stack.Screen name="Entry" component={EntryScreen} />
      <Stack.Screen name="Auth" component={AuthModule} />
      <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
      <Stack.Screen name="Cart" component={CartModule} />
      <Stack.Screen name="CartSuccess" component={CartSuccessScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailModule} />
    </Stack.Navigator>
  );
}