/**
 * @file    Routes.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Routing of application screens
 */

import * as React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { AuthContext } from './authentication/AuthProvider';
import { StyleSheet, View } from 'react-native';
import { AuthStack } from './authentication/AuthStack';
import { StackNavigator } from './stack/StackNavigator';
import LocalStorage from '../app/data/LocalStorage';
import User from '../app/models/User';

export const Routes: React.FC = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  const localStorage = LocalStorage.getInstance();
  const { user, login } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    void localStorage.getUser().then((userRegistered: User | null) => {
      if (userRegistered !== null) login();
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
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