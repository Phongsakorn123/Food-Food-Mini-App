import { useState } from 'react';

import { addToCart } from '../../home/store';
import type { FoodItem } from '../../home/mocks/foods';
import { useAppDispatch } from '../../../store/hooks';
import { PRODUCT_DETAIL_MIN_QUANTITY } from '../constants';

export function useProductDetailViewModel(food: FoodItem) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(PRODUCT_DETAIL_MIN_QUANTITY);

  const increaseQuantity = () => {
    setQuantity(currentQuantity => currentQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(currentQuantity =>
      Math.max(PRODUCT_DETAIL_MIN_QUANTITY, currentQuantity - 1),
    );
  };

  const totalPrice = food.price * quantity;

  const handleAddToCart = () => {
    dispatch(addToCart({ foodId: food.id, quantity }));
  };

  return {
    decreaseQuantity,
    handleAddToCart,
    increaseQuantity,
    quantity,
    totalPrice,
  };
}