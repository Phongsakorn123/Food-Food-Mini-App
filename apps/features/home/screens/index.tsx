import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FloatingCartButton } from '../../cart/components';
import { styles } from './style';
import { useHomeViewModel } from '../viewmodels/useHomeViewModel';
import type { RootStackParamList } from '../../../navigation/types';

export function HomeModule() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    addToCart,
    cartCount,
    categories,
    filteredFoods,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
  } = useHomeViewModel();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={filteredFoods}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          ListHeaderComponent={
            <View>
              <View style={styles.heroCard}>
                <View>
                  <Text style={styles.eyebrow}>Home Screen</Text>
                  <Text style={styles.title}>Discover today&apos;s menu</Text>
                  <Text style={styles.subtitle}>
                    Search, filter by category, and add your favorite dishes to cart.
                  </Text>
                </View>
                <View style={styles.cartBadge}>
                  <Text style={styles.cartLabel}>Cart</Text>
                  <Text style={styles.cartValue} testID="cart-count">
                    {cartCount}
                  </Text>
                </View>
              </View>

              <TextInput
                onChangeText={setSearchQuery}
                placeholder="Search food"
                placeholderTextColor="#6b7280"
                style={styles.searchInput}
                testID="home-search-input"
                value={searchQuery}
              />

              <ScrollView
                contentContainerStyle={styles.categoryRow}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {categories.map(category => {
                  const isSelected = category === selectedCategory;

                  return (
                    <Pressable
                      key={category}
                      onPress={() => setSelectedCategory(category)}
                      style={[
                        styles.categoryChip,
                        isSelected ? styles.categoryChipActive : null,
                      ]}
                      testID={`category-${category}`}>
                      <Text
                        style={[
                          styles.categoryText,
                          isSelected ? styles.categoryTextActive : null,
                        ]}>
                        {category}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Dishes</Text>
                <Text style={styles.sectionMeta} testID="results-count">
                  {filteredFoods.length} items
                </Text>
              </View>
            </View>
          }
          renderItem={({ item, index }) => (
            <View style={styles.foodCard}>
              <Pressable
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    foodId: item.id,
                  })
                }
                testID={index === 0 ? 'home-food-card-first' : `home-food-card-${item.id}`}>
                <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodPrice}>฿{item.price}</Text>
              </Pressable>
              <Pressable
                onPress={() => addToCart(item.id)}
                style={styles.addButton}
                testID={index === 0 ? 'add-to-cart-first' : `add-to-cart-${item.id}`}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </Pressable>
            </View>
          )}
        />
        <FloatingCartButton />
      </View>
    </SafeAreaView>
  );
}