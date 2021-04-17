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
import { BottomTabs } from './BottomTabs';
import Globals from '../app/context/Globals';
import { View } from 'react-native';
import GlobalStore from '../app/stores/GlobalStore';
import { observer } from 'mobx-react-lite';
import LocationDetails from '../screens/Student/Location/LocationDetails';
import HostDetails from '../screens/Student/Host/HostDetails';

// Parameters of the screens
type StackNavigatorParamlist = {
  Main: undefined;
  Settings: undefined;
  LocationDetails: undefined;
  HostDetails: undefined;
};

// Creating the application stack
const Stack = createStackNavigator<StackNavigatorParamlist>();

const StudentStack: React.FC = () => {
  const paperTheme = useTheme();
  const store = React.useContext(GlobalStore);

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
              {previous && <Appbar.BackAction onPress={navigation.goBack} />}
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
                    value={store.theme === 'dark'}
                    color={Globals.COLORS.PRIMARY}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onValueChange={() => store.invertTheme()}
                  />
                  <IconButton
                    icon={Globals.ICONS.LOGOUT}
                    color={Globals.COLORS.PRIMARY}
                    size={Globals.SIZES.ICON_BUTTON}
                    onPress={() => store.signOutWithGoogle()}
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
    </Stack.Navigator>
  );
};

export default observer(StudentStack);
