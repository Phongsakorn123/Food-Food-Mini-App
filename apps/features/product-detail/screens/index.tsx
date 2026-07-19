import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { FloatingCartButton } from '../../cart/components';
import type { RootStackParamList } from '../../../navigation/types';
import { findMockFoodById } from '../mocks';
import { useProductDetailViewModel } from '../viewmodels/useProductDetailViewModel';
import { styles } from './style';

type ProductDetailModuleProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

export function ProductDetailModule({ navigation, route }: ProductDetailModuleProps) {
  const food = findMockFoodById(route.params.foodId);

  if (!food) {
    return null;
  }

  const { decreaseQuantity, handleAddToCart, increaseQuantity, quantity, totalPrice } =
    useProductDetailViewModel(food);

  const handleAddToCartAndBack = () => {
    handleAddToCart();
    Toast.show({
      type: 'success',
      text1: 'Add to cart success',
      position: 'top',
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            testID="detail-back-button">
            <Text style={styles.backButtonText}>Back to Home</Text>
          </Pressable>

          <Image source={{ uri: food.imageUrl }} style={styles.image} />

          <View style={styles.card}>
            <Text style={styles.category}>{food.category}</Text>
            <Text style={styles.title} testID="detail-title">{food.name}</Text>
            <Text style={styles.description}>{food.description}</Text>
            <Text style={styles.price}>฿{food.price}</Text>

            <View style={styles.quantityCard}>
              <Text style={styles.quantityLabel}>Quantity</Text>
              <View style={styles.quantityRow}>
                <Pressable
                  onPress={decreaseQuantity}
                  style={styles.quantityButton}
                  testID="detail-decrease-button">
                  <Text style={styles.quantityButtonText}>-</Text>
                </Pressable>
                <Text style={styles.quantityValue} testID="detail-quantity-value">
                  {quantity}
                </Text>
                <Pressable
                  onPress={increaseQuantity}
                  style={styles.quantityButton}
                  testID="detail-increase-button">
                  <Text style={styles.quantityButtonText}>+</Text>
                </Pressable>
              </View>
              <Text style={styles.totalPrice} testID="detail-total-price">
                Total: ฿{totalPrice}
              </Text>
            </View>

            <Pressable
              onPress={handleAddToCartAndBack}
              style={styles.addButton}
              testID="detail-add-to-cart-button">
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </Pressable>
          </View>
        </ScrollView>

        <FloatingCartButton />
      </View>
    </SafeAreaView>
  );
}