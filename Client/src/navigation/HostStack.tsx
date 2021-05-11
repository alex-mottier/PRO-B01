/**
 * @file    HostStack.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    29.04.2021
 * @brief   Stack navigation when host is logged in
 */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, IconButton, Switch, useTheme } from 'react-native-paper';
import { BottomHostTabs } from './BottomHostTabs';
import Globals from '../app/context/Globals';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStores } from '../app/stores/StoresContext';
import Edit from '../screens/Host/Edit/Edit';
import EditHost from '../screens/Host/EditHost/EditHost';
import CovidData from '../screens/Host/EditCovidData/EditCovidData';
import Strings from '../app/context/Strings';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Creating the application stack
const Stack = createStackNavigator();

const HostStack: React.FC = () => {
  // Usage of react native paper theme library
  const paperTheme = useTheme();

  /* Usage of MobX global state store */
  const { themeStore, authenticationStore } = useStores();

  return (
    <Stack.Navigator
      initialRouteName={Globals.NAVIGATION.HOST_HOME}
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
              {options.headerTitle === Strings.PROFILE && (
                <View style={{ flexDirection: 'row' }}>
                  <Switch
                    value={themeStore.theme === 'dark'}
                    color={Globals.COLORS.PRIMARY}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onValueChange={() => themeStore.invertTheme()}
                  />
                  <IconButton
                    icon={Globals.ICONS.LOGOUT}
                    color={Globals.COLORS.PRIMARY}
                    size={Globals.SIZES.ICON_BUTTON}
                    onPress={() => authenticationStore.signOutWithGoogle()}
                  />
                </View>
              )}
            </Appbar.Header>
          );
        },
      }}>
      <Stack.Screen
        name={Globals.NAVIGATION.HOST_HOME}
        component={BottomHostTabs}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? Strings.APP_NAME;
          return {
            headerTitle: routeName,
          };
        }}
      />
      <Stack.Screen
        name={Globals.NAVIGATION.HOST_EDIT_LOCATION}
        component={Edit}
        options={() => {
          return {
            headerTitle: Strings.LOCATION_EDIT,
          };
        }}
      />
      <Stack.Screen
        name={Globals.NAVIGATION.HOST_EDIT_HOST}
        component={EditHost}
        options={() => {
          return {
            headerTitle: Strings.HOST_EDIT,
          };
        }}
      />
      <Stack.Screen
        name={Globals.NAVIGATION.HOST_EDIT_COVID}
        component={CovidData}
        options={() => {
          return {
            headerTitle: Strings.COVID_DATA,
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default observer(HostStack);
