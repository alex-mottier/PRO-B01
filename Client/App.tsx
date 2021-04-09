/**
 * @file    App.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Root component of the application
 */

import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import GlobalStore from './src/app/stores/GlobalStore';
import { lightTheme, darkTheme } from './src/app/context/Theme';
import Routes from './src/navigation/Routes';
import * as Font from 'expo-font';
import LoadingComponent from './src/components/Loading/LoadingComponent';

const App: React.FC = () => {
  const store = React.useContext(GlobalStore);

  // Loading the font for icons
  React.useEffect(() => {
    store.setIsLoading(true);
    void Font.loadAsync({
      MaterialCommunityIcons: require('./assets/MaterialCommunityIcons.ttf'),
    }).then(() => {
      store.setIsLoading(false);
    });
  }, []);

  return (
    <PaperProvider theme={store.theme === 'light' ? lightTheme : darkTheme}>
      {store.isLoading ? <LoadingComponent /> : <Routes />}
    </PaperProvider>
  );
};

export default observer(App);
