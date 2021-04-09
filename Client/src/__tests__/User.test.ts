/**
 * @file    User.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Test class of users
 */

import { TokenResponse } from 'expo-app-auth';

describe('User', () => {
  const mockToken: TokenResponse = {
    accessToken: '',
    accessTokenExpirationDate: '',
    additionalParameters: null,
    idToken: '',
    refreshToken: '',
    tokenType: '',
  };

  it('should create a new user instance', () => {
    const user = { name: 'Username', token: mockToken };
    expect(user).not.toBeNull();
    expect(user).not.toBeUndefined();
  });

  it('should return its name', () => {
    const user = { name: 'Username', token: mockToken };
    expect(user.name).toBe('Username');
  });

  it('should render the token', () => {
    const user = { name: 'Username', token: mockToken };
    expect(user.token).toBe(mockToken);
  });
});
