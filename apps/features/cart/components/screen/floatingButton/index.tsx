import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { useFloatingCartButtonViewModel } from '../../viewmodels/useFloatingCartButtonViewModel';
import { getFloatingButtonPositionStyle, styles } from './styles';

export function FloatingCartButton() {
  const { cartCount, handlePress, insets } = useFloatingCartButtonViewModel();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      style={[
        styles.button,
        getFloatingButtonPositionStyle(insets),
      ]}
      testID="floating-cart-button">
      <Text style={styles.buttonText}>🛒</Text>
      <View style={styles.badge} testID="floating-cart-badge">
        <Text style={styles.badgeText}>{cartCount}</Text>
      </View>
    </Pressable>
  );
}