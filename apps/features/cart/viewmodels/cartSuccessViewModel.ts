import { useEffect, useMemo, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackHandler } from 'react-native';
import { useLanguage, type LanguageCode } from '../../auth/config/language';
import { en as cartEn } from '../assets/language/en';
import { th as cartTh } from '../assets/language/th';
import {
  type CartSuccessRouteProp,
  type CartModuleNavigationProp,
  resetToHomeTab,
} from '../navigation/types';

export function cartSuccessViewModel() {
  const isGoingHomeRef = useRef(false);
  const { languageCode } = useLanguage();
  const navigation = useNavigation<CartModuleNavigationProp>();
  const route = useRoute<CartSuccessRouteProp>();
  const successLanguageMap = useMemo<Record<LanguageCode, typeof cartEn>>(
    () => ({
      en: cartEn,
      th: cartTh,
    }),
    [],
  );
  const { backHomeButton, orderIdLabel, subtitle, title } =
    successLanguageMap[languageCode].success;

  const goHome = () => {
    if (isGoingHomeRef.current) {
      return;
    }

    isGoingHomeRef.current = true;
    resetToHomeTab(navigation);
  };

  useEffect(() => {
    const unsubscribeBeforeRemove = navigation.addListener('beforeRemove', event => {
      if (isGoingHomeRef.current || event.data.action.type === 'RESET') {
        return;
      }

      event.preventDefault();
      goHome();
    });

    const backSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        goHome();

        return true;
      },
    );

    return () => {
      unsubscribeBeforeRemove();
      backSubscription.remove();
      isGoingHomeRef.current = false;
    };
  }, [navigation]);

  return {
    backHomeButton,
    goHome,
    orderId: route.params.orderId,
    orderIdLabel,
    subtitle,
    title,
  };
}