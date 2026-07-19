import { useState } from 'react';

import { HOME_CATEGORIES, type HomeCategory } from '../constants';
import { addToCart as addToCartAction, selectCartCount } from '../store';
import { FOOD_ITEMS } from '../mocks/foods';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export function useHomeViewModel() {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HomeCategory>('All');
  const cartCount = useAppSelector(selectCartCount);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredFoods = FOOD_ITEMS.filter(food => {
    const matchesCategory =
      selectedCategory === 'All' || food.category === selectedCategory;
    const matchesSearch =
      normalizedQuery.length === 0 ||
      food.name.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });

  const addToCart = (foodId: string) => {
    dispatch(addToCartAction({ foodId, quantity: 1 }));
  };

  return {
    addToCart,
    cartCount,
    categories: HOME_CATEGORIES,
    filteredFoods,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
  };
}