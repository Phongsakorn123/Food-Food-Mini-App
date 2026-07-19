import { useMemo } from 'react';

import {
  addToCart,
  decreaseCartItem,
  removeCartItem,
  selectOrderById,
  selectCartItems,
} from '../../home/store';
import { FOOD_ITEMS } from '../../home/mocks/foods';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export function useCartViewModel(orderId?: string) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => {
    if (!orderId) {
      return selectCartItems(state);
    }

    return selectOrderById(state, orderId)?.items ?? {};
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

  const increaseItem = (foodId: string) => {
    if (orderId) {
      return;
    }

    dispatch(addToCart({ foodId, quantity: 1 }));
  };

  const decreaseItem = (foodId: string) => {
    if (orderId) {
      return;
    }

    dispatch(decreaseCartItem({ foodId, quantity: 1 }));
  };

  const removeItem = (foodId: string) => {
    if (orderId) {
      return;
    }

    dispatch(removeCartItem({ foodId }));
  };

  return {
    decreaseItem,
    grandTotal,
    increaseItem,
    items,
    removeItem,
  };
}