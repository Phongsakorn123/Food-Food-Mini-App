import { useState } from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { loginSucceeded } from '../store';
import { createMockAccessToken } from '../utils/token';

export function useAuthLoginViewModel() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleLogin = () => {
    const token = createMockAccessToken(username);

    dispatch(loginSucceeded(token));
    setIsLoginSuccess(true);
  };

  return {
    username,
    password,
    isLoginSuccess,
    setUsername,
    setPassword,
    handleLogin,
  };
}