/**
 * @format
 */

import { Provider } from 'react-redux';
import { StatusBar as NativeStatusBar } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { MainNavigator } from './apps/navigation';
import { styles } from './apps/styles';
import { appStore } from './apps/store';

type AppStatusBarProps = {
  style: typeof styles.appStatusBar;
};

function StatusBar({ style }: AppStatusBarProps) {
  return <NativeStatusBar {...style} />;
}

function App() {
  return (
    <Provider store={appStore}>
      <SafeAreaProvider>
        <StatusBar style={styles.appStatusBar} />
        <MainNavigator />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
