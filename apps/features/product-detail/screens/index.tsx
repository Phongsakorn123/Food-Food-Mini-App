import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloatingCartButton } from '../../cart/components/screen/floatingButton';
import { useProductDetailViewModel } from '../viewmodels/useProductDetailViewModel';
import { styles } from './style';

export function ProductDetailModule() {
  const {
    addToCartText,
    backToHomeText,
    decreaseQuantity,
    decreaseText,
    food,
    handleAddToCartAndBack,
    handleGoBack,
    increaseQuantity,
    increaseText,
    isNotFound,
    quantityLabelText,
    quantity,
    totalPrefixText,
    totalPrice,
  } = useProductDetailViewModel();

  if (isNotFound || !food) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenContainer}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Pressable
            onPress={handleGoBack}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>{backToHomeText}</Text>
          </Pressable>

          <Image source={{ uri: food.imageUrl }} style={styles.image} />

          <View style={styles.card}>
            <Text style={styles.category}>{food.category}</Text>
            <Text style={styles.title}>{food.name}</Text>
            <Text style={styles.description}>{food.description}</Text>
            <Text style={styles.price}>฿{food.price}</Text>

            <View style={styles.quantityCard}>
              <Text style={styles.quantityLabel}>{quantityLabelText}</Text>
              <View style={styles.quantityRow}>
                <Pressable
                  onPress={decreaseQuantity}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>{decreaseText}</Text>
                </Pressable>
                <Text style={styles.quantityValue}>
                  {quantity}
                </Text>
                <Pressable
                  onPress={increaseQuantity}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>{increaseText}</Text>
                </Pressable>
              </View>
              <Text style={styles.totalPrice}>
                {totalPrefixText} ฿{totalPrice}
              </Text>
            </View>

            <Pressable
              onPress={handleAddToCartAndBack}
              style={styles.addButton}>
              <Text style={styles.addButtonText}>{addToCartText}</Text>
            </Pressable>
          </View>
        </ScrollView>

        <FloatingCartButton />
      </View>
    </SafeAreaView>
  );
}