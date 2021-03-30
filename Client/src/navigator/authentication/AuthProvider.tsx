/**
 * @file    AuthProvider.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Handles authentication in the application
 */

import { authAsync, refreshAsync, revokeAsync } from 'expo-app-auth';
import * as React from 'react';
import LocalStorageDAO from '../../app/data/LocalStorageDAO';
import User from '../../app/models/User';

// Google configuration to authenticate users
const config = {
  issuer: 'https://accounts.google.com',
  scopes: ['openid', 'profile'],
  clientId: '298748587556-mpio0261lovc0qkt660nbhgariolp1no.apps.googleusercontent.com',
};

export const AuthProvider: React.FC = ({ children }) => {
  const localStorageDAO = LocalStorageDAO.getInstance();
  const [user, setUser] = React.useState<User | null>(null);

  /**
   * Action when component is loaded
   */
  React.useEffect(() => {
    void (async () => {
      const cachedUser = await getCachedAuthAsync();
      if (cachedUser && !user) setUser(cachedUser);
    })();
  }, []);

  /**
   * Sign in with Google
   */
  const handleSignInAsync = async (): Promise<void> => {
    try {
      const authState = await authAsync(config);
      const user = new User('Username', authState);
      await localStorageDAO.setUser(user);
      setUser(user);
    } catch (e) {
      // action to do if login is errored or canceled
    }
  };

  /**
   * Get the cached user and update token if it is expired
   * @returns the user cached with up to date token
   */
  const getCachedAuthAsync = async (): Promise<User | null> => {
    try {
      let user = await localStorageDAO.getUser();
      if (user) {
        const expirationDate = user.getToken().accessTokenExpirationDate;
        if (expirationDate && new Date(expirationDate) < new Date())
          user = await refreshAuthAsync(user);
        return user;
      }
      return null;
    } catch (e) {
      // action to do if login is errored or canceled
      return null;
    }
  };

  /**
   * Refresh user token when it is expired
   * @param user
   * @returns The updated user
   */
  const refreshAuthAsync = async (user: User): Promise<User> => {
    const token = await refreshAsync(config, JSON.stringify(user.getToken()));
    const newUser = new User(user.getName(), token);
    await localStorageDAO.setUser(newUser);
    return user;
  };

  /**
   * Action done when the user logs out
   * @param user to sign out
   * @returns Promise when the method is finished
   */
  const handleSignOutAsync = async (user: User | null): Promise<void> => {
    try {
      if (!user) return;
      await revokeAsync(config, {
        token: JSON.stringify(user.getToken()),
        isClientIdProvided: true,
      });
      await localStorageDAO.removeUser();
      setUser(null);
    } catch (e) {
      // action to do if login is errored or canceled
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: async () => {
          await handleSignInAsync();
        },
        logout: async () => {
          await handleSignOutAsync(user);
        },
      }}>
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
