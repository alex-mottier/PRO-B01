/**
 * @file    AuthProvider.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Handles authentication in the application
 */

import * as React from 'react';
import LocalStorage from '../../app/data/LocalStorage';
import User from '../../app/models/User';

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const localStorage = LocalStorage.getInstance();
  return (
    <AuthContext.Provider
      value={{
        user,
        login: async () => {
          const fakeUser = new User('Alexis');
          setUser(fakeUser);
          localStorage.setUser(fakeUser);
        },
        logout: () => {
          setUser(null);
          localStorage.removeUser();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = React.createContext<{
  user: User | null;
  login: () => void;
  logout: () => void;
}>({
  user: null,
  login: () => undefined,
  logout: () => undefined,
});
