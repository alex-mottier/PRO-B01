/**
 * @file    Filter.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    16.04.2021
 * @brief   Test class of a filter
 */

import { Filter } from '../app/models/ApplicationTypes';

describe('Filter', () => {
  const filter: Filter = {
    name: 'Filtre',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    tags: [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }],
    location: {
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
    },
  };

  it('should create a new filter instance', () => {
    expect(filter).not.toBe(null);
    expect(filter).not.toBe(undefined);
  });

  it('should return its name', () => {
    expect(filter.name).not.toBe('#1234');
  });

  it('should return its startDate', () => {
    expect(filter.startDate).not.toBe(null);
  });

  it('should return its endDate', () => {
    expect(filter.endDate).not.toBe(null);
  });

  it('should return its tags', () => {
    expect(filter.tags).not.toBe(null);
    expect(filter.tags?.length).toBe(3);
  });

  it('should return its location', () => {
    expect(filter.location).not.toBe(null);
  });
});
