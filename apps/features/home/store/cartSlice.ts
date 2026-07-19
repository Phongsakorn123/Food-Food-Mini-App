import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../../store';

type CartState = {
  items: Record<string, number>;
  orders: Array<{
    id: string;
    items: Record<string, number>;
    createdAt: number;
  }>;
};

type AddToCartPayload = {
  foodId: string;
  quantity: number;
};

type RemoveCartItemPayload = {
  foodId: string;
};

type PlaceOrderPayload = {
  orderId: string;
};

const initialState: CartState = {
  items: {},
  orders: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { foodId, quantity } = action.payload;

      state.items[foodId] = (state.items[foodId] ?? 0) + quantity;
    },
    decreaseCartItem: (state, action: PayloadAction<AddToCartPayload>) => {
      const { foodId, quantity } = action.payload;
      const nextQuantity = (state.items[foodId] ?? 0) - quantity;

      if (nextQuantity <= 0) {
        delete state.items[foodId];
        return;
      }

      state.items[foodId] = nextQuantity;
    },
    removeCartItem: (state, action: PayloadAction<RemoveCartItemPayload>) => {
      delete state.items[action.payload.foodId];
    },
    placeOrder: (state, action: PayloadAction<PlaceOrderPayload>) => {
      const hasItems = Object.keys(state.items).length > 0;

      if (!hasItems) {
        return;
      }

      state.orders.unshift({
        id: action.payload.orderId,
        items: { ...state.items },
        createdAt: Date.now(),
      });

      state.items = {};
    },
  },
});

export const { addToCart, decreaseCartItem, removeCartItem, placeOrder } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const selectCartCount = (state: RootState) =>
  Object.values(state.cart.items).reduce(
    (total, quantity) => total + quantity,
    0,
  );

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectOrderHistory = (state: RootState) => state.cart.orders;

export const selectOrderById = (state: RootState, orderId: string) =>
  state.cart.orders.find(order => order.id === orderId);