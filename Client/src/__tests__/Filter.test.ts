/**
 * @file    Filter.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    16.04.2021
 * @brief   Test class of a filter
 */

import { DayEnum, Filter } from '../app/models/ApplicationTypes';

describe('Filter', () => {
  const filter: Filter = {
    name: 'Filtre',
    startDate: new Date(),
    endDate: new Date(),
    tags: [{ name: 'test1' }, { name: 'test2' }, { name: 'test3' }],
    locations: [
      {
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
      },
    ],
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

  it('should return its locations', () => {
    expect(filter.locations).not.toBe(null);
    expect(filter.locations?.length).toBe(1);
  });
});
