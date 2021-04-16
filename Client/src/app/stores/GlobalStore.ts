/**
 * @file    GlobalStore.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Global application state store
 */

import { action, makeAutoObservable, observable } from 'mobx';
import { createContext } from 'react';
import { Meeting, User, Location, Host } from '../models/ApplicationTypes';
import GoogleAuth from '../authentication/GoogleAuth';
import { TokenResponse } from 'expo-app-auth';
import AmphitryonDAO from '../data/AmphitryonDAO';
import Globals from '../context/Globals';
import { mockMeetings } from '../../mock/Meetings';
import { mockLocation } from '../../mock/Location';
import { mockHost } from '../../mock/Host';

class Store {
  private amphitryonDAO = AmphitryonDAO.getInstance();
  private googleAuth = GoogleAuth.getInstance();

  @observable theme: 'light' | 'dark' = 'light';
  @observable isLoading = false;
  @observable userToken: TokenResponse | null = null;
  @observable sessionToken: string | null = null;
  @observable authenticatedUser: User | null = null;
  @observable isLoggedIn = false;

  /**
   * Instantiation of the store
   */
  constructor() {
    void this.loadTokens();
    makeAutoObservable(this);
  }

  /**
   * Inverting the theme colour
   */
  @action invertTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  /**
   * Set if the application is loading
   * @param isLoading if the application is loading
   */
  @action setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  /**
   * Set the user's token
   * @param token user's token
   */
  @action setUserToken(token: TokenResponse | null): void {
    this.userToken = token;
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
   * Loading the user's tokens
   */
  @action async loadTokens(): Promise<void> {
    this.setIsLoading(true);
    const token = await this.googleAuth.getCachedAuthAsync();
    this.userToken = token;
    if (token && token.idToken) {
      void this.amphitryonDAO.connectUser(token.idToken).then((response: Response | null) => {
        if (response) {
          const sessionToken = response.headers.get(Globals.STRINGS.SESSION_TOKEN_NAME);
          this.sessionToken = sessionToken;
          console.log(response);
          this.amphitryonDAO.setSessionToken(sessionToken ? sessionToken : '');
          this.authenticatedUser = response.json;
          this.setIsLoggedIn(true);
        }
      });
    }
    this.setIsLoading(false);
  }

  /**
   * Sign in with Google
   * @returns promise if user is sucessfully signed in
   */
  @action async signInWithGoogle(): Promise<boolean> {
    return this.googleAuth.handleSignInAsync().then((token: TokenResponse | null) => {
      if (token) {
        this.setUserToken(token);
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
    return this.googleAuth.handleSignOutAsync(this.userToken).then(() => {
      this.setAuthenticatedUser(null);
      this.setIsLoggedIn(false);
      this.setIsLoading(false);
    });
  }

  /**
   * Create a new user
   * @param user to create
   */
  @action signUp(user: User): void {
    this.setIsLoading(true);
    if (this.userToken?.idToken) {
      this.amphitryonDAO
        .createUser(this.userToken.idToken, user)
        .then((response: Response | null) => {
          if (response) {
            this.sessionToken = response.headers.get(Globals.STRINGS.SESSION_TOKEN_NAME);
            this.authenticatedUser = user;
            this.setIsLoggedIn(true);
          }
        })
        .catch(() => {});
    }
    this.setIsLoading(false);
  }

  /**
   * Sign in method
   */
  @action signIn(): void {
    this.setIsLoading(true);
    void this.signInWithGoogle().then((loggedIn: boolean) => {
      if (loggedIn && this.userToken && this.userToken.idToken) {
        void this.amphitryonDAO
          .connectUser(this.userToken?.idToken)
          .then((response: Response | null) => {
            if (response) {
              this.sessionToken = response.headers.get(Globals.STRINGS.SESSION_TOKEN_NAME);
              this.authenticatedUser = response.json;
              this.setIsLoggedIn(true);
            }
          });
      }
      this.setIsLoading(false);
    });
  }

  @action loadMyMeetings(): Meeting[] {
    return mockMeetings;
  }

  @action loadMyLocation(): Location {
    return mockLocation;
  }

  @action loadMyHost(): Host {
    return mockHost;
  }
}

export default createContext(new Store());
