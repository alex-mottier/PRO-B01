/**-----------------------------------------------------------------------------------
 * @file    StackNavigator.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Stack navigation
 -----------------------------------------------------------------------------------*/

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Appbar, useTheme } from 'react-native-paper';
import { StackNavigatorParamlist } from './StackNavigatorParameters';
import { BottomTabs } from '../bottom-tabs/BottomTabs';

const Stack = createStackNavigator<StackNavigatorParamlist>();

export const StackNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName='Main'
      headerMode='screen'
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
            <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
              {previous && (
                <Appbar.BackAction
                  onPress={navigation.goBack}
                  color={'#FFFFFF'}
                />
              )}
              <Appbar.Content
                title={title}
                titleStyle={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#ffffff',
                }}
              />
            </Appbar.Header>
          );
        },
      }}
    >
      <Stack.Screen
        name='Main'
        component={BottomTabs}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Accueil';
          return { headerTitle: routeName };
        }}
      />
    </Stack.Navigator>
  );
};
