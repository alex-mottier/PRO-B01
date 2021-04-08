/**
 * @file    Routes.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Routing of application screens
 */

import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { AuthenticationStack } from './AuthenticationStack';
import { observer } from 'mobx-react-lite';
import GlobalStore from '../app/stores/GlobalStore';
import StackNavigator from './StudentStack';

const Routes: React.FC = () => {
  const theme = useTheme();
  const store = React.useContext(GlobalStore);
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      {store.authenticatedUser && store.isLoggedIn ? <StackNavigator /> : <AuthenticationStack />}
    </NavigationContainer>
  );
};

export default observer(Routes);
