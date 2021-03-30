/**
 * @file    User.ts
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   User of the application
 */

import { TokenResponse } from 'expo-app-auth';

export default class User {
  private name: string;
  private token: TokenResponse;

  /**
   * Instantiation of a new user
   * @param name of the user
   * @param token of the user
   */
  public constructor(name: string, token: TokenResponse) {
    this.name = name;
    this.token = token;
  }

  /**
   * Get the user name
   * @returns the user name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Get the user token
   * @returns the user token
   */
  public getToken(): TokenResponse {
    return this.token;
  }
}
