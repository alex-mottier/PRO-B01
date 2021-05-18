/**
 * @file    AuthenticationStore.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Authentication store
 */

import { TokenResponse } from 'expo-app-auth';
import { action, makeAutoObservable, observable } from 'mobx';
import { Alert } from 'react-native';
import GoogleAuth from '../authentication/GoogleAuth';
import Strings from '../context/Strings';
import AmphitryonDAO from '../data/AmphitryonDAO';
import { Host, Student, UserResponse } from '../models/ApplicationTypes';
import Utils from '../utils/Utils';
import HostStore from './HostStore';
import StudentStore from './StudentStore';

class AuthenticationStore {
  private static instance: AuthenticationStore;
  private amphitryonDAO = AmphitryonDAO.getInstance();
  private googleAuth = GoogleAuth.getInstance();
  private utils = Utils.getInstance();

  @observable userToken: TokenResponse | null = null;
  @observable authenticatedStudent: Student | null = null;
  @observable authenticatedHost: Host | null = null;
  @observable isLoggedIn = false;
  @observable isLoading = true;

  /**
   * Private instantiation of the store to apply singleton pattern
   */
  constructor() {
    AuthenticationStore.instance = this;
    void this.loadTokens();
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
   * Set if the application is loading
   * @param isLoading if the application is loading
   */
  @action setIsLoading(isLoading: boolean): void {
    console.log('test');
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
  @action setAuthenticatedStudent(userAuthenticated: Student | null): void {
    this.authenticatedStudent = userAuthenticated;
  }

  /**
   * Set the authenticated host
   * @param hostAuthenticated the authenticated host or null
   */
  @action setAuthenticatedHost(hostAuthenticated: Host | null): void {
    this.authenticatedHost = hostAuthenticated;
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
    const token = await this.googleAuth.handleSignInAsync();
    if (token) {
      this.setUserToken(token);
      return true;
    } else {
      this.setIsLoading(false);
      Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_USER_LOGIN);
    }
    return false;
  }

  /**
   * Action done when the user logs out
   * @param user to sign out
   * @returns promise when sign out is completed
   */
  @action async signOutWithGoogle(): Promise<void> {
    this.setIsLoading(true);
    await this.googleAuth.handleSignOutAsync(this.userToken);
    this.setAuthenticatedStudent(null);
    this.setAuthenticatedHost(null);
    this.setIsLoggedIn(false);
    this.setIsLoading(false);
  }

  /**
   * Create a new user
   * @param user to create
   */
  @action async signUpStudent(user: Student): Promise<boolean> {
    this.setIsLoading(true);
    if (this.userToken?.idToken) {
      const response = await this.amphitryonDAO.createStudent(this.userToken.idToken, user);
      if (response) {
        if (response.ok) {
          const userResponse: UserResponse = await response.json();
          this.setAuthenticatedStudent({
            id: userResponse.id,
            username: user.username,
          });
          this.setIsLoggedIn(true);
          this.setIsLoading(false);
          return true;
        } else {
          void this.utils.manageErrorInResponse(response);
        }
      }
      this.setIsLoading(false);
    }
    return false;
  }

  /**
   * Create a new host
   * @param host to create
   */
  @action async signUpHost(host: Host): Promise<void> {
    this.setIsLoading(true);
    if (this.userToken?.idToken) {
      const response = await this.amphitryonDAO.createHost(this.userToken.idToken, host);
      if (response) {
        if (response.ok) {
          const userResponse: UserResponse = await response.json();
          this.setAuthenticatedStudent(null);
          const host = await this.amphitryonDAO.getHostDetails(userResponse.id);
          if (host) {
            if (host.ok) {
              this.setAuthenticatedHost(await host.json());
              this.setIsLoggedIn(true);
            }
          }
          this.setIsLoading(false);
        } else {
          void this.utils.manageErrorInResponse(response);
        }
      }
      this.setIsLoading(false);
    }
  }

  /**
   * Sign in method
   */
  @action async signIn(): Promise<void> {
    this.setIsLoading(true);
    const loggedIn = await this.signInWithGoogle();
    if (loggedIn && this.userToken && this.userToken.idToken) {
      await this.connectUser(this.userToken.idToken);
    }
    this.setIsLoading(false);
  }

  /**
   * Loading the user's tokens
   */
  @action async loadTokens(): Promise<void> {
    const token = await this.googleAuth.getCachedAuthAsync();
    this.userToken = token;
    if (token && token.idToken) {
      await this.connectUser(token.idToken);
    }
  }

  /**
   * Connect user into application
   * @param tokenId to connect user
   */
  @action async connectUser(tokenId: string): Promise<void> {
    const response = await this.amphitryonDAO.connectUser(tokenId);
    if (response) {
      if (response.ok) {
        const userResponse: UserResponse = await response.json();
        if (userResponse.isStudent) {
          this.setAuthenticatedHost(null);
          this.setAuthenticatedStudent({ id: userResponse.id, username: userResponse.username });
          await StudentStore.getInstance().loadUserData();
        } else {
          this.setAuthenticatedStudent(null);
          const host = await this.amphitryonDAO.getHostDetails(userResponse.id);
          if (host) {
            if (host.ok) {
              this.setAuthenticatedHost(await host.json());
              await HostStore.getInstance().loadUserData();
            }
          }
        }
        this.setIsLoading(false);
        this.setIsLoggedIn(true);
      } else {
        void this.utils.manageErrorInResponse(response);
      }
    }
  }

  /**
   * Try to connect user with local stored token
   * @param tokenId store locally
   * @returns the user connected or null
   */
  @action async tryToConnect(tokenId: string): Promise<Response | null> {
    return await this.amphitryonDAO.connectUser(tokenId);
  }

  /**
   * Update host
   * @param host new host value
   */
  @action async updateHost(host: Host): Promise<void> {
    const response = await this.amphitryonDAO.updateHost(host);
    if (response) {
      if (response.ok) {
        this.setAuthenticatedHost(host);
        this.setIsLoading(false);
      } else {
        void this.utils.manageErrorInResponse(response);
      }
    }
  }
}

export default AuthenticationStore;
