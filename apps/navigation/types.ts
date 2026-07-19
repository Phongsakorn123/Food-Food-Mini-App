import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  HomeTab: undefined;
  OrdersTab: undefined;
};

export type RootStackParamList = {
  Entry: undefined;
  Auth: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Cart:
    | {
        orderId?: string;
      }
    | undefined;
  CartSuccess: {
    orderId: string;
  };
  ProductDetail: {
    foodId: string;
  };
};