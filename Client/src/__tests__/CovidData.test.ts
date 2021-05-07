/**
 * @file    CovidData.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    07.05.2021
 * @brief   Test class of covid data
 */

import { CovidData } from '../app/models/ApplicationTypes';

describe('Host', () => {
  const covidData: CovidData = {
    isOpen: true,
    masksRequired: true,
    disinfectionRequired: true,
    recommendedDistancing: '2 mètres',
    comments: 'Commentaire',
  };

  it('should return if it is open', () => {
    expect(covidData.isOpen).toBe(true);
  });

  it('should return if masks are required', () => {
    expect(covidData.masksRequired).toBe(true);
  });

  it('should return if disinfection is required', () => {
    expect(covidData.disinfectionRequired).toBe(true);
  });

  it('should return recommended distancing', () => {
    expect(covidData.recommendedDistancing).toBe('2 mètres');
  });

  it('should return comments', () => {
    expect(covidData.comments).toBe('Commentaire');
  });
});
