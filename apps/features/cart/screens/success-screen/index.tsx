import React, { useEffect, useRef } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackHandler, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackParamList } from '../../../../navigation/types';
import { styles } from './style';

type CartSuccessScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CartSuccess'
>;

export function CartSuccessScreen({ navigation, route }: CartSuccessScreenProps) {
  const isGoingHomeRef = useRef(false);

  const goHome = () => {
    if (isGoingHomeRef.current) {
      return;
    }

    isGoingHomeRef.current = true;
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs', params: { screen: 'HomeTab' } }],
    });
  };

  useEffect(() => {
    const unsubscribeBeforeRemove = navigation.addListener('beforeRemove', event => {
      if (isGoingHomeRef.current || event.data.action.type === 'RESET') {
        return;
      }

      event.preventDefault();
      goHome();
    });

    const backSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        goHome();

        return true;
      },
    );

    return () => {
      unsubscribeBeforeRemove();
      backSubscription.remove();
      isGoingHomeRef.current = false;
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.icon}>✅</Text>
          <Text style={styles.title} testID="cart-success-title">
            Order Success
          </Text>
          <Text style={styles.subtitle}>
            Your order has been confirmed. Thank you for ordering with FoodFood.
          </Text>
          <View style={styles.orderIdBox}>
            <Text style={styles.orderIdLabel}>Mock Order ID</Text>
            <Text style={styles.orderIdValue} testID="cart-success-order-id">
              {route.params.orderId}
            </Text>
          </View>
          <Pressable
            onPress={goHome}
            style={styles.doneButton}
            testID="cart-success-back-home-button">
            <Text style={styles.doneButtonText}>กลับไปหน้าหลัก</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}