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

const App: React.FC = () => {
  const store = React.useContext(GlobalStore);

  return (
    <PaperProvider theme={store.theme === 'light' ? lightTheme : darkTheme}>
      <Routes />
    </PaperProvider>
  );
};

export default observer(App);
