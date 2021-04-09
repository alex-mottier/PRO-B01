/**
 * @file    GlobalStore.ts
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Global application state store
 */

import { action, makeAutoObservable, observable } from 'mobx';
import { createContext } from 'react';
import { User } from '../models/ApplicationTypes';
import GoogleAuth from '../authentication/GoogleAuth';

class Store {
  @observable theme: 'light' | 'dark' = 'light';
  @observable isLoading = false;
  @observable authenticatedUser: User | null = null;
  @observable isLoggedIn = false;

  /**
   * Instantiation of the store
   */
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Inverting the theme colour
   */
  @action invertTheme(): void {
    this.theme == 'light' ? 'dark' : 'light';
  }

  /**
   * Set if the application is loading
   * @param isLoading if the application is loading
   */
  @action setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  /**
   * Set the authenticated user
   * @param userAuthenticated the authenticated user or null
   */
  @action setAuthenticatedUser(userAuthenticated: User | null): void {
    this.authenticatedUser = userAuthenticated;
  }

  /**
   * Set if the user is logged in
   * @param isLoggedIn if the user is logged in
   */
  @action setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  /**
   * Sign in with Google
   * @returns promise if user is sucessfully signed in
   */
  @action async signInWithGoogle(): Promise<boolean> {
    return GoogleAuth.getInstance()
      .handleSignInAsync()
      .then((user: User | null) => {
        if (user) {
          this.setAuthenticatedUser(user);
          return true;
        }
        return false;
      });
  }

  /**
   * Action done when the user logs out
   * @param user to sign out
   * @returns promise when sign out is completed
   */
  @action signOutWithGoogle(): Promise<void> {
    this.setIsLoading(true);
    return GoogleAuth.getInstance()
      .handleSignOutAsync(this.authenticatedUser)
      .then(() => {
        this.setAuthenticatedUser(null);
        this.setIsLoggedIn(false);
        this.setIsLoading(false);
      });
  }
}

export default createContext(new Store());
