/**
 * @file    LocalStorageDAO.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    09.04.2021
 * @brief   Test class of local storage DAO
 */

import LocalStorageDAO from '../app/data/LocalStorageDAO';

describe('LocalStorage DAO', () => {
  it('should return valid instance', () => {
    expect(LocalStorageDAO.getInstance()).not.toBeNull();
    expect(LocalStorageDAO.getInstance()).not.toBeUndefined();
  });
});
