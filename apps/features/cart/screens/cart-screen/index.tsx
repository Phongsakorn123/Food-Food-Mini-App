import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cartViewModel } from '../../viewmodels/cartViewModel';
import { styles } from './styles';

export function CartModule() {
  const spinValue = useRef(new Animated.Value(0)).current;
  const {
    backButton,
    cartTitle,
    checkoutButton,
    decreaseItem,
    deliveryFeeLabel,
    deliveryFee,
    emptyText,
    grandTotalLabel,
    grandTotalWithFee,
    handleCheckout,
    handleGoBack,
    increaseItem,
    isCheckoutLoading,
    isOrderDetailMode,
    items,
    orderCartTitle,
    orderDetailSubtitle,
    orderIdLabel,
    quantityDecrease,
    quantityIncrease,
    reviewSubtitle,
    removeItem,
    selectedOrderId,
    subtotal,
    subtotalLabel,
  } =
    cartViewModel();

  useEffect(() => {
    if (!isCheckoutLoading) {
      spinValue.stopAnimation();
      spinValue.setValue(0);

      return;
    }

    const spinnerAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    spinnerAnimation.start();

    return () => {
      spinnerAnimation.stop();
    };
  }, [isCheckoutLoading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Pressable
          onPress={handleGoBack}
          style={styles.backButton}
          testID="cart-back-button">
          <Text style={styles.backButtonText}>{backButton}</Text>
        </Pressable>

        <Text style={styles.title}>{isOrderDetailMode ? orderCartTitle : cartTitle}</Text>
        <Text style={styles.subtitle}>
          {isOrderDetailMode
            ? orderDetailSubtitle
            : reviewSubtitle}
        </Text>

        {isOrderDetailMode && selectedOrderId ? (
          <View>
            <Text style={styles.orderIdLabel}>{orderIdLabel}</Text>
            <Text style={styles.orderIdValue} testID="cart-order-id-value">
              {selectedOrderId}
            </Text>
          </View>
        ) : null}

        {items.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText} testID="cart-empty-text">
              {emptyText}
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
                    <Text style={styles.quantityButtonText}>{quantityDecrease}</Text>
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
                    <Text style={styles.quantityButtonText}>{quantityIncrease}</Text>
                  </Pressable>
                </View>
                <Text style={styles.totalPrice}>฿{item.totalPrice}</Text>
              </View>
            </View>
          ))
        )}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>{subtotalLabel}</Text>
          <Text style={styles.summaryValue}>฿{subtotal}</Text>
          <Text style={styles.summaryLabel}>{deliveryFeeLabel}</Text>
          <Text style={styles.summaryValue}>฿{deliveryFee}</Text>
          <Text style={styles.summaryLabel}>{grandTotalLabel}</Text>
          <Text style={styles.summaryValue} testID="cart-grand-total">
            ฿{grandTotalWithFee}
          </Text>
        </View>

        {!isOrderDetailMode ? (
          <Pressable
            onPress={handleCheckout}
            style={styles.checkoutButton}
            disabled={isCheckoutLoading}
            testID="cart-success-button">
            <Text style={styles.checkoutButtonText}>
              {isCheckoutLoading ? `${checkoutButton}...` : checkoutButton}
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>

      {isCheckoutLoading ? (
        <View style={styles.loadingOverlay} testID="cart-checkout-loading-overlay">
          <Animated.View
            style={[
              styles.loadingSpinner,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          />
          <Text style={styles.loadingText}>{checkoutButton}...</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}