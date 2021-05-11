/**
 * @file    AuthenticationStackNavigator.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Stack with authentication screens
 */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/NoProfile/SignIn/SignIn';
import Welcome from '../screens/NoProfile/Welcome/Welcome';
import SignUp from '../screens/NoProfile/SignUp/SignUp';
import ProfileConfiguration from '../screens/NoProfile/ProfileConfiguration/ProfileConfiguration';
import { Appbar, IconButton, Switch, useTheme } from 'react-native-paper';
import Globals from '../app/context/Globals';
import Strings from '../app/context/Strings';
import { View } from 'react-native';
import { useStores } from '../app/stores/StoresContext';

// Creating the authentication stack
const Stack = createStackNavigator();

export const AuthenticationStack: React.FC = () => {
  // Usage of react native paper theme library
  const paperTheme = useTheme();

  /* Usage of MobX global state store */
  const { themeStore } = useStores();

  return (
    <Stack.Navigator
      initialRouteName={Globals.NAVIGATION.AUTH_WELCOME}
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title =
            options.headerTitle !== undefined
              ? options.headerTitle
              : options.title !== undefined
              ? options.title
              : scene.route.name;

          return (
            <Appbar.Header
              style={{
                backgroundColor: paperTheme.colors.surface,
                borderBottomColor: Globals.COLORS.PRIMARY,
                borderBottomWidth: 1,
              }}>
              {previous && (
                <IconButton
                  icon={Globals.ICONS.ARROW_LEFT}
                  color={Globals.COLORS.PRIMARY}
                  size={Globals.SIZES.ICON_BUTTON}
                  onPress={navigation.goBack}
                />
              )}
              <Appbar.Content
                title={title}
                titleStyle={{
                  fontSize: 20,
                  color: Globals.COLORS.PRIMARY,
                  textAlign: 'center',
                }}
              />

              <View style={{ flexDirection: 'row' }}>
                <Switch
                  value={themeStore.theme === 'dark'}
                  color={Globals.COLORS.PRIMARY}
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                  onValueChange={() => themeStore.invertTheme()}
                />
              </View>
            </Appbar.Header>
          );
        },
      }}>
      <Stack.Screen
        name={Globals.NAVIGATION.AUTH_WELCOME}
        component={Welcome}
        options={{
          headerTitle: Strings.APP_NAME,
        }}
      />
      <Stack.Screen
        name={Globals.NAVIGATION.AUTH_SIGN_IN}
        component={SignIn}
        options={{
          headerTitle: Strings.SIGN_IN,
        }}
      />
      <Stack.Screen
        name={Globals.NAVIGATION.AUTH_SIGN_UP}
        component={SignUp}
        options={{
          headerTitle: Strings.SIGN_UP,
        }}
      />
      <Stack.Screen
        name={Globals.NAVIGATION.AUTH_PROFILE_CONFIG}
        component={ProfileConfiguration}
        options={{
          headerTitle: Strings.PROFILE_CONFIGURATION,
        }}
      />
    </Stack.Navigator>
  );
};
