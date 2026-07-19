import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../navigation/types';
import { ProductDetailRouteName } from '../router';

export type ProductDetailModuleProps = NativeStackScreenProps<
  RootStackParamList,
  ProductDetailRouteName.ProductDetail
>;