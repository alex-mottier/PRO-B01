/**
 * @file    Theme.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Application themes
 */

import { DarkTheme, DefaultTheme } from 'react-native-paper';
import Globals from './Globals';

// Light theme
export const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Globals.COLORS.PRIMARY,
    background: Globals.COLORS.WHITE,
    onBackground: Globals.COLORS.WHITE,
  },
};

// Dark theme
export const darkTheme = {
  ...DarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    primary: Globals.COLORS.PRIMARY,
  },
};
