/**
 * @file    Location.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Test class of location
 */

import { DayEnum, Location } from '../app/models/ApplicationTypes';

describe('Location', () => {
  const location: Location = {
    name: 'G02',
    description: 'Salle de cours avec Wifi',
    tags: [{ name: 'Salle de cours' }, { name: 'HEIG-VD' }],
    nbPeople: 8,
    openingHours: [
      {
        id: '1',
        startTime: new Date(),
        endTime: new Date(),
        days: [{ name: 'Lundi', day: DayEnum.MON }],
      },
      {
        id: '2',
        startTime: new Date(),
        endTime: new Date(),
        days: [{ name: 'Lundi', day: DayEnum.TUE }],
      },
    ],
    host: {
      name: 'HEIG-VD',
      description: 'Prix Béton !',
      tags: [{ name: 'HES-SO' }, { name: 'HEIG-VD' }],
      address: {
        streetName: 'Rue du vieux Port 1',
        city: 'Yverdon-les-bains',
        npa: 1400,
      },
    },
  };

  it('should create a new location instance', () => {
    expect(location).not.toBe(null);
    expect(location).not.toBe(undefined);
  });

  it('should return its name', () => {
    expect(location.name).toBe('G02');
  });

  it('should return its description', () => {
    expect(location.description).toBe('Salle de cours avec Wifi');
  });

  it('should return its tags', () => {
    expect(location.tags.length).toBe(2);
  });

  it('should return its number of people allowed', () => {
    expect(location.nbPeople).toBe(8);
  });

  it('should return its opening hours', () => {
    expect(location.openingHours).not.toBe(null);
    expect(location.openingHours.length).toBe(2);
  });

  it('should return its host', () => {
    expect(location.host).not.toBe(null);
  });
});
