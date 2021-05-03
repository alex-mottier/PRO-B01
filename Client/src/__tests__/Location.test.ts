/**
 * @file    Location.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Test class of location
 */

import { Location } from '../app/models/ApplicationTypes';

describe('Location', () => {
  const location: Location = {
    id: '1',
    name: 'G01',
    description: 'Salle de cours avec Wifi',
    tags: [{ name: 'Salle de cours' }, { name: 'HEIG-VD' }],
    nbPeople: 10,
    openingHours: [
      {
        startTime: '2021-04-20T15:00:00',
        endTime: '2021-04-20T16:00:00',
        day: 2,
      },
      {
        startTime: '2021-04-20T15:00:00',
        endTime: '2021-04-20T16:00:00',
        day: 2,
      },
      {
        startTime: '2021-04-20T15:00:00',
        endTime: '2021-04-20T16:00:00',
        day: 2,
      },
    ],
    hostId: '1',
    hostName: 'HEIG-VD',
  };

  it('should create a new location instance', () => {
    expect(location).not.toBe(null);
    expect(location).not.toBe(undefined);
  });

  it('should return its name', () => {
    expect(location.name).toBe('G01');
  });

  it('should return its description', () => {
    expect(location.description).toBe('Salle de cours avec Wifi');
  });

  it('should return its tags', () => {
    expect(location.tags.length).toBe(2);
  });

  it('should return its number of people allowed', () => {
    expect(location.nbPeople).toBe(10);
  });

  it('should return its opening hours', () => {
    expect(location.openingHours).not.toBe(null);
    expect(location.openingHours.length).toBe(3);
  });

  it('should return its host id', () => {
    expect(location.hostId).not.toBe(null);
  });
});
