import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from '../assets/language/en';
import { th } from '../assets/language/th';

export type LanguageCode = 'en' | 'th';
export type LanguageDictionary = typeof en;

export const defaultLanguageCode: LanguageCode = 'th';

export const languageMap: Record<LanguageCode, LanguageDictionary> = {
	en,
	th,
};

export const LANGUAGE_SESSION_STORAGE_KEY = 'foodfood.language';

export function isLanguageCode(value: string | null): value is LanguageCode {
	return value === 'en' || value === 'th';
}

export async function getLanguageCodeFromSession() {
	const cachedLanguageCode = await AsyncStorage.getItem(
		LANGUAGE_SESSION_STORAGE_KEY,
	);

	if (isLanguageCode(cachedLanguageCode)) {
		return cachedLanguageCode;
	}

	return defaultLanguageCode;
}

export async function setLanguageCodeToSession(languageCode: LanguageCode) {
	await AsyncStorage.setItem(LANGUAGE_SESSION_STORAGE_KEY, languageCode);
}

type LanguageContextValue = {
	languageCode: LanguageCode;
	setLanguageCode: (languageCode: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
	children: React.ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
	const [languageCode, setLanguageCode] = useState<LanguageCode>(
		defaultLanguageCode,
	);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		let isMounted = true;

		const hydrateLanguage = async () => {
			const cachedLanguageCode = await getLanguageCodeFromSession();

			if (isMounted) {
				setLanguageCode(cachedLanguageCode);
				setIsReady(true);
			}
		};

		void hydrateLanguage();

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		if (!isReady) {
			return;
		}

		const persistLanguage = async () => {
			await setLanguageCodeToSession(languageCode);
		};

		void persistLanguage();
	}, [isReady, languageCode]);

	if (!isReady) {
		return null;
	}

	return React.createElement(
		LanguageContext.Provider,
		{
			value: {
				languageCode,
				setLanguageCode,
			},
		},
		children,
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);

	if (!context) {
		throw new Error('useLanguage must be used within LanguageProvider');
	}

	return context;
}
