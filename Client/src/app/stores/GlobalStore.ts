/**
 * @file    GlobalStore.ts
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Global application state store
 */

import { authAsync, refreshAsync, revokeAsync } from 'expo-app-auth';
import { action, makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { User } from '../models/ApplicationTypes';
import LocalStorageDAO from '../../app/data/LocalStorageDAO';

// Google configuration to authenticate users
const config = {
  issuer: 'https://accounts.google.com',
  scopes: ['openid', 'profile'],
  clientId: '298748587556-mpio0261lovc0qkt660nbhgariolp1no.apps.googleusercontent.com',
};

class Store {
  theme: 'light' | 'dark' = 'light';
  isLoading = false;
  authenticatedUser: User | null = null;
  isLoggedIn = false;

  /**
   * Instantiation of the store
   */
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Inverting the theme colour
   */
  invertTheme(): void {
    this.theme == 'light' ? 'dark' : 'light';
  }

  /**
   * Set if the application is loading
   * @param isLoading if the application is loading
   */
  setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  /**
   * Set the authenticated user
   * @param userAuthenticated the authenticated user or null
   */
  setAuthenticatedUser(userAuthenticated: User | null): void {
    this.authenticatedUser = userAuthenticated;
  }

  /**
   * Set if the user is logged in
   * @param isLoggedIn if the user is logged in
   */
  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  /**
   * Sign in with Google
   */
  async handleSignInAsync(): Promise<boolean> {
    try {
      const authState = await authAsync(config);
      const user = { name: 'Username', token: authState };
      await LocalStorageDAO.getInstance().setUser(user);
      this.authenticatedUser = user;
      return true;
    } catch (e) {
      return false;
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
      this.authenticatedUser = null;
      this.isLoggedIn = false;
    } catch (e) {
      // action to do if login is errored or canceled
    }
  }
}

export default createContext(new Store());
