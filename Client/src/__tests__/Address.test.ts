/**
 * @file    Address.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    07.05.2021
 * @brief   Test class of an address
 */

import { Address } from '../app/models/ApplicationTypes';

describe('Host', () => {
  const address: Address = {
    id: '1',
    street: 'Route de Cheseaux',
    streetNb: '1',
    cityName: 'Yverdon-les-bains',
    npa: '1401',
  };

  it('should return its id', () => {
    expect(address.id).toBe('1');
  });

  it('should return its street', () => {
    expect(address.street).toBe('Route de Cheseaux');
  });

  it('should return its street number', () => {
    expect(address.streetNb).toBe('1');
  });

  it('should return its city', () => {
    expect(address.cityName).toBe('Yverdon-les-bains');
  });

  it('should return its npa', () => {
    expect(address.npa).toBe('1401');
  });
});
