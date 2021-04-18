/**
 * @file    App.tsx
 * @author  Alexis Allemann & Alexandre Mottier
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
  /* Usage of MobX global state store */
  const store = React.useContext(GlobalStore);

  /* Component states */
  const [isLoading, setIsLoading] = React.useState(true);

  /**
   * Action when component is loaded
   */
  React.useEffect(() => {
    store.setIsLoading(true);

    // Loading icons font
    void Font.loadAsync({
      MaterialCommunityIcons: require('./assets/MaterialCommunityIcons.ttf'),
    }).then(() => {
      store.setIsLoading(false);
      setIsLoading(false);
    });
  }, []);

  // Don't load the application until the font is loaded
  if (isLoading)
    return (
      <PaperProvider theme={store.theme === 'light' ? lightTheme : darkTheme}>
        <LoadingComponent />
      </PaperProvider>
    );

  return (
    <PaperProvider theme={store.theme === 'light' ? lightTheme : darkTheme}>
      {store.isLoading ? <LoadingComponent /> : <Routes />}
    </PaperProvider>
  );
};

export default observer(App);
