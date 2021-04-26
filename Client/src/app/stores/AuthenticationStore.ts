/**
 * @file    AuthenticationStore.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Authentication store
 */

import { TokenResponse } from 'expo-app-auth';
import { action, makeAutoObservable, observable } from 'mobx';
import GoogleAuth from '../authentication/GoogleAuth';
import AmphitryonDAO from '../data/AmphitryonDAO';
import { User } from '../models/ApplicationTypes';
import RootStore from './RootStore';

class AuthenticationStore {
  private static instance: AuthenticationStore;
  private amphitryonDAO = AmphitryonDAO.getInstance();
  private googleAuth = GoogleAuth.getInstance();

  @observable userToken: TokenResponse | null = null;
  @observable authenticatedUser: User | null = null;
  @observable isLoggedIn = false;

  /**
   * Private instantiation of the store to apply singleton pattern
   */
  constructor() {
    AuthenticationStore.instance = this;
    makeAutoObservable(this);
  }

  /**
   * Get store instance
   * @returns the store instance
   */
  public static getInstance(): AuthenticationStore {
    if (!AuthenticationStore.instance) this.instance = new AuthenticationStore();
    return this.instance;
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
  @action getAuthenticatedUser(): User | null {
    return this.authenticatedUser;
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
    RootStore.getInstance().setIsLoading(true);
    const token = await this.googleAuth.handleSignInAsync();
    if (token) {
      this.setUserToken(token);
      RootStore.getInstance().setIsLoading(false);
      return true;
    }
    RootStore.getInstance().setIsLoading(false);
    return false;
  }

  /**
   * Action done when the user logs out
   * @param user to sign out
   * @returns promise when sign out is completed
   */
  @action async signOutWithGoogle(): Promise<void> {
    RootStore.getInstance().setIsLoading(true);
    await this.googleAuth.handleSignOutAsync(this.userToken);
    this.setAuthenticatedUser(null);
    this.setIsLoggedIn(false);
    RootStore.getInstance().setIsLoading(false);
  }

  /**
   * Create a new user
   * @param user to create
   */
  @action async signUp(user: User): Promise<boolean> {
    RootStore.getInstance().setIsLoading(true);
    if (this.userToken?.idToken) {
      const response = await this.amphitryonDAO.createUser(this.userToken.idToken, user);
      if (response) {
        if (response.ok) {
          this.setAuthenticatedUser(await response.json());
          this.setIsLoggedIn(true);
          return true;
        } else {
          void RootStore.getInstance().manageErrorInResponse(response);
        }
      }
      RootStore.getInstance().setIsLoading(false);
    }
    return false;
  }

  /**
   * Sign in method
   */
  @action async signIn(): Promise<boolean> {
    RootStore.getInstance().setIsLoading(true);
    const loggedIn = await this.signInWithGoogle();
    if (loggedIn && this.userToken && this.userToken.idToken) {
      const response = await this.tryToConnect(this.userToken?.idToken);
      if (response) {
        if (response.ok) {
          this.setAuthenticatedUser(await response.json());
          this.setIsLoggedIn(true);
          return true;
        } else {
          void RootStore.getInstance().manageErrorInResponse(response);
        }
      }
    }
    RootStore.getInstance().setIsLoading(false);
    return false;
  }

  @action async tryToConnect(tokenId: string): Promise<Response | null> {
    return await this.amphitryonDAO.connectUser(tokenId);
  }
}

export default AuthenticationStore;
