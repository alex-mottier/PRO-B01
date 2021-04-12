/**
 * @file    LocalStorageDAO.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Local storage of application data
 */

import asyncStorage from '@react-native-async-storage/async-storage';
import { TokenResponse } from 'expo-app-auth';

export default class LocalStorageDAO {
  private static instance: LocalStorageDAO = new LocalStorageDAO();
  public static readonly publicToken = '@Amphitryon:token';
  public static readonly privateToken = '@Amphitryon:session';

  /**
   * Private instantiation to apply singleton pattern
   */
  private constructor() {}

  /**
   * Get instance of the singleton local storage class
   * @returns the instance of the local storage class
   */
  public static getInstance(): LocalStorageDAO {
    return this.instance;
  }

  /**
   * Get the token saved locally
   * @returns token or null if it does not exist
   */
  getToken = async (): Promise<TokenResponse | null> => {
    const user = await asyncStorage.getItem(LocalStorageDAO.publicToken);
    return user === null ? null : JSON.parse(user);
  };

  /**
   * Set the user token
   * @param token to save locally
   * @returns promise when token is saved
   */
  setToken = async (token: TokenResponse): Promise<void> => {
    return await asyncStorage.setItem(LocalStorageDAO.publicToken, JSON.stringify(token));
  };

  /**
   * Remove the user token
   * @returns promise when token is removed
   */
  removeToken = async (): Promise<void> => {
    return await asyncStorage.removeItem(LocalStorageDAO.publicToken);
  };

  /**
   * Get the session token saved locally
   * @returns session token or null if it does not exist
   */
  getSessionToken = async (): Promise<string | null> => {
    return await asyncStorage.getItem(LocalStorageDAO.privateToken);
  };

  /**
   * Set the user session token
   * @param token to save locally
   * @returns promise when token is saved
   */
  setSessionToken = async (token: string): Promise<void> => {
    return await asyncStorage.setItem(LocalStorageDAO.privateToken, token);
  };

  /**
   * Remove the user session token
   * @returns promise when token is removed
   */
  removeSessionToken = async (): Promise<void> => {
    return await asyncStorage.removeItem(LocalStorageDAO.privateToken);
  };
}
