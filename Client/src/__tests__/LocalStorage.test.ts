/**
 * @file    LocalStorage.test.ts
 * @author  Alexis Allemann
 * @date    26.03.2021
 * @brief   Test class of users
 */

import LocalStorage from '../app/data/LocalStorage';
import User from '../app/models/User';
describe('Local storage', () => {
  const localStorage = LocalStorage.getInstance();

  it('should return an instance', () => {
    expect(localStorage).not.toBe(null);
    expect(localStorage).not.toBe(undefined);
  });

  it('should be able to store user', async () => {
    const user = new User('Username');
    void localStorage.setUser(user);
    const savedUser = await localStorage.getUser();
    expect(savedUser).not.toBe(null);
    expect(savedUser).toBe(user);
  });

  it('should be able to delete user', async () => {
    const user = new User('Username');
    void localStorage.setUser(user);
    await localStorage.removeUser();
    const nullUser = await localStorage.getUser();
    expect(nullUser).not.toBe(null);
  });
});
