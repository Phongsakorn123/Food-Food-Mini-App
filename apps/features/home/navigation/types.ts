import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../../navigation/types';
import { HomeRouteName } from '../router';

export type HomeModuleNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export function resetToAuth(navigation: HomeModuleNavigationProp) {
  navigation.reset({
    index: 0,
    routes: [{ name: HomeRouteName.Auth }],
  });
}