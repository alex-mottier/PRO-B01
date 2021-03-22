/**-----------------------------------------------------------------------------------
 * @file    AuthParamList.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Navigation settings for authentication
 -----------------------------------------------------------------------------------*/

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};
