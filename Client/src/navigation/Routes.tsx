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
import GlobalStore from '../app/stores/GlobalStore';
import StudentStack from './StudentStack';
import { lightThemeNavigation } from '../app/context/Theme';

const Routes: React.FC = () => {
  const theme = useTheme();
  const store = React.useContext(GlobalStore);
  const navigationTheme = theme.dark ? DarkTheme : lightThemeNavigation;

  return (
    <NavigationContainer theme={navigationTheme}>
      {store.authenticatedUser && store.isLoggedIn ? <StudentStack /> : <AuthenticationStack />}
    </NavigationContainer>
  );
};

export default observer(Routes);
