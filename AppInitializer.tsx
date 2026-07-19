import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	restoreSession,
	selectAccessToken,
	selectIsAuthenticated,
} from './apps/features/auth/store';
import {
	defaultLanguageCode,
	getLanguageCodeFromSession,
	setLanguageCodeToSession,
	type LanguageCode,
} from './apps/features/auth/config/language';
import { useAppDispatch, useAppSelector } from './apps/store/hooks';

const ACCESS_TOKEN_STORAGE_KEY = 'foodfood.accessToken';

type AppInitializerValue = {
	accessToken: string | null;
	isAuthenticated: boolean;
	hasAccessToken: boolean;
	languageCode: LanguageCode;
	setLanguageCode: (languageCode: LanguageCode) => void;
	isReady: boolean;
};

const AppInitializerContext = createContext<AppInitializerValue | null>(null);

type AppInitializerProps = {
	children: React.ReactNode;
};

export const AppInitializer = ({ children }: AppInitializerProps) => {
	const dispatch = useAppDispatch();
	const accessToken = useAppSelector(selectAccessToken);
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const [languageCode, setLanguageCode] = useState<LanguageCode>(
		defaultLanguageCode,
	);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		let isMounted = true;

		const hydrateSession = async () => {
			try {
				const cachedAccessToken = await AsyncStorage.getItem(
					ACCESS_TOKEN_STORAGE_KEY,
				);
				const cachedLanguageCode = await getLanguageCodeFromSession();
				if (isMounted) {
					dispatch(restoreSession(cachedAccessToken));
					setLanguageCode(cachedLanguageCode);
				}
			} finally {
				if (isMounted) {
					setIsReady(true);
				}
			}
		};

		void hydrateSession();

		return () => {
			isMounted = false;
		};
	}, [dispatch]);

	useEffect(() => {
		if (!isReady) {
			return;
		}

		const persistAccessToken = async () => {
			if (accessToken) {
				await AsyncStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
				return;
			}

			await AsyncStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
		};

		void persistAccessToken();
	}, [accessToken, isReady]);

	useEffect(() => {
		if (!isReady) {
			return;
		}

		const persistLanguage = async () => {
			await setLanguageCodeToSession(languageCode);
		};

		void persistLanguage();
	}, [isReady, languageCode]);

	const value: AppInitializerValue = {
		accessToken,
		isAuthenticated,
		hasAccessToken: accessToken !== null,
		languageCode,
		setLanguageCode,
		isReady,
	};

	if (!isReady) {
		return null;
	}

	return (
		<AppInitializerContext.Provider value={value}>
			{children}
		</AppInitializerContext.Provider>
	);
};

export function useAppInitializer() {
	const context = useContext(AppInitializerContext);

	if (!context) {
		throw new Error('useAppInitializer must be used within AppInitializer');
	}

	return context;
}

export function useAccessToken() {
	return useAppInitializer().accessToken;
}

export function useHasAccessToken() {
	return useAppInitializer().hasAccessToken;
}

export function useIsAuthenticated() {
	return useAppInitializer().isAuthenticated;
}

export function useAppInitializerReady() {
	return useAppInitializer().isReady;
}

export function useLanguage() {
	const { languageCode, setLanguageCode } = useAppInitializer();

	return {
		languageCode,
		setLanguageCode,
	};
}
