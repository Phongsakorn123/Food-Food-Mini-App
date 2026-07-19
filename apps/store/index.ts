import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '../features/auth/store/authSlice';
import { cartReducer } from '../features/home/store';

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;