import React, { useEffect } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AuthModuleProps } from './types';
import { useAuthLoginViewModel } from '../../viewmodels/useAuthLoginViewModel';
import { styles } from './styles';
import { LanguageToggle } from '../../compenents/toggleLanguage';

export function AuthModule({ navigation }: AuthModuleProps) {
  const {
    handleLogin,
    isLoginEnabled,
    isLoginSuccess,
    loginButton,
    password,
    passwordPlaceholder,
    redirectRouteName,
    redirectTabName,
    setPassword,
    setUsername,
    subtitle,
    title,
    usernamePlaceholder,
    username,
  } = useAuthLoginViewModel();

  useEffect(() => {
    if (!isLoginSuccess) {
      return;
    }

    navigation.reset({
      index: 0,
      routes: [
        {
          name: redirectRouteName,
          params: { screen: redirectTabName },
        },
      ],
    });
  }, [isLoginSuccess, navigation, redirectRouteName, redirectTabName]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <LanguageToggle />
          </View>
          <Text style={styles.eyebrow}>Food Food</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>

          <View style={styles.form}>
            <TextInput
              autoCapitalize="none"
              onChangeText={setUsername}
              placeholder={usernamePlaceholder}
              placeholderTextColor="#6b7280"
              style={styles.input}
              testID="login-email-input"
              value={username}
            />
            <TextInput
              onChangeText={setPassword}
              placeholder={passwordPlaceholder}
              placeholderTextColor="#6b7280"
              secureTextEntry
              style={styles.input}
              testID="login-password-input"
              value={password}
            />
            <Pressable
              accessibilityRole="button"
              disabled={!isLoginEnabled}
              onPress={handleLogin}
              style={[styles.button, !isLoginEnabled && styles.buttonDisabled]}
              testID="login-button">
              <Text style={styles.buttonText}>{loginButton}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AuthModule;