/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';
import App from '../App';

jest.useFakeTimers();

jest.mock('react-native-toast-message', () => {
  const React = require('react');
  const Toast = () => null;

  Toast.show = jest.fn();

  return {
    __esModule: true,
    default: Toast,
  };
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const insetValue = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  const frameValue = {
    x: 0,
    y: 0,
    width: 390,
    height: 844,
  };

  const SafeAreaInsetsContext = React.createContext(insetValue);
  const SafeAreaFrameContext = React.createContext(frameValue);

  return {
    SafeAreaInsetsContext,
    SafeAreaFrameContext,
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    initialWindowMetrics: {
      frame: frameValue,
      insets: insetValue,
    },
    useSafeAreaInsets: () => insetValue,
    useSafeAreaFrame: () => frameValue,
  };
});

function getLastByTestId(
  renderer: ReactTestRenderer.ReactTestRenderer,
  testID: string,
) {
  const matches = renderer.root.findAllByProps({testID});

  return matches[matches.length - 1];
}

function getLastPressableByTestId(
  renderer: ReactTestRenderer.ReactTestRenderer,
  testID: string,
) {
  const matches = renderer.root.findAll(
    node => node.props.testID === testID && typeof node.props.onPress === 'function',
  );

  return matches[matches.length - 1];
}

test('renders correctly', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  await ReactTestRenderer.act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(JSON.stringify(renderer!.toJSON())).toContain('Login');

  const loginButton = renderer!.root.findByProps({testID: 'login-button'});

  await ReactTestRenderer.act(() => {
    loginButton.props.onPress();
  });

  await ReactTestRenderer.act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(renderer!.root.findByProps({testID: 'home-search-input'})).toBeTruthy();
  expect(renderer!.root.findByProps({testID: 'category-ของคาว'})).toBeTruthy();
  expect(getLastPressableByTestId(renderer!, 'floating-cart-button')).toBeTruthy();
  expect(getLastByTestId(renderer!, 'floating-cart-badge').findByType(Text).props.children).toBe(0);
  expect(renderer!.root.findByProps({testID: 'results-count'}).props.children).toEqual([
    24,
    ' items',
  ]);

  const addToCartFromHome = renderer!.root.findByProps({testID: 'add-to-cart-first'});

  await ReactTestRenderer.act(() => {
    addToCartFromHome.props.onPress();
  });

  expect(renderer!.root.findByProps({testID: 'cart-count'}).props.children).toBe(1);

  const firstFoodCard = renderer!.root.findByProps({testID: 'home-food-card-first'});

  await ReactTestRenderer.act(() => {
    firstFoodCard.props.onPress();
  });

  await ReactTestRenderer.act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(getLastPressableByTestId(renderer!, 'floating-cart-button')).toBeTruthy();
  expect(renderer!.root.findByProps({testID: 'detail-title'}).props.children).toBe(
    'Pad Thai',
  );
  expect(renderer!.root.findByProps({testID: 'detail-total-price'}).props.children).toEqual([
    'Total: ฿',
    120,
  ]);

  const increaseQuantityButton = renderer!.root.findByProps({
    testID: 'detail-increase-button',
  });

  await ReactTestRenderer.act(() => {
    increaseQuantityButton.props.onPress();
  });

  expect(renderer!.root.findByProps({testID: 'detail-quantity-value'}).props.children).toBe(2);
  expect(renderer!.root.findByProps({testID: 'detail-total-price'}).props.children).toEqual([
    'Total: ฿',
    240,
  ]);

  const detailAddToCartButton = renderer!.root.findByProps({
    testID: 'detail-add-to-cart-button',
  });

  await ReactTestRenderer.act(() => {
    detailAddToCartButton.props.onPress();
  });

  expect((Toast as any).show).toHaveBeenCalledWith(
    expect.objectContaining({
      text1: 'Add to cart success',
      type: 'success',
    }),
  );

  expect(getLastByTestId(renderer!, 'floating-cart-badge').findByType(Text).props.children).toBe(3);

  const floatingCartButton = getLastPressableByTestId(renderer!, 'floating-cart-button');

  await ReactTestRenderer.act(() => {
    floatingCartButton.props.onPress();
  });

  await ReactTestRenderer.act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(renderer!.root.findByProps({testID: 'cart-back-button'})).toBeTruthy();
  expect(renderer!.root.findByProps({testID: 'cart-grand-total'}).props.children).toEqual([
    '฿',
    390,
  ]);

  const cartSuccessButton = renderer!.root.findByProps({testID: 'cart-success-button'});

  await ReactTestRenderer.act(() => {
    cartSuccessButton.props.onPress();
  });

  expect(renderer!.root.findByProps({testID: 'cart-success-title'})).toBeTruthy();
  expect(renderer!.root.findByProps({testID: 'cart-success-order-id'})).toBeTruthy();

  const cartSuccessBackHomeButton = renderer!.root.findByProps({
    testID: 'cart-success-back-home-button',
  });

  await ReactTestRenderer.act(() => {
    cartSuccessBackHomeButton.props.onPress();
  });

  await ReactTestRenderer.act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(renderer!.root.findByProps({testID: 'home-search-input'})).toBeTruthy();
  expect(getLastByTestId(renderer!, 'floating-cart-badge').findByType(Text).props.children).toBe(0);

  const floatingCartButtonAfterBackHome = getLastPressableByTestId(
    renderer!,
    'floating-cart-button',
  );

  await ReactTestRenderer.act(() => {
    floatingCartButtonAfterBackHome.props.onPress();
  });

  await ReactTestRenderer.act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(renderer!.root.findByProps({testID: 'cart-back-button'})).toBeTruthy();
  expect(renderer!.root.findByProps({testID: 'cart-empty-text'})).toBeTruthy();
  expect(renderer!.root.findByProps({testID: 'cart-grand-total'}).props.children).toEqual([
    '฿',
    0,
  ]);
  expect(getLastByTestId(renderer!, 'floating-cart-badge').findByType(Text).props.children).toBe(0);

  const cartBackButton = renderer!.root.findByProps({testID: 'cart-back-button'});

  await ReactTestRenderer.act(() => {
    cartBackButton.props.onPress();
  });

  await ReactTestRenderer.act(async () => {
    jest.runOnlyPendingTimers();
  });

  expect(renderer!.root.findByProps({testID: 'home-search-input'})).toBeTruthy();
});
