/**
 * @file    RootNavigator.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Root component of the navigation
 */

import * as React from 'react';
import { AuthProvider } from './authentication/AuthProvider';
import { Routes } from './Routes';

export const RootNavigator = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
