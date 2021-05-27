/**
 * @file    App.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Root component of the application
 */

import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { lightTheme, darkTheme } from './src/app/context/Theme';
import Routes from './src/navigation/Routes';
import * as Font from 'expo-font';
import LoadingComponent from './src/components/Loading/LoadingComponent';
import { useStores } from './src/app/stores/StoresContext';

const App: React.FC = () => {
  /* Usage of MobX global state store */
  const { authenticationStore, themeStore } = useStores();

  /* Component states */
  const [isLoading, setIsLoading] = React.useState(true);

  /**
   * Action when component is loaded
   */
  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      // Loading icons font
      void Font.loadAsync({
        MaterialCommunityIcons: require('./assets/MaterialCommunityIcons.ttf'),
      }).then(() => {
        setIsLoading(false);
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  // Don't load the application until the font is loaded
  if (isLoading)
    return (
      <PaperProvider theme={themeStore.theme === 'light' ? lightTheme : darkTheme}>
        <LoadingComponent />
      </PaperProvider>
    );

  return (
    <PaperProvider theme={themeStore.theme === 'light' ? lightTheme : darkTheme}>
      {authenticationStore.isLoading ? <LoadingComponent /> : <Routes />}
    </PaperProvider>
  );
};

export default observer(App);
