/**
 * @file    StudentStack.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Stack navigation when student is logged in
 */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Appbar, IconButton, Switch, useTheme } from 'react-native-paper';
import { BottomStudentTabs } from './BottomStudentTabs';
import Globals from '../app/context/Globals';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import LocationDetails from '../screens/Student/Location/LocationDetails';
import HostDetails from '../screens/Student/Host/HostDetails';
import ChatMeeting from '../screens/Student/Chat/ChatMeeting';
import Edit from '../screens/Student/Edit/Edit';
import { useStores } from '../app/context/storesContext';

// Parameters of the screens
type StackNavigatorParamlist = {
  Main: undefined;
  Settings: undefined;
  LocationDetails: undefined;
  HostDetails: undefined;
  Chat: undefined;
  Edit: undefined;
};

// Creating the application stack
const Stack = createStackNavigator<StackNavigatorParamlist>();

const StudentStack: React.FC = () => {
  // Usage of react native paper theme library
  const paperTheme = useTheme();

  /* Usage of MobX global state store */
  const { themeStore, authenticationStore } = useStores();

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
              {options.headerTitle == Globals.STRINGS.PROFILE && (
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
        name="Main"
        component={BottomStudentTabs}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? Globals.STRINGS.APP_NAME;
          return {
            headerTitle: routeName,
          };
        }}
      />
      <Stack.Screen
        name="LocationDetails"
        component={LocationDetails}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? Globals.STRINGS.APP_NAME;
          return {
            headerTitle: routeName,
          };
        }}
      />
      <Stack.Screen
        name="HostDetails"
        component={HostDetails}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? Globals.STRINGS.APP_NAME;
          return {
            headerTitle: routeName,
          };
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatMeeting}
        options={() => {
          return {
            headerTitle: 'Chat',
          };
        }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={() => {
          return {
            headerTitle: 'Modifier réunion',
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default observer(StudentStack);
