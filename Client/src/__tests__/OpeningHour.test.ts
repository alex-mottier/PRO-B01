/**
 * @file    OpeningHour.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    16.04.2021
 * @brief   Test class of opening hours
 */

import { OpeningHour } from '../app/models/ApplicationTypes';

describe('Opening hour', () => {
  const openingHour: OpeningHour = {
    id: '1',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    day: 0,
  };

  it('should create a new opening hour instance', () => {
    expect(openingHour).not.toBe(null);
    expect(openingHour).not.toBe(undefined);
  });

  it('should return its start time', () => {
    expect(openingHour.startTime).not.toBe(null);
  });

  it('should return its end time', () => {
    expect(openingHour.endTime).not.toBe(null);
  });

  it('should return its day', () => {
    expect(openingHour.day).toBe(0);
  });
});
