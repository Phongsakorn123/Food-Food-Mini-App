import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  restoreOrderHistory,
  selectOrderHistory,
} from '../../home/store';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const ORDER_HISTORY_STORAGE_KEY = 'foodfood.orderHistory';
let hasHydratedOrderHistory = false;

export function useOrderHistoryPersistence() {
  const dispatch = useAppDispatch();
  const orderHistory = useAppSelector(selectOrderHistory);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (hasHydratedOrderHistory) {
      setIsHydrated(true);

      return;
    }

    if (orderHistory.length > 0) {
      hasHydratedOrderHistory = true;
      setIsHydrated(true);

      return;
    }

    let isMounted = true;

    const hydrateOrderHistory = async () => {
      try {
        const cachedOrderHistoryRaw = await AsyncStorage.getItem(
          ORDER_HISTORY_STORAGE_KEY,
        );
        const parsedOrderHistory = cachedOrderHistoryRaw
          ? JSON.parse(cachedOrderHistoryRaw)
          : [];
        const safeOrderHistory = Array.isArray(parsedOrderHistory)
          ? parsedOrderHistory
          : [];

        if (isMounted) {
          dispatch(restoreOrderHistory({ orders: safeOrderHistory }));
        }
      } finally {
        if (isMounted) {
          hasHydratedOrderHistory = true;
          setIsHydrated(true);
        }
      }
    };

    void hydrateOrderHistory();

    return () => {
      isMounted = false;
    };
  }, [dispatch, orderHistory.length]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const persistOrderHistory = async () => {
      await AsyncStorage.setItem(
        ORDER_HISTORY_STORAGE_KEY,
        JSON.stringify(orderHistory),
      );
    };

    void persistOrderHistory();
  }, [isHydrated, orderHistory]);
}
