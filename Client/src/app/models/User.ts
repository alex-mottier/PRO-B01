/**
 * @file    User.ts
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   User of the application
 */

export default class User {
  private name: string;

  /**
   * Instantiation of a new user
   * @param name of the user
   */
  public constructor(name: string) {
    this.name = name;
  }

  /**
   * Get the user name
   * @returns the user name
   */
  public getName(): string {
    return this.name;
  }
}
