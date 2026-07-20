import React from 'react';
import { Pressable, Text } from 'react-native';

import {
	setLanguageCodeToSession,
	type LanguageCode,
    useLanguage,
} from '../../config/language';
import { styles } from './styles';

const languageOptions: Array<{ code: LanguageCode; label: string }> = [
	{ code: 'th', label: 'TH' },
	{ code: 'en', label: 'EN' },
];

export function LanguageToggle() {
	const { languageCode, setLanguageCode } = useLanguage();

	return (
		<Pressable
			accessibilityRole="button"
			onPress={() => {
				const nextLanguageCode: LanguageCode =
					languageCode === 'th' ? 'en' : 'th';

				void (async () => {
					await setLanguageCodeToSession(nextLanguageCode);
					setLanguageCode(nextLanguageCode);
				})();
			}}
			style={styles.button}>
			{languageOptions.map(option => {
				const isActive = option.code === languageCode;

				return (
					<Text
						key={option.code}
						style={[
							styles.buttonText,
							isActive && styles.buttonTextActive,
						]}>
						{option.label}
					</Text>
				);
			})}
		</Pressable>
	);
}

export default LanguageToggle;