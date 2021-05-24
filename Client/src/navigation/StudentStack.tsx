/**
 * @file    StudentStack.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Stack navigation when student is logged in
 */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, IconButton, Switch, useTheme } from 'react-native-paper';
import { BottomStudentTabs } from './BottomStudentTabs';
import Globals from '../app/context/Globals';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';
import LocationDetails from '../screens/Student/Location/LocationDetails';
import HostDetails from '../screens/Student/Host/HostDetails';
import ChatMeeting from '../screens/Student/Chat/ChatMeeting';
import Edit from '../screens/Student/Edit/Edit';
import { useStores } from '../app/stores/StoresContext';
import Strings from '../app/context/Strings';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Creating the application stack
const Stack = createStackNavigator();

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
        name={Globals.NAVIGATION.STUDENT_HOME}
        component={BottomStudentTabs}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? Strings.AGENDA;
          return {
            headerTitle: routeName,
          };
        }}
      />
      <Stack.Screen
        name={Globals.NAVIGATION.STUDENT_LOCATION}
        component={LocationDetails}
        options={() => {
          return {
            headerTitle: Strings.LOCATION_DETAILS,
          };
        }}
      />
      <Stack.Screen
        name={Globals.NAVIGATION.STUDENT_HOST}
        component={HostDetails}
        options={() => {
          return {
            headerTitle: Strings.HOST_DETAILS,
          };
        }}
      />
      <Stack.Screen
        name={Globals.NAVIGATION.STUDENT_CHAT}
        component={ChatMeeting}
        options={() => {
          return {
            headerTitle: Strings.CHAT,
          };
        }}
      />
      <Stack.Screen
        name={Globals.NAVIGATION.STUDENT_EDIT_MEETING}
        component={Edit}
        options={() => {
          return {
            headerTitle: Strings.MEETING_UPDATE,
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default observer(StudentStack);
