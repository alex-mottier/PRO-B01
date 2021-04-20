/**
 * @file    User.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Test class of users
 */

import { User } from '../app/models/ApplicationTypes';

describe('User', () => {
  it('should create a new user instance', () => {
    const user: User = { username: 'Username' };
    expect(user).not.toBeNull();
    expect(user).not.toBeUndefined();
  });

  it('should return its name', () => {
    const user = { name: 'Username' };
    expect(user.name).toBe('Username');
  });
});
