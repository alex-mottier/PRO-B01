/**
 * @file    BottomTabs.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Bottom tabs navigator
 */

import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Globals from '../../app/context/Globals';
import Home from '../../screens/Student/Home/Home';
import Profile from '../../screens/Student/Profile/Profile';
import Search from '../../screens/Student/Search/Search';
import Create from '../../screens/Student/Create/Create';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = (): React.ReactElement => {
  const paperTheme = useTheme();

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={Globals.COLORS.BLUE}
        barStyle={{
          backgroundColor: paperTheme.colors.surface,
        }}>
        <Tab.Screen
          name={Globals.STRINGS.APP_NAME}
          component={Home}
          options={{
            tabBarLabel: 'Accueil',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={Globals.ICONS.HOME}
                color={color}
                size={Globals.SIZES.ICON_MENU}
              />
            ),
          }}
        />
        <Tab.Screen
          name={Globals.STRINGS.CREATE}
          component={Create}
          options={{
            tabBarLabel: 'Créer',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={Globals.ICONS.CREATE}
                color={color}
                size={Globals.SIZES.ICON_MENU}
              />
            ),
          }}
        />
        <Tab.Screen
          name={Globals.STRINGS.SEARCH}
          component={Search}
          options={{
            tabBarLabel: 'Rechercher',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={Globals.ICONS.SEARCH}
                color={color}
                size={Globals.SIZES.ICON_MENU}
              />
            ),
          }}
        />
        <Tab.Screen
          name={Globals.STRINGS.PROFILE}
          component={Profile}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={Globals.ICONS.PROFILE}
                color={color}
                size={Globals.SIZES.ICON_MENU}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};
