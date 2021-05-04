/**
 * @file    Routes.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Routing of application screens
 */

import * as React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { AuthenticationStack } from './AuthenticationStack';
import { observer } from 'mobx-react-lite';
import StudentStack from './StudentStack';
//import HostStack from './HostStack';

import { lightThemeNavigation } from '../app/context/Theme';
import { useStores } from '../app/context/storesContext';
import HostStack from './HostStack';

const Routes: React.FC = () => {
  const theme = useTheme();
  const { authenticationStore } = useStores();
  const navigationTheme = theme.dark ? DarkTheme : lightThemeNavigation;

  return (
    <NavigationContainer theme={navigationTheme}>
      {authenticationStore.isLoggedIn && authenticationStore.authenticatedHost && <HostStack />}
      {authenticationStore.isLoggedIn && authenticationStore.authenticatedUser && <StudentStack />}
      {!authenticationStore.isLoggedIn && <AuthenticationStack />}
    </NavigationContainer>
  );
};

export default observer(Routes);
