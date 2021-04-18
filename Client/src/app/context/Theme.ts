/**
 * @file    Theme.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Application themes
 */

import { DefaultTheme as DefaultThemeNavigation } from '@react-navigation/native';
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

export const lightThemeNavigation = {
  ...DefaultThemeNavigation,
  colors: {
    ...DefaultThemeNavigation.colors,
    primary: Globals.COLORS.PRIMARY,
    background: Globals.COLORS.WHITE,
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

// Application colors
export const colors = [
  Globals.COLORS.YELLOW,
  Globals.COLORS.BLUE,
  Globals.COLORS.PINK,
  Globals.COLORS.ORANGE,
  Globals.COLORS.GREEN,
];
