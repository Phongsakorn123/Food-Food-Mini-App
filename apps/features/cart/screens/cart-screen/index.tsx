import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cartViewModel } from '../../viewmodels/cartViewModel';
import { styles } from './styles';

export function CartModule() {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Pressable
          onPress={handleGoBack}
          style={styles.backButton}>
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
            <Text style={styles.orderIdValue}>
              {selectedOrderId}
            </Text>
          </View>
        ) : null}

        {items.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>
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
                    disabled={isOrderDetailMode}>
                    <Text style={styles.removeButtonText}>🗑️</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.quantityRow}>
                <View style={styles.quantityControls}>
                  <Pressable
                    onPress={() => decreaseItem(item.id)}
                    style={styles.quantityButton}
                    disabled={isOrderDetailMode}>
                    <Text style={styles.quantityButtonText}>{quantityDecrease}</Text>
                  </Pressable>
                  <Text
                    style={styles.quantityValue}>
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
          <Text style={styles.summaryValue}>
            ฿{grandTotalWithFee}
          </Text>
        </View>

        {!isOrderDetailMode ? (
          <Pressable
            onPress={handleCheckout}
            style={styles.checkoutButton}
            disabled={isCheckoutLoading}>
            <Text style={styles.checkoutButtonText}>
              {isCheckoutLoading ? `${checkoutButton}...` : checkoutButton}
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}