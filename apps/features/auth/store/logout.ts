import AsyncStorage from '@react-native-async-storage/async-storage';

import type { AppDispatch } from '../../../store';
import { logout as logoutAction } from './authSlice';

const ACCESS_TOKEN_STORAGE_KEY = 'foodfood.accessToken';

export async function logout(dispatch: AppDispatch) {
  await AsyncStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  dispatch(logoutAction());
}
