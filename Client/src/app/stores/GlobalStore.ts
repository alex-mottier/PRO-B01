/**
 * @file    GlobalStore.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Global application state store
 */

import { action, computed, makeAutoObservable, observable } from 'mobx';
import { createContext } from 'react';
import { Meeting, User, Location, Host, Chat } from '../models/ApplicationTypes';
import GoogleAuth from '../authentication/GoogleAuth';
import { TokenResponse } from 'expo-app-auth';
import AmphitryonDAO from '../data/AmphitryonDAO';
import Globals from '../context/Globals';
import { mockMeetings } from '../../mock/Meetings';
import { mockLocation } from '../../mock/Location';
import { mockHost } from '../../mock/Host';
import { mockChat } from '../../mock/Chat';

class Store {
  private amphitryonDAO = AmphitryonDAO.getInstance();
  private googleAuth = GoogleAuth.getInstance();

  @observable theme: 'light' | 'dark' = 'light';
  @observable isLoading = false;
  @observable userToken: TokenResponse | null = null;
  @observable sessionToken: string | null = null;
  @observable authenticatedUser: User | null = null;
  @observable isLoggedIn = false;
  @observable meetingToUpdate: Meeting | null = null;

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
   * Loading the user's tokens
   */
  @action async loadTokens(): Promise<void> {
    this.setIsLoading(true);
    const token = await this.googleAuth.getCachedAuthAsync();
    this.userToken = token;
    if (token && token.idToken) {
      const response = await this.amphitryonDAO.connectUser(token.idToken);
      if (response) {
        const sessionToken = response.headers.get(Globals.STRINGS.SESSION_TOKEN_NAME);
        this.sessionToken = sessionToken;
        this.amphitryonDAO.setSessionToken(sessionToken ? sessionToken : '');
        this.setAuthenticatedUser(await response.json());
        this.setIsLoggedIn(true);
      }
    }
    this.setIsLoading(false);
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
    this.setAuthenticatedUser(null);
    this.setIsLoggedIn(false);
    this.setIsLoading(false);
  }

  /**
   * Create a new user
   * @param user to create
   */
  @action async signUp(user: User): Promise<void> {
    this.setIsLoading(true);
    if (this.userToken?.idToken) {
      const response = await this.amphitryonDAO.createUser(this.userToken.idToken, user);
      if (response) {
        this.sessionToken = response.headers.get(Globals.STRINGS.SESSION_TOKEN_NAME);
        this.setAuthenticatedUser(user);
        this.setIsLoggedIn(true);
      }
    }
    this.setIsLoading(false);
  }

  /**
   * Sign in method
   */
  @action async signIn(): Promise<void> {
    this.setIsLoading(true);
    const loggedIn = await this.signInWithGoogle();
    if (loggedIn && this.userToken && this.userToken.idToken) {
      const response = await this.amphitryonDAO.connectUser(this.userToken?.idToken);
      if (response) {
        this.sessionToken = response.headers.get(Globals.STRINGS.SESSION_TOKEN_NAME);
        this.setAuthenticatedUser(await response.json());
      }
    }
    this.setIsLoading(false);
  }

  /**
   * Set meeting to update
   * @param meeting réunion à mettre à jour
   */
  @action setMeetingToUpdate(meeting: Meeting) {
    this.meetingToUpdate = meeting;
  }

  @computed getMeetingDefaultValues(): Meeting {
    if (this.meetingToUpdate) {
      return this.meetingToUpdate;
    } else
      return {
        name: '',
        description: '',
        tags: [],
        locationID: '',
        locationName: '',
        maxPeople: 0,
        nbPeople: 0,
        start: new Date(),
        end: new Date(),
        ownerID: '',
        chatId: '',
        isPrivate: false,
      };
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

  @action loadMyChat(): Chat {
    return mockChat;
  }
}

export default createContext(new Store());
