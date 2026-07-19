import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackParamList } from '../../../../navigation/types';
import { placeOrder, selectOrderHistory } from '../../../home/store';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useCartViewModel } from '../../viewmodels/useCartViewModel';
import { styles } from './style';

function createOrderId(orderNumber: number) {
  return `Order-${orderNumber}`;
}

export function CartModule() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Cart'>>();
  const dispatch = useAppDispatch();
  const orderHistory = useAppSelector(selectOrderHistory);
  const nextOrderNumber = orderHistory.length + 1;
  const selectedOrderId = route.params?.orderId;
  const isOrderDetailMode = Boolean(selectedOrderId);
  const { decreaseItem, grandTotal, increaseItem, items, removeItem } =
    useCartViewModel(selectedOrderId);
  const subtotal = grandTotal;
  const deliveryFee = subtotal > 0 ? 30 : 0;
  const grandTotalWithFee = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          testID="cart-back-button">
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        <Text style={styles.title}>{isOrderDetailMode ? 'Order Cart' : 'Cart'}</Text>
        <Text style={styles.subtitle}>
          {isOrderDetailMode
            ? 'รายละเอียดรายการที่เคยสั่งสำเร็จ'
            : 'Review all selected items and adjust quantities in real time.'}
        </Text>

        {isOrderDetailMode && selectedOrderId ? (
          <View>
            <Text style={styles.orderIdLabel}>หมายเลขคำสั่งซื้อ</Text>
            <Text style={styles.orderIdValue} testID="cart-order-id-value">
              {selectedOrderId}
            </Text>
          </View>
        ) : null}

        {items.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText} testID="cart-empty-text">
              Your cart is empty.
            </Text>
          </View>
        ) : (
          items.map((item, index) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.itemHeaderRight}>
                  <Text style={styles.itemPrice}>฿{item.price}</Text>
                  <Pressable
                    onPress={() => removeItem(item.id)}
                    style={styles.removeButton}
                    disabled={isOrderDetailMode}
                    testID={
                      index === 0 ? 'cart-remove-first' : `cart-remove-${item.id}`
                    }>
                    <Text style={styles.removeButtonText}>🗑️</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.quantityRow}>
                <View style={styles.quantityControls}>
                  <Pressable
                    onPress={() => decreaseItem(item.id)}
                    style={styles.quantityButton}
                    disabled={isOrderDetailMode}
                    testID={
                      index === 0
                        ? 'cart-decrease-first'
                        : `cart-decrease-${item.id}`
                    }>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </Pressable>
                  <Text
                    style={styles.quantityValue}
                    testID={
                      index === 0 ? 'cart-quantity-first' : `cart-quantity-${item.id}`
                    }>
                    {item.quantity}
                  </Text>
                  <Pressable
                    onPress={() => increaseItem(item.id)}
                    style={styles.quantityButton}
                    disabled={isOrderDetailMode}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>
                <Text style={styles.totalPrice}>฿{item.totalPrice}</Text>
              </View>
            </View>
          ))
        )}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>฿{subtotal}</Text>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>฿{deliveryFee}</Text>
          <Text style={styles.summaryLabel}>Grand Total</Text>
          <Text style={styles.summaryValue} testID="cart-grand-total">
            ฿{grandTotalWithFee}
          </Text>
        </View>

        {!isOrderDetailMode ? (
          <Pressable
            onPress={() => {
              const orderId = createOrderId(nextOrderNumber);

              dispatch(placeOrder({ orderId }));
              navigation.reset({
                index: 1,
                routes: [
                  { name: 'MainTabs', params: { screen: 'HomeTab' } },
                  { name: 'CartSuccess', params: { orderId } },
                ],
              });
            }}
            style={styles.checkoutButton}
            testID="cart-success-button">
            <Text style={styles.checkoutButtonText}>สั่งซื้อ</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}