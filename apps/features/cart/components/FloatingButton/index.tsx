import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useHasAccessToken } from '../../../../../AppInitializer';
import { selectCartCount } from '../../../home/store';
import type { RootStackParamList } from '../../../../navigation/types';
import { useAppSelector } from '../../../../store/hooks';
import { styles } from './styles';

export function FloatingCartButton() {
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

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      style={[
        styles.button,
        {
          bottom: 24 + insets.bottom,
          left: 20 + insets.left,
        },
      ]}
      testID="floating-cart-button">
      <Text style={styles.buttonText}>🛒</Text>
      <View style={styles.badge} testID="floating-cart-badge">
        <Text style={styles.badgeText}>{cartCount}</Text>
      </View>
    </Pressable>
  );
}