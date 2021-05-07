/**
 * @file    Host.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    07.05.2021
 * @brief   Test class of a host
 */

import { Host } from '../app/models/ApplicationTypes';

describe('Host', () => {
  const host: Host = {
    id: '1',
    name: 'HEIG-VD',
    description: 'Prix Béton !',
    tags: [{ name: 'HES-SO' }, { name: 'HEIG-VD' }],
    address: {
      id: '1',
      street: 'Route de Cheseaux',
      streetNb: '1',
      cityName: 'Yverdon-les-bains',
      npa: '1401',
    },
    covidData: {
      isOpen: true,
      masksRequired: true,
      disinfectionRequired: true,
      recommendedDistancing: '2 mètres',
      comments: 'Commentaire',
    },
  };

  it('should return its id', () => {
    expect(host.id).toBe('1');
  });

  it('should return its name', () => {
    expect(host.name).toBe('HEIG-VD');
  });

  it('should return its description', () => {
    expect(host.description).toBe('Prix Béton !');
  });

  it('should return its tags', () => {
    expect(host.tags).not.toBe(null);
    expect(host.tags.length).toBe(2);
  });

  it('should return its address', () => {
    expect(host.address).not.toBe(null);
  });

  it('should return its covid data', () => {
    expect(host.covidData).not.toBe(null);
  });
});
