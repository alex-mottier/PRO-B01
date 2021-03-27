/**
 * @file    App.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Root component of the application
 */

import * as React from 'react';
import { PreferencesContext } from './app/context/ContextPreferences';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import Globals from './app/context/Globals';
import { RootNavigator } from './navigator/RootNavigator';
import { useColorScheme } from 'react-native';
import { Font } from 'expo';

export default (): React.ReactElement => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(
    colorScheme === 'dark' ? 'dark' : 'light',
  );

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  }

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme],
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider
        theme={
          theme === 'light'
            ? {
                ...DefaultTheme,
                roundness: 2,
                colors: {
                  ...DefaultTheme.colors,
                  primary: Globals.COLORS.PRIMARY,
                },
              }
            : {
                ...DarkTheme,
                roundness: 2,
                colors: {
                  ...DarkTheme.colors,
                  primary: Globals.COLORS.PRIMARY,
                },
              }
        }>
        <RootNavigator />
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};
function componentWillMount() {
  throw new Error('Function not implemented.');
}
function useFonts(arg0: { Montserrat: any }): [any] {
  throw new Error('Function not implemented.');
}
