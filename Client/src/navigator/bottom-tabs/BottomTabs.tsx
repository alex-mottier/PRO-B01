/**
 * @file    BottomTabs.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Bottom tabs navigator
 */

import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../../screens/Home/HomeScreen';
import Globals from '../../app/context/Globals';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor={Globals.COLORS.BLUE}
        barStyle={{
          backgroundColor: Globals.COLORS.WHITE,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
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
      </Tab.Navigator>
    </React.Fragment>
  );
};
