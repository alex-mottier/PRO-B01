/**
 * @file    ContextPreferences.ts
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   General preferences (context)
 */

import * as React from 'react';

type PreferencesContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const PreferencesContext = React.createContext<PreferencesContextType>({
  theme: 'light',
  toggleTheme: () => undefined,
});
