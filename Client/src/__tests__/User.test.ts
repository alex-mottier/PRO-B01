/**
 * @file    User.test.ts
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Test class of users
 */

import { TokenResponse } from 'expo-app-auth';
import User from '../app/models/User';

describe('User', () => {
  const mockToken: TokenResponse = {
    accessToken: '',
    accessTokenExpirationDate: '',
    additionalParameters: null,
    idToken: '',
    refreshToken: '',
    tokenType: '',
  };

  it('should return its name', () => {
    const user = new User('Username', mockToken);
    expect(user.getName()).toBe('Username');
  });

  it('should create a new user instance', () => {
    const user = new User('Username', mockToken);
    expect(user).not.toBe(null);
    expect(user).not.toBe(undefined);
  });
});
