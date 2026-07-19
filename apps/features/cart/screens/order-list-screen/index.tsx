import React from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { orderListViewModel } from '../../viewmodels/orderListViewModel';
import { styles } from './style';

export function OrderListModule() {
  const {
    emptyText,
    handleOpenOrder,
    orderCards,
    orderIdLabel,
    subtitle,
    title,
    totalItemsPrefix,
    totalItemsSuffix,
    totalPricePrefix,
  } = orderListViewModel();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {orderCards.length === 0 ? (
          <Pressable style={styles.emptyCard} testID="orders-empty-state">
            <Text style={styles.emptyText}>{emptyText}</Text>
          </Pressable>
        ) : (
          orderCards.map(order => (
            <Pressable
              key={order.id}
              onPress={() => handleOpenOrder(order.id)}
              style={styles.orderCard}
              testID={`order-item-${order.id}`}>
              <Text style={styles.orderTitle}>{orderIdLabel}</Text>
              <Text style={styles.orderIdValue} testID={`order-id-${order.id}`}>
                {order.id}
              </Text>
              <Text style={styles.orderMeta}>{`${totalItemsPrefix} ${order.totalItems} ${totalItemsSuffix}`.trim()}</Text>
              <Text style={styles.orderMeta}>{`${totalPricePrefix} ฿${order.totalPrice}`}</Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}