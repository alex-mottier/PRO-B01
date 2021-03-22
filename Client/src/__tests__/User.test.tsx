/**
 * @file    User.test.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Test class of users
 */

import User from '../app/models/User';

describe('User', () => {
  it('should return its name', () => {
    const user = new User('Username');
    expect(user.getName()).toBe('Username');
  });

  it('should create a new user instance', () => {
    const user = new User('Username');
    expect(user).not.toBe(null);
    expect(user).not.toBe(undefined);
  });
});
