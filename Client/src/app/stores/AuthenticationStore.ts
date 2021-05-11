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
import AmphitryonDAO from '../data/AmphitryonDAO';
import { Host, Student, UserResponse } from '../models/ApplicationTypes';
import HostStore from './HostStore';
import RootStore from './RootStore';
import StudentStore from './StudentStore';

class AuthenticationStore {
  private static instance: AuthenticationStore;
  private amphitryonDAO = AmphitryonDAO.getInstance();
  private googleAuth = GoogleAuth.getInstance();

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
  @action getAuthenticatedStudent(): Student | null {
    return this.authenticatedStudent;
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
   * @param userAuthenticated the authenticated host or null
   */
  @action getAuthenticatedHost(): Host | null {
    return this.authenticatedHost;
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
    this.setIsLoading(true);
    const token = await this.googleAuth.handleSignInAsync();
    if (token) {
      this.setUserToken(token);
      this.setIsLoading(false);
      return true;
    }
    this.setIsLoading(false);
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
          return true;
        } else {
          void RootStore.getInstance().manageErrorInResponse(response);
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
  @action async signUpHost(host: Host): Promise<boolean> {
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
          return true;
        } else {
          void RootStore.getInstance().manageErrorInResponse(response);
        }
      }
      this.setIsLoading(false);
    }
    return false;
  }

  /**
   * Sign in method
   */
  @action async signIn(): Promise<boolean> {
    this.setIsLoading(true);
    const loggedIn = await this.signInWithGoogle();
    if (loggedIn && this.userToken && this.userToken.idToken) {
      const response = await this.tryToConnect(this.userToken?.idToken);
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
          this.setIsLoggedIn(true);
          return true;
        } else {
          void RootStore.getInstance().manageErrorInResponse(response);
        }
      }
    }
    this.setIsLoading(false);
    return false;
  }

  @action async tryToConnect(tokenId: string): Promise<Response | null> {
    return await this.amphitryonDAO.connectUser(tokenId);
  }

  /**
   * Loading the user's tokens
   */
  @action async loadTokens(): Promise<void> {
    this.setIsLoading(true);
    const token = await GoogleAuth.getInstance().getCachedAuthAsync();
    this.userToken = token;
    if (token && token.idToken) {
      const response = await AmphitryonDAO.getInstance().connectUser(token.idToken);
      if (response) {
        if (response.ok) {
          const userResponse: UserResponse = await response.json();
          if (userResponse.isStudent) {
            this.setAuthenticatedHost(null);
            this.setAuthenticatedStudent({
              id: userResponse.id,
              username: userResponse.username,
            });
            await StudentStore.getInstance().loadUserData();
            this.setIsLoading(false);
          } else {
            this.setAuthenticatedStudent(null);
            const host = await AmphitryonDAO.getInstance().getHostDetails(userResponse.id);
            if (host) {
              if (host.ok) {
                this.setAuthenticatedHost(await host.json());
                await HostStore.getInstance().loadUserData();
                this.setIsLoading(false);
              } else {
                void RootStore.getInstance().manageErrorInResponse(host);
              }
            } else {
              Alert.alert(
                'Erreur',
                "Une erreur s'est produite lors du chargement de l'utilisateur",
              );
            }
          }
          this.setIsLoggedIn(true);
        } else {
          void RootStore.getInstance().manageErrorInResponse(response);
        }
      } else {
        Alert.alert('Erreur', "Une erreur s'est produite lors du chargement de l'utilisateur");
      }
    }
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
      } else {
        void RootStore.getInstance().manageErrorInResponse(response);
      }
    }
  }
}

export default AuthenticationStore;
