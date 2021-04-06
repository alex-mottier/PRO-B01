/**
 * @file    localStorageDAO.test.ts
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Test class of local storage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenResponse } from 'expo-app-auth';
import LocalStorageDAO from '../app/data/LocalStorageDAO';
import User from '../app/models/User';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

describe('local storage DAO', () => {
  const localStorageDAO = LocalStorageDAO.getInstance();
  const mockToken: TokenResponse = {
    accessToken: '',
    accessTokenExpirationDate: '',
    additionalParameters: null,
    idToken: '',
    refreshToken: '',
    tokenType: '',
  };

  it('should return an instance', () => {
    expect(localStorageDAO).not.toBe(null);
    expect(localStorageDAO).not.toBe(undefined);
  });

  it('should be able to set a user', async () => {
    const user = new User('Username', mockToken);
    await localStorageDAO.setUser(user);
    expect(AsyncStorage.setItem).toBeCalledWith(LocalStorageDAO.storageKey, user);
  });
});
