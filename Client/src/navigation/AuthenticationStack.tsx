/**
 * @file    AuthenticationStackNavigator.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Stack with authentication screens
 */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/NoProfile/SignIn/SignIn';
import Welcome from '../screens/NoProfile/Welcome/Welcome';
import SignUp from '../screens/NoProfile/SignUp/SignUp';
import ProfileConfiguration from '../screens/NoProfile/ProfileConfiguration/ProfileConfiguration';
import { Appbar, IconButton, useTheme } from 'react-native-paper';
import Globals from '../app/context/Globals';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Parameters of the screens
type AuthParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ProfileConfiguration: undefined;
};

// Creating the authentication stack
const Stack = createStackNavigator<AuthParamList>();

export const AuthenticationStack: React.FC = () => {
  const paperTheme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
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
                  icon={() => (
                    <MaterialCommunityIcons
                      name={Globals.ICONS.ARROW_LEFT}
                      color={Globals.COLORS.PRIMARY}
                      size={Globals.SIZES.ICON_HEADER}
                    />
                  )}
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
                style={{
                  alignItems: 'center',
                }}
              />
            </Appbar.Header>
          );
        },
      }}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerTitle: Globals.STRINGS.APP_NAME,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTitle: 'Connexion',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: 'Inscription',
        }}
      />
      <Stack.Screen
        name="ProfileConfiguration"
        component={ProfileConfiguration}
        options={{
          headerTitle: 'Configuration du profil',
        }}
      />
    </Stack.Navigator>
  );
};
