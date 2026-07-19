import { CommonActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useHasAccessToken } from '../../../../../AppInitializer';
import { selectCartCount } from '../../../home/store';
import type { RootStackParamList } from '../../../../navigation/types';
import { useAppSelector } from '../../../../store/hooks';

export function floatingCartButtonViewModel() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const hasAccessToken = useHasAccessToken();
  const cartCount = useAppSelector(selectCartCount);

  const handlePress = () => {
    if (!hasAccessToken) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Auth'}],
        }),
      );

      return;
    }

    navigation.navigate('Cart');
  };

  return {
    cartCount,
    insets,
    handlePress,
  };
}