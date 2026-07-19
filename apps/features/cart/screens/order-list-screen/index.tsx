import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FOOD_ITEMS } from '../../../home/mocks/foods';
import { selectOrderHistory } from '../../../home/store';
import type { RootStackParamList } from '../../../../navigation/types';
import { useAppSelector } from '../../../../store/hooks';
import { styles } from './style';

type AppNavigation = NativeStackNavigationProp<RootStackParamList>;

export function OrderListModule() {
  const navigation = useNavigation<AppNavigation>();
  const orders = useAppSelector(selectOrderHistory);

  const orderCards = useMemo(
    () =>
      orders.map(order => {
        const totalItems = Object.values(order.items).reduce(
          (sum, quantity) => sum + quantity,
          0,
        );
        const totalPrice = Object.entries(order.items).reduce(
          (sum, [foodId, quantity]) => {
            const food = FOOD_ITEMS.find(item => item.id === foodId);

            return sum + (food ? food.price * quantity : 0);
          },
          0,
        );

        return {
          id: order.id,
          totalItems,
          totalPrice,
        };
      }),
    [orders],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Order List</Text>
        <Text style={styles.subtitle}>รายการที่เคยสั่งสำเร็จทั้งหมด</Text>

        {orderCards.length === 0 ? (
          <Pressable style={styles.emptyCard} testID="orders-empty-state">
            <Text style={styles.emptyText}>ยังไม่มีรายการสั่งซื้อสำเร็จ</Text>
          </Pressable>
        ) : (
          orderCards.map(order => (
            <Pressable
              key={order.id}
              onPress={() => navigation.navigate('Cart', { orderId: order.id })}
              style={styles.orderCard}
              testID={`order-item-${order.id}`}>
              <Text style={styles.orderTitle}>หมายเลขคำสั่งซื้อ</Text>
              <Text style={styles.orderIdValue} testID={`order-id-${order.id}`}>
                {order.id}
              </Text>
              <Text style={styles.orderMeta}>{`จำนวน ${order.totalItems} ชิ้น`}</Text>
              <Text style={styles.orderMeta}>{`ราคารวม ฿${order.totalPrice}`}</Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}