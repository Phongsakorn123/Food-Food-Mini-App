/**
 * @format
 */

import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { RootNavigator } from './apps/navigation';
import { appStore } from './apps/store';

function App() {
  return (
    <Provider store={appStore}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#f7f3ea" />
        <RootNavigator />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
