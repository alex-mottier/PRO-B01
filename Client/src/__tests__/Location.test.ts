/**
 * @file    Location.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Test class of location
 */

import { Location } from '../app/models/ApplicationTypes';

describe('Location', () => {
  const location: Location = { name: 'Salle G02', nbPeople: 5 };

  it('should create a new location instance', () => {
    expect(location).not.toBe(null);
    expect(location).not.toBe(undefined);
  });

  it('should return its name', () => {
    expect(location.name).toBe('Salle G02');
  });

  it('should return its number of people allowed', () => {
    expect(location.nbPeople).toBe(5);
  });
});
