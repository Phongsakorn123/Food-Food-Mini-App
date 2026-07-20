import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { floatingCartButtonViewModel } from '../../viewmodels/floatingCartButtonViewModel';
import { getFloatingButtonPositionStyle, styles } from './styles';

export function FloatingCartButton() {
  const { cartCount, handlePress, insets } = floatingCartButtonViewModel();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      style={[
        styles.button,
        getFloatingButtonPositionStyle(insets),
      ]}>
      <Text style={styles.buttonText}>🛒</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{cartCount}</Text>
      </View>
    </Pressable>
  );
}