import React from 'react';
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

import { FloatingCartButton } from '../../cart/components/FloatingButton';
import { styles } from './styles';
import { useHomeViewModel } from '../viewmodels/useHomeViewModel';

export function HomeModule() {
  const {
    addToCart,
    addToCartButton,
    cartCount,
    categories,
    clearButton,
    clearSearchQuery,
    emptyText,
    filteredFoods,
    itemsSuffix,
    navigateToProductDetail,
    sectionTitle,
    searchPlaceholder,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
  } = useHomeViewModel();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <TextInput
            onChangeText={setSearchQuery}
            placeholder={searchPlaceholder}
            placeholderTextColor="#6b7280"
            style={styles.searchInput}
            testID="home-search-input"
            value={searchQuery}
          />
          {searchQuery.length > 0 ? (
            <Pressable
              accessibilityRole="button"
              onPress={clearSearchQuery}
              style={styles.clearSearchButton}
              testID="home-clear-search-button">
              <Text style={styles.clearSearchButtonText}>{clearButton}</Text>
            </Pressable>
          ) : null}
        </View>

        <ScrollView
          contentContainerStyle={styles.categoryRow}
          horizontal
          style={styles.categoryScroll}
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

        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={filteredFoods}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          ListEmptyComponent={
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText} testID="home-empty-text">
                {emptyText}
              </Text>
            </View>
          }
          ListHeaderComponent={
            <View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                <Text style={styles.sectionMeta} testID="results-count">
                  {filteredFoods.length} {itemsSuffix}
                </Text>
              </View>
            </View>
          }
          renderItem={({ item, index }) => (
            <View style={styles.foodCard}>
              <Pressable
                onPress={() => navigateToProductDetail(item.id)}
                testID={index === 0 ? 'home-food-card-first' : `home-food-card-${item.id}`}>
                <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodPrice}>฿{item.price}</Text>
              </Pressable>
              <Pressable
                onPress={() => addToCart(item.id)}
                style={styles.addButton}
                testID={index === 0 ? 'add-to-cart-first' : `add-to-cart-${item.id}`}>
                <Text style={styles.addButtonText}>{addToCartButton}</Text>
              </Pressable>
            </View>
          )}
        />
        <FloatingCartButton />
      </View>
    </SafeAreaView>
  );
}