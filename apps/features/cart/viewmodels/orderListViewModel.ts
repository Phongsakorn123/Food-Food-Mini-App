import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useLanguage, type LanguageCode } from '../../auth/config/language';
import { en as cartEn } from '../assets/language/en';
import { th as cartTh } from '../assets/language/th';
import { FOOD_ITEMS } from '../../home/mocks/foods';
import { selectOrderHistory } from '../../home/store';
import type { OrderListModuleNavigationProp } from '../navigation/types';
import { useAppSelector } from '../../../store/hooks';
import { CartRouteName } from '../router';

export function orderListViewModel() {
  const navigation = useNavigation<OrderListModuleNavigationProp>();
  const { languageCode } = useLanguage();
  const orderListLanguageMap = useMemo<Record<LanguageCode, typeof cartEn>>(
    () => ({
      en: cartEn,
      th: cartTh,
    }),
    [],
  );
  const {
    emptyText,
    orderIdLabel,
    subtitle,
    title,
    totalItemsPrefix,
    totalItemsSuffix,
    totalPricePrefix,
  } = orderListLanguageMap[languageCode].orderList;
  const orders = useAppSelector(selectOrderHistory);

  const orderCards = useMemo(
    () =>
      orders.map(order => {
        const totalItems = Object.values(order.items).reduce(
          (sum, quantity) => sum + quantity,
          0,
        );
        const totalPrice = Object.entries(order.items).reduce(
          (sum, [foodId, quantity]) => {
            const food = FOOD_ITEMS.find(item => item.id === foodId);

            return sum + (food ? food.price * quantity : 0);
          },
          0,
        );

        return {
          id: order.id,
          totalItems,
          totalPrice,
        };
      }),
    [orders],
  );

  const handleOpenOrder = (orderId: string) => {
    navigation.navigate(CartRouteName.Cart, { orderId });
  };

  return {
    emptyText,
    handleOpenOrder,
    orderCards,
    orderIdLabel,
    subtitle,
    title,
    totalItemsPrefix,
    totalItemsSuffix,
    totalPricePrefix,
  };
}