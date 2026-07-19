import React, { useEffect } from 'react';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { useAccessToken } from '../../AppInitializer';

type EntryScreenProps = NativeStackScreenProps<RootStackParamList, 'Entry'>;

export function EntryScreen({ navigation }: EntryScreenProps) {
  const accessToken = useAccessToken();

  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [
        accessToken
          ? { name: 'MainTabs', params: { screen: 'HomeTab' } }
          : { name: 'Auth' },
      ],
    });
  }, [accessToken, navigation]);

  return <View testID="entry-screen" />;
}