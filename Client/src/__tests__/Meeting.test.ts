/**
 * @file    Tag.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Test class of meeting
 */

import { Meeting } from '../app/models/ApplicationTypes';

describe('Meeting', () => {
  const meeting: Meeting = {
    name: 'PRO - Coordination',
    description: "Réunion pour coordiner l'avancement du projet",
    tags: [{ name: 'PRO' }, { name: 'Coordination' }],
    location: { name: 'Salle G02', nbPeople: 5 },
    nbPeople: 2,
    start: new Date(),
    end: new Date(),
  };

  it('should create a new meeting instance', () => {
    expect(meeting).not.toBe(null);
    expect(meeting).not.toBe(undefined);
  });

  it('should return its name', () => {
    expect(meeting.name).toBe('PRO - Coordination');
  });

  it('should return its description', () => {
    expect(meeting.description).toBe("Réunion pour coordiner l'avancement du projet");
  });

  it('should have tags', () => {
    expect(meeting.tags).toHaveLength(2);
  });

  it('should contain a location', () => {
    expect(meeting.location).not.toBeNull();
  });

  it('should contain number of people', () => {
    expect(meeting.nbPeople).toBe(2);
  });

  it('should have a start', () => {
    expect(meeting.start).not.toBeNull();
    expect(meeting.start).not.toBeUndefined();
  });

  it('should have an end date', () => {
    expect(meeting.end).not.toBeNull();
    expect(meeting.end).not.toBeUndefined();
  });
});
