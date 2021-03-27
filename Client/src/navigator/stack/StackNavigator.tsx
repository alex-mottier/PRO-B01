/**
 * @file    StackNavigator.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Stack navigation
 */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Appbar, IconButton, Switch, TouchableRipple, useTheme } from 'react-native-paper';
import { StackNavigatorParamlist } from './StackNavigatorParameters';
import { BottomTabs } from '../bottom-tabs/BottomTabs';
import Globals from '../../app/context/Globals';
import { AuthContext } from '../authentication/AuthProvider';
import { PreferencesContext } from '../../app/context/ContextPreferences';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator<StackNavigatorParamlist>();

export const StackNavigator = (): React.ReactElement => {
  const paperTheme = useTheme();
  const { logout } = React.useContext(AuthContext);
  const { theme, toggleTheme } = React.useContext(PreferencesContext);

  return (
    <Stack.Navigator
      initialRouteName="Main"
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
                <Appbar.BackAction onPress={navigation.goBack} color={Globals.COLORS.PRIMARY} />
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
              {options.headerTitle == Globals.STRINGS.PROFILE && (
                <View style={{ flexDirection: 'row' }}>
                  <Switch
                    value={theme === 'dark'}
                    color={Globals.COLORS.PRIMARY}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onValueChange={toggleTheme}
                  />
                  <IconButton
                    icon={() => (
                      <MaterialCommunityIcons
                        name={Globals.ICONS.LOGOUT}
                        color={Globals.COLORS.PRIMARY}
                        size={Globals.SIZES.ICON_HEADER}
                      />
                    )}
                    color={Globals.COLORS.PRIMARY}
                    size={Globals.SIZES.ICON_BUTTON}
                    onPress={logout}
                  />
                </View>
              )}
            </Appbar.Header>
          );
        },
      }}>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? Globals.STRINGS.APP_NAME;
          return {
            headerTitle: routeName,
          };
        }}
      />
    </Stack.Navigator>
  );
};
