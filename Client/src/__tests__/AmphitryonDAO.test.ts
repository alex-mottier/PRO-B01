/**
 * @file    AmphitryonDAO.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    09.04.2021
 * @brief   Test class of Amphitryon DAO
 */

import AmphitryonDAO from '../app/data/AmphitryonDAO';

describe('AmphitryonStorage DAO', () => {
  it('should return valid instance', () => {
    expect(AmphitryonDAO.getInstance()).not.toBeNull();
    expect(AmphitryonDAO.getInstance()).not.toBeUndefined();
  });
});
