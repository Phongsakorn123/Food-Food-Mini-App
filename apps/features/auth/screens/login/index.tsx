import React, { useEffect } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AuthModuleProps } from './types';
import { languageMap } from '../../config/language';
import { useLanguage } from '../../config/language';
import { useAuthLoginViewModel } from '../../viewmodels/useAuthLoginViewModel';
import { styles } from './styles';
import { LanguageToggle } from '../../compenents/toggleLanguage';

export function AuthModule({ navigation }: AuthModuleProps) {
  const { languageCode } = useLanguage();
  const prompt = languageMap[languageCode].auth.login;
  const {
    handleLogin,
    isLoginSuccess,
    password,
    setPassword,
    setUsername,
    username,
  } = useAuthLoginViewModel();

  useEffect(() => {
    if (!isLoginSuccess) {
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs', params: { screen: 'HomeTab' } }],
    });
  }, [isLoginSuccess, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <LanguageToggle />
          </View>
          <Text style={styles.eyebrow}>Food Food</Text>
          <Text style={styles.title}>{prompt.title}</Text>
          <Text style={styles.subtitle}>
            {prompt.subtitle}
          </Text>

          <View style={styles.form}>
            <TextInput
              autoCapitalize="none"
              onChangeText={setUsername}
              placeholder={prompt.usernamePlaceholder}
              placeholderTextColor="#6b7280"
              style={styles.input}
              testID="login-email-input"
              value={username}
            />
            <TextInput
              onChangeText={setPassword}
              placeholder={prompt.passwordPlaceholder}
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
              <Text style={styles.buttonText}>{prompt.loginButton}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AuthModule;