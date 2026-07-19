import React, { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  loginSucceeded,
} from '../store';
import type { RootStackParamList } from '../../../navigation/types';
import { styles } from './style';

type AuthModuleProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

function createMockAccessToken(username: string) {
  const normalizedUsername = username.trim().toLowerCase() || 'guest';
  const randomToken = Math.random().toString(36).slice(2, 10);

  return `mock_access_${normalizedUsername}_${Date.now()}_${randomToken}`;
}

export function AuthModule({ navigation }: AuthModuleProps) {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('demo_user');
  const [password, setPassword] = useState('password');

  const handleLogin = () => {
    const token = createMockAccessToken(username);

    dispatch(loginSucceeded(token));
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs', params: { screen: 'HomeTab' } }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>FoodFood Auth</Text>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Sign in to continue to your food dashboard.
          </Text>

          <View style={styles.form}>
            <TextInput
              autoCapitalize="none"
              onChangeText={setUsername}
              placeholder="Username"
              placeholderTextColor="#6b7280"
              style={styles.input}
              testID="login-email-input"
              value={username}
            />
            <TextInput
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#6b7280"
              secureTextEntry
              style={styles.input}
              testID="login-password-input"
              value={password}
            />
            <Pressable
              accessibilityRole="button"
              onPress={handleLogin}
              style={styles.button}
              testID="login-button">
              <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AuthModule;