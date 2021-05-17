/**
 * @file    GoogleAuth.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Authentication with Google
 */

import { authAsync, refreshAsync, revokeAsync, TokenResponse } from 'expo-app-auth';
import LocalStorageDAO from '../../app/data/LocalStorageDAO';
import Globals from '../context/Globals';

// Google configuration to authenticate users
const config = {
  issuer: 'https://accounts.google.com',
  scopes: ['openid', 'profile'],
  clientId: Globals.URLS.GOOGLE_ID,
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
  async handleSignInAsync(): Promise<TokenResponse | null> {
    try {
      const authState = await authAsync(config);
      await LocalStorageDAO.getInstance().setToken(authState);
      return authState;
    } catch (e) {
      return null;
    }
  }

  /**
   * Get the cached user and update token if it is expired
   * @returns up to date token
   */
  async getCachedAuthAsync(): Promise<TokenResponse | null> {
    try {
      let token = await LocalStorageDAO.getInstance().getToken();
      if (token) {
        const expirationDate = token.accessTokenExpirationDate;
        if (expirationDate && new Date(expirationDate) < new Date())
          token = await this.refreshAuthAsync(token);
        return token;
      }
      return null;
    } catch (e) {
      // action to do if login is errored or canceled
      return null;
    }
  }

  /**
   * Refresh user token when it is expired
   * @param token to refresh
   * @returns The updated token
   */
  async refreshAuthAsync(token: TokenResponse): Promise<TokenResponse> {
    const newToken = await refreshAsync(config, JSON.stringify(token));
    await LocalStorageDAO.getInstance().setToken(newToken);
    return newToken;
  }

  /**
   * Action done when the user logs out
   * @param user to sign out
   * @returns Promise when the method is finished
   */
  async handleSignOutAsync(token: TokenResponse | null): Promise<void> {
    try {
      if (!token) return;
      await revokeAsync(config, {
        token: JSON.stringify(token),
        isClientIdProvided: true,
      });
      await LocalStorageDAO.getInstance().removeToken();
    } catch (e) {
      // action to do if login is errored or canceled
    }
  }
}

export default GoogleAuth;
