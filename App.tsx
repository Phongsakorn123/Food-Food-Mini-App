import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { AppInitializer } from './AppInitializer';
import { MainNavigator } from './apps/navigation';
import { styles } from './apps/styles';
import { appStore } from './apps/store';

function App() {
  return (
    <Provider store={appStore}>
      <SafeAreaProvider>
        <AppInitializer>
          <StatusBar {...styles.appStatusBar} />
          <MainNavigator />
          <Toast />
        </AppInitializer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
