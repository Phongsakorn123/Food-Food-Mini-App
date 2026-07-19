import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cartSuccessViewModel } from '../../viewmodels/cartSuccessViewModel';
import { styles } from './style';
export function CartSuccessScreen() {
  const { backHomeButton, goHome, orderId, orderIdLabel, subtitle, title } =
    cartSuccessViewModel();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.icon}>✅</Text>
          <Text style={styles.title} testID="cart-success-title">
            {title}
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.orderIdBox}>
            <Text style={styles.orderIdLabel}>{orderIdLabel}</Text>
            <Text style={styles.orderIdValue} testID="cart-success-order-id">
              {orderId}
            </Text>
          </View>
          <Pressable
            onPress={goHome}
            style={styles.doneButton}
            testID="cart-success-back-home-button">
            <Text style={styles.doneButtonText}>{backHomeButton}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}