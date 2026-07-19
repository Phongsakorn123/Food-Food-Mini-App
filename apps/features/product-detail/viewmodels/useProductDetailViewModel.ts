import { useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import { addToCart } from '../../home/store';
import { useLanguage, type LanguageCode } from '../../auth/config/language';
import type { RootStackParamList } from '../../../navigation/types';
import { useAppDispatch } from '../../../store/hooks';
import { en as productDetailEn } from '../assets/language/en';
import { th as productDetailTh } from '../assets/language/th';
import { PRODUCT_DETAIL_MIN_QUANTITY } from '../constants';
import { findMockFoodById } from '../mocks';
import { ProductDetailRouteName } from '../router';

export function useProductDetailViewModel() {
  const productDetailLanguageMap = useMemo<Record<LanguageCode, typeof productDetailEn>>(
    () => ({
      en: productDetailEn,
      th: productDetailTh,
    }),
    [],
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<
    RouteProp<RootStackParamList, ProductDetailRouteName.ProductDetail>
  >();
  const { languageCode } = useLanguage();
  const {
    addToCart: addToCartText,
    addToCartSuccess,
    backToHome: backToHomeText,
    decrease: decreaseText,
    increase: increaseText,
    quantity: quantityLabelText,
    totalPrefix: totalPrefixText,
  } = productDetailLanguageMap[languageCode].productDetail;
  const dispatch = useAppDispatch();
  const food = findMockFoodById(route.params.foodId);
  const [quantity, setQuantity] = useState(PRODUCT_DETAIL_MIN_QUANTITY);

  const increaseQuantity = () => {
    setQuantity(currentQuantity => currentQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(currentQuantity =>
      Math.max(PRODUCT_DETAIL_MIN_QUANTITY, currentQuantity - 1),
    );
  };

  const totalPrice = food ? food.price * quantity : 0;

  const handleAddToCart = () => {
    if (!food) {
      return;
    }

    dispatch(addToCart({ foodId: food.id, quantity }));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAddToCartAndBack = () => {
    handleAddToCart();
    Toast.show({
      type: 'success',
      text1: addToCartSuccess,
      position: 'top',
    });
    handleGoBack();
  };

  return {
    addToCartText,
    backToHomeText,
    decreaseQuantity,
    decreaseText,
    food,
    handleGoBack,
    handleAddToCart,
    handleAddToCartAndBack,
    increaseQuantity,
    increaseText,
    isNotFound: !food,
    quantityLabelText,
    quantity,
    totalPrefixText,
    totalPrice,
  };
}