import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../../store';

type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSucceeded: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSucceeded, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;