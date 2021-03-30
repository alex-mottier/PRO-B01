/**
 * @file    LocalStorageDAO.ts
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Local storage of application data
 */

import asyncStorage from '@react-native-async-storage/async-storage';
import User from '../models/User';

export default class LocalStorageDAO {
  private static instance: LocalStorageDAO = new LocalStorageDAO();
  private static storageKey = '@Amphitryon:user';

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
   * Get the user registered
   * @returns user registered or null if user is not found
   */
  getUser = async (): Promise<User | null> => {
    const user = await asyncStorage.getItem(LocalStorageDAO.storageKey);
    return user === null ? null : JSON.parse(user);
  };

  /**
   * Set the registered user
   * @param user the registered user
   * @returns promise when user is registred
   */
  setUser = async (user: User): Promise<void> => {
    return await asyncStorage.setItem(LocalStorageDAO.storageKey, JSON.stringify(user));
  };

  /**
   * Remove the current registered user
   * @returns promise when user is removed
   */
  removeUser = async (): Promise<void> => {
    return await asyncStorage.removeItem(LocalStorageDAO.storageKey);
  };
}
