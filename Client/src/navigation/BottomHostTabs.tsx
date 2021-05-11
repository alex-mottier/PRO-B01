/**
 * @file    BottomHostTabs.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    29.04.2021
 * @brief   Bottom tabs navigator
 */

import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Globals from '../app/context/Globals';
import Home from '../screens/Host/Home/Home';
import Profile from '../screens/Host/Profile/Profile';
import Create from '../screens/Host/Create/Create';
import MyLocations from '../screens/Host/Location/MyLocations';
import { useTheme } from 'react-native-paper';
import Strings from '../app/context/Strings';

const Tab = createMaterialBottomTabNavigator();

export const BottomHostTabs = (): React.ReactElement => {
  // Usage of react native paper theme library
  const paperTheme = useTheme();

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName={Globals.NAVIGATION.HOST_HOME}
        activeColor={Globals.COLORS.BLUE}
        barStyle={{
          backgroundColor: paperTheme.colors.surface,
        }}>
        <Tab.Screen
          name={Globals.NAVIGATION.HOST_HOME}
          component={Home}
          options={{
            tabBarLabel: Strings.APP_NAME,
            tabBarIcon: Globals.ICONS.HOME,
          }}
        />
        <Tab.Screen
          name={Globals.NAVIGATION.HOST_CREATE_LOCATION}
          component={Create}
          options={{
            tabBarLabel: Strings.CREATE,
            tabBarIcon: Globals.ICONS.CREATE,
          }}
        />
        <Tab.Screen
          name={Globals.NAVIGATION.HOST_LOCATIONS}
          component={MyLocations}
          options={{
            tabBarLabel: Strings.MY_LOCATIONS,
            tabBarIcon: Globals.ICONS.LOCATION,
          }}
        />
        <Tab.Screen
          name={Globals.NAVIGATION.HOST_PROFILE}
          component={Profile}
          options={{
            tabBarLabel: Strings.PROFILE,
            tabBarIcon: Globals.ICONS.PROFILE,
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};
