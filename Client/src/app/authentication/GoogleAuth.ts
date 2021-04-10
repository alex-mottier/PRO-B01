/**
 * @file    GoogleAuth.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Authentication with Google
 */

import { authAsync, refreshAsync, revokeAsync } from 'expo-app-auth';
import { User } from '../models/ApplicationTypes';
import LocalStorageDAO from '../../app/data/LocalStorageDAO';

// Google configuration to authenticate users
const config = {
  issuer: 'https://accounts.google.com',
  scopes: ['openid', 'profile'],
  clientId: '298748587556-mpio0261lovc0qkt660nbhgariolp1no.apps.googleusercontent.com',
};

class GoogleAuth {
  private static instance: GoogleAuth = new GoogleAuth();

  /**
   * Private instantiation to apply singleton pattern
   */
  private constructor() {}

  /**
   * Get instance of the singleton local storage class
   * @returns the instance of the local storage class
   */
  public static getInstance(): GoogleAuth {
    return this.instance;
  }

  /**
   * Sign in with Google
   * @returns the user or null if sign in failed
   */
  async handleSignInAsync(): Promise<User | null> {
    try {
      const authState = await authAsync(config);
      const user = { name: 'Username', token: authState };
      await LocalStorageDAO.getInstance().setUser(user);
		console.log(authState);
      return user;
    } catch (e) {
      return null;
    }
  }

  /**
   * Get the cached user and update token if it is expired
   * @returns the user cached with up to date token
   */
  async getCachedAuthAsync(): Promise<User | null> {
    try {
      let user = await LocalStorageDAO.getInstance().getUser();
      if (user) {
        const expirationDate = user.token.accessTokenExpirationDate;
        if (expirationDate && new Date(expirationDate) < new Date())
          user = await this.refreshAuthAsync(user);
        return user;
      }
      return null;
    } catch (e) {
      // action to do if login is errored or canceled
      return null;
    }
  }

  /**
   * Refresh user token when it is expired
   * @param user
   * @returns The updated user
   */
  async refreshAuthAsync(user: User): Promise<User> {
    const token = await refreshAsync(config, JSON.stringify(user.token));
    const newUser = { name: user.name, token: token };
    await LocalStorageDAO.getInstance().setUser(newUser);
    return user;
  }

  /**
   * Action done when the user logs out
   * @param user to sign out
   * @returns Promise when the method is finished
   */
  async handleSignOutAsync(user: User | null): Promise<void> {
    try {
      if (!user) return;
      await revokeAsync(config, {
        token: JSON.stringify(user.token),
        isClientIdProvided: true,
      });
      await LocalStorageDAO.getInstance().removeUser();
    } catch (e) {
      // action to do if login is errored or canceled
    }
  }
}

export default GoogleAuth;
