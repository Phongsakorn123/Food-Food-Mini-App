import { useState } from 'react';

import {
  AUTH_REDIRECT_ROUTE_NAME,
  AUTH_REDIRECT_TAB_NAME,
} from '../constants';
import { languageMap, useLanguage } from '../config/language';
import { useAppDispatch } from '../../../store/hooks';
import { loginSucceeded } from '../store';
import { createMockAccessToken } from '../utils/token';

export function useAuthLoginViewModel() {
  const { languageCode } = useLanguage();
  const prompt = languageMap[languageCode].auth.login;
  const {
    loginButton,
    passwordPlaceholder,
    subtitle,
    title,
    usernamePlaceholder,
  } = prompt;
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const validateCredentials = () => {
    return username.trim().length > 0 && password.trim().length > 0;
  };

  const isLoginEnabled = validateCredentials();

  const handleLogin = () => {
    if (!validateCredentials()) {
      return;
    }

    const token = createMockAccessToken(username);

    dispatch(loginSucceeded(token));
    setIsLoginSuccess(true);
  };

  return {
    username,
    password,
    title,
    subtitle,
    usernamePlaceholder,
    passwordPlaceholder,
    loginButton,
    isLoginSuccess,
    isLoginEnabled,
    redirectRouteName: AUTH_REDIRECT_ROUTE_NAME,
    redirectTabName: AUTH_REDIRECT_TAB_NAME,
    setUsername,
    setPassword,
    handleLogin,
  };
}