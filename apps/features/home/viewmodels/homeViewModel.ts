import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { logout } from '../../auth/store';
import { useLanguage, type LanguageCode } from '../../auth/config/language';
import { en as homeEn } from '../assets/language/en';
import { th as homeTh } from '../assets/language/th';
import {
  resetToAuth,
  type HomeModuleNavigationProp,
} from '../navigation/types';
import { HomeRouteName } from '../router';
import { HOME_CATEGORIES, type HomeCategory } from '../constants';
import { addToCart as addToCartAction, selectCartCount } from '../store';
import { FOOD_ITEMS } from '../mocks/foods';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export function homeViewModel() {
  const navigation = useNavigation<HomeModuleNavigationProp>();
  const homeLanguageMap = useMemo<Record<LanguageCode, typeof homeEn>>(
    () => ({
      en: homeEn,
      th: homeTh,
    }),
    [],
  );
  const normalizedNameByFoodId = useMemo(
    () => new Map(FOOD_ITEMS.map(food => [food.id, food.name.toLowerCase()])),
    [],
  );
  const foodsByCategory = useMemo(
    () =>
      FOOD_ITEMS.reduce(
        (accumulator, food) => {
          if (!accumulator[food.category]) {
            accumulator[food.category] = [] as typeof FOOD_ITEMS;
          }

          accumulator[food.category].push(food);

          return accumulator;
        },
        {} as Record<string, typeof FOOD_ITEMS>,
      ),
    [],
  );
  const { languageCode } = useLanguage();
  const {
    view,
    clearButton,
    emptyText,
    itemsSuffix,
    logoutButton,
    searchPlaceholder,
    sectionTitle,
  } =
    homeLanguageMap[languageCode].home;
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HomeCategory>('All');
  const cartCount = useAppSelector(selectCartCount);

  const normalizedQuery = useMemo(
    () => searchQuery.trim().toLowerCase(),
    [searchQuery],
  );

  const candidateFoods =
    selectedCategory === 'All'
      ? FOOD_ITEMS
      : (foodsByCategory[selectedCategory] ?? []);

  const filteredFoods = useMemo(() => {
    if (normalizedQuery.length === 0) {
      return candidateFoods;
    }

    return candidateFoods.filter(food =>
      normalizedNameByFoodId.get(food.id)?.includes(normalizedQuery),
    );
  }, [candidateFoods, normalizedQuery]);

  const addToCart = (foodId: string) => {
    dispatch(addToCartAction({ foodId, quantity: 1 }));
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  const navigateToProductDetail = (foodId: string) => {
    navigation.navigate(HomeRouteName.ProductDetail, { foodId });
  };

  const handleLogout = async () => {
    await logout(dispatch);
    resetToAuth(navigation);
  };

  return {
    addToCart,
    view,
    cartCount,
    categories: HOME_CATEGORIES,
    clearButton,
    filteredFoods,
    clearSearchQuery,
    emptyText,
    handleLogout,
    itemsSuffix,
    logoutButton,
    navigateToProductDetail,
    sectionTitle,
    searchPlaceholder,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
  };
}