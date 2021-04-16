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
    locationID: '#1234',
    locationName: 'Salle G01',
    nbPeople: 2,
    maxPeople: 5,
    start: new Date(),
    end: new Date(),
    ownerID: '#9876',
    chatId: '#6789',
    isPrivate: true,
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

  it('should return its location id', () => {
    expect(meeting.locationID).toBe('#1234');
  });

  it('should return its location name', () => {
    expect(meeting.locationName).toBe('Salle G01');
  });

  it('should return its number of people', () => {
    expect(meeting.nbPeople).toBe(2);
  });

  it('should return its max number of people', () => {
    expect(meeting.maxPeople).toBe(5);
  });

  it('should have tags', () => {
    expect(meeting.tags).toHaveLength(2);
  });

  it('should have a start', () => {
    expect(meeting.start).not.toBeNull();
    expect(meeting.start).not.toBeUndefined();
  });

  it('should have an end date', () => {
    expect(meeting.end).not.toBeNull();
    expect(meeting.end).not.toBeUndefined();
  });

  it('should return its owner id', () => {
    expect(meeting.ownerID).toBe('#9876');
  });

  it('should return its chat id', () => {
    expect(meeting.chatId).toBe('#6789');
  });

  it('should return if it is private', () => {
    expect(meeting.isPrivate).toBe(true);
  });
});
