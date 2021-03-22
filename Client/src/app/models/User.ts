/**-----------------------------------------------------------------------------------
 * @file    User.ts
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   User of the application
 -----------------------------------------------------------------------------------*/

export default class User {
  private name: String;

  /**
   * Instantiation of a new user
   * @param name of the user
   * @throws Error if the name is null of undefined
   */
  public constructor(name: String) {
    if (name === null || name === undefined)
      throw new Error('Name can not be null');

    this.name = name;
  }

  /**
   * Get the user name
   * @returns the user name
   */
  public getName(): String {
    return this.name;
  }
}
