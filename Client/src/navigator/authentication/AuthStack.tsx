/**
 * @file    AuthStack.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Stack with authentication screens
 */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamList } from './AuthParamList';
import LoginScreen from '../../screens/LoginScreen/LoginScreen';

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
