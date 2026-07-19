import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { OrderListModule } from '../features/cart/screens/order-list-screen';
import { HomeModule } from '../features/home/screens';
import {
  getTabBarIconStyle,
  mainTabScreenOptions,
} from '../navigation/styles';
import type { MainTabParamList } from '../navigation/types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabsNavigator() {
  return (
    <Tab.Navigator initialRouteName="HomeTab" screenOptions={mainTabScreenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeModule}
        options={{
          tabBarLabel: 'Home',
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={getTabBarIconStyle(color)}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrderListModule}
        options={{
          tabBarLabel: 'รายการที่สั่ง',
          title: 'รายการที่สั่ง',
          tabBarIcon: ({ color }) => <Text style={getTabBarIconStyle(color)}>🛒</Text>,
        }}
      />
    </Tab.Navigator>
  );
}