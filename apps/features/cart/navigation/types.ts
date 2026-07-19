import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../navigation/types';
import { CartRouteName, CartTabRouteName } from '../router';

export type CartModuleNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type OrderListModuleNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type CartModuleRouteProp = RouteProp<
  RootStackParamList,
  CartRouteName.Cart
>;

export type CartSuccessRouteProp = RouteProp<
  RootStackParamList,
  CartRouteName.CartSuccess
>;

export function resetToCartSuccess(
  navigation: CartModuleNavigationProp,
  orderId: string,
) {
  navigation.reset({
    index: 1,
    routes: [
      {
        name: CartRouteName.MainTabs,
        params: { screen: CartTabRouteName.HomeTab },
      },
      { name: CartRouteName.CartSuccess, params: { orderId } },
    ],
  });
}

export function resetToHomeTab(navigation: CartModuleNavigationProp) {
  navigation.reset({
    index: 0,
    routes: [
      {
        name: CartRouteName.MainTabs,
        params: { screen: CartTabRouteName.HomeTab },
      },
    ],
  });
}