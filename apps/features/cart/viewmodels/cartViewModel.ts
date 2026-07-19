import { useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useLanguage, type LanguageCode } from '../../auth/config/language';
import { en as cartEn } from '../assets/language/en';
import { th as cartTh } from '../assets/language/th';
import {
  resetToCartSuccess,
  type CartModuleNavigationProp,
  type CartModuleRouteProp,
} from '../navigation/types';
import { injectContainer } from '../di/injectContainer';
import { useOrderHistoryPersistence } from '../store/useOrderHistoryPersistence';
import {
  addToCart,
  decreaseCartItem,
  placeOrder,
  removeCartItem,
  selectOrderHistory,
  selectOrderById,
  selectCartItems,
} from '../../home/store';
import { FOOD_ITEMS } from '../../home/mocks/foods';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export function cartViewModel() {
  useOrderHistoryPersistence();
  const { languageCode } = useLanguage();
  const navigation = useNavigation<CartModuleNavigationProp>();
  const route = useRoute<CartModuleRouteProp>();
  const cartLanguageMap = useMemo<Record<LanguageCode, typeof cartEn>>(
    () => ({
      en: cartEn,
      th: cartTh,
    }),
    [],
  );
  const {
    backButton,
    cartTitle,
    checkoutButton,
    deliveryFeeLabel,
    emptyText,
    grandTotalLabel,
    orderCartTitle,
    orderDetailSubtitle,
    orderIdLabel,
    orderIdPrefix,
    quantityDecrease,
    quantityIncrease,
    subtotalLabel,
    reviewSubtitle,
  } = cartLanguageMap[languageCode].cart;
  const selectedOrderId = route.params?.orderId;
  const isOrderDetailMode = Boolean(selectedOrderId);
  const dispatch = useAppDispatch();
  const checkoutUsecase = injectContainer.usecases.checkoutUsecase;
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const orderHistory = useAppSelector(selectOrderHistory);
  const nextOrderNumber = orderHistory.length + 1;
  const cartItems = useAppSelector(state => {
    if (!selectedOrderId) {
      return selectCartItems(state);
    }

    return selectOrderById(state, selectedOrderId)?.items ?? {};
  });

  const items = useMemo(
    () =>
      Object.entries(cartItems)
        .map(([foodId, quantity]) => {
          const food = FOOD_ITEMS.find(candidate => candidate.id === foodId);

          if (!food) {
            return null;
          }

          return {
            ...food,
            quantity,
            totalPrice: food.price * quantity,
          };
        })
        .filter(item => item !== null),
    [cartItems],
  );

  const grandTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const subtotal = grandTotal;
  const deliveryFee = subtotal > 0 ? 30 : 0;
  const grandTotalWithFee = subtotal + deliveryFee;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const callCheckoutService = async () => {
    try {
      setIsCheckoutLoading(true);

      const { orderId } = await checkoutUsecase({
        nextOrderNumber,
        orderIdPrefix,
      });

      return orderId;
    } catch (error) {
      console.error('Checkout failed', error);

      return null;
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const handleCheckout = async () => {
    const orderId = await callCheckoutService();

    if (!orderId) {
      return;
    }

    dispatch(placeOrder({ orderId }));
    resetToCartSuccess(navigation, orderId);
  };

  const increaseItem = (foodId: string) => {
    if (selectedOrderId) {
      return;
    }

    dispatch(addToCart({ foodId, quantity: 1 }));
  };

  const decreaseItem = (foodId: string) => {
    if (selectedOrderId) {
      return;
    }

    dispatch(decreaseCartItem({ foodId, quantity: 1 }));
  };

  const removeItem = (foodId: string) => {
    if (selectedOrderId) {
      return;
    }

    dispatch(removeCartItem({ foodId }));
  };

  return {
    backButton,
    cartTitle,
    checkoutButton,
    decreaseItem,
    deliveryFeeLabel,
    deliveryFee,
    emptyText,
    grandTotal,
    grandTotalLabel,
    grandTotalWithFee,
    isCheckoutLoading,
    handleCheckout,
    handleGoBack,
    increaseItem,
    isOrderDetailMode,
    items,
    orderCartTitle,
    orderDetailSubtitle,
    orderIdLabel,
    orderIdPrefix,
    quantityDecrease,
    quantityIncrease,
    reviewSubtitle,
    removeItem,
    selectedOrderId,
    subtotal,
    subtotalLabel,
  };
}