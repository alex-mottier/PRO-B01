/**-----------------------------------------------------------------------------------
 * @file    LocalStorage.ts
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Local storage of application data
 -----------------------------------------------------------------------------------*/

import AsyncStorage from '@react-native-community/async-storage';
import User from '../models/User';

export default class LocalStorage {
  private static instance: LocalStorage = new LocalStorage();

  /**
   * Private instantiation to apply singleton pattern
   */
  private constructor() {}

  /**
   * Get instance of the singleton local storage class
   * @returns the instance of the local storage class
   */
  public static getInstance(): LocalStorage {
    return this.instance;
  }

  /**
   * Get the user registered
   * @returns user registered or null if user is not found
   */
  getUser = async (): Promise<User | null> => {
    let user = await AsyncStorage.getItem('user');
    return user === null ? null : JSON.parse(user);
  };

  /**
   * Set the registered user
   * @param user the registered user
   * @returns promise when user is registred
   */
  setUser = async (user: User): Promise<void> => {
    return await AsyncStorage.setItem('user', JSON.stringify(user));
  };

  /**
   * Remove the current registered user
   * @returns promise when user is removed
   */
  removeUser = async (): Promise<void> => {
    return await AsyncStorage.removeItem('user');
  };
}
