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

const Tab = createMaterialBottomTabNavigator();

export const BottomHostTabs = (): React.ReactElement => {
  // Usage of react native paper theme library
  const paperTheme = useTheme();

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Main"
        activeColor={Globals.COLORS.BLUE}
        barStyle={{
          backgroundColor: paperTheme.colors.surface,
        }}>
        <Tab.Screen
          name={Globals.STRINGS.APP_NAME}
          component={Home}
          options={{
            tabBarLabel: 'Accueil',
            tabBarIcon: Globals.ICONS.HOME,
          }}
        />
        <Tab.Screen
          name={Globals.STRINGS.CREATE_LOCATION}
          component={Create}
          options={{
            tabBarLabel: 'Créer',
            tabBarIcon: Globals.ICONS.CREATE,
          }}
        />
        <Tab.Screen
          name={Globals.STRINGS.LOCATIONS}
          component={MyLocations}
          options={{
            tabBarLabel: 'Mes lieux',
            tabBarIcon: Globals.ICONS.LOCATION,
          }}
        />
        <Tab.Screen
          name={Globals.STRINGS.PROFILE}
          component={Profile}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: Globals.ICONS.PROFILE,
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};
