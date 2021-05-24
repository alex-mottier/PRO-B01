/**
 * @file    BottomStudentTabs.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Bottom tabs navigator
 */

import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Globals from '../app/context/Globals';
import Home from '../screens/Student/Home/Home';
import Profile from '../screens/Student/Profile/Profile';
import Search from '../screens/Student/Search/Search';
import Create from '../screens/Student/Create/Create';
import { useTheme } from 'react-native-paper';
import Strings from '../app/context/Strings';

const Tab = createMaterialBottomTabNavigator();

export const BottomStudentTabs = (): React.ReactElement => {
  // Usage of react native paper theme library
  const paperTheme = useTheme();

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName={Globals.NAVIGATION.STUDENT_HOME}
        activeColor={Globals.COLORS.BLUE}
        barStyle={{
          backgroundColor: paperTheme.colors.surface,
        }}>
        <Tab.Screen
          name={Globals.NAVIGATION.STUDENT_HOME}
          component={Home}
          options={{
            tabBarLabel: Strings.AGENDA,
            tabBarIcon: Globals.ICONS.HOME,
          }}
        />
        <Tab.Screen
          name={Globals.NAVIGATION.STUDENT_CREATE_MEETING}
          component={Create}
          options={{
            tabBarLabel: Strings.CREATE,
            tabBarIcon: Globals.ICONS.CREATE,
          }}
        />
        <Tab.Screen
          name={Globals.NAVIGATION.STUDENT_SEARCH}
          component={Search}
          options={{
            tabBarLabel: Strings.SEARCH,
            tabBarIcon: Globals.ICONS.SEARCH,
          }}
        />
        <Tab.Screen
          name={Globals.NAVIGATION.STUDENT_PROFILE}
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
