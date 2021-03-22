/**-----------------------------------------------------------------------------------
 * @file    Routes.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Routing of application screens
 -----------------------------------------------------------------------------------*/

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { AuthContext } from './authentication/AuthProvider';
import { StyleSheet, View } from 'react-native';
import { AuthStack } from './authentication/AuthStack';
import { StackNavigator } from './stack/StackNavigator';
import LocalStorage from '../app/data/LocalStorage';
import { useContext, useEffect, useState } from 'react';
import User from '../app/models/User';

export const Routes: React.FC = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  const localStorage = LocalStorage.getInstance();
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.getUser().then((user: User | null) => {
      if (user !== null) login();
      setLoading(false);
    });
  }, []);

  if (loading) {
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <StackNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
