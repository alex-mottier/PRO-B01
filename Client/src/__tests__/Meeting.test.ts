/**
 * @file    Meeting.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Test class of meeting
 */

import { Meeting } from '../app/models/ApplicationTypes';

describe('Meeting', () => {
  const meeting: Meeting = {
    id: '#123',
    name: 'PRO - Coordination',
    description: "Réunion pour coordiner l'avancement du projet",
    tags: [{ name: 'PRO' }, { name: 'Coordination' }],
    locationID: '#1234',
    locationName: 'Salle G01',
    nbPeople: 2,
    maxPeople: 5,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    ownerID: '#9876',
    chatID: '#6789',
    isPrivate: true,
    membersID: ['#123', '#456'],
  };

  it('should create a new meeting instance', () => {
    expect(meeting).not.toBe(null);
    expect(meeting).not.toBe(undefined);
  });

  it('should return its id', () => {
    expect(meeting.id).toBe('#123');
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
    expect(meeting.startDate).not.toBeNull();
    expect(meeting.startDate).not.toBeUndefined();
  });

  it('should have an end date', () => {
    expect(meeting.endDate).not.toBeNull();
    expect(meeting.endDate).not.toBeUndefined();
  });

  it('should return its owner id', () => {
    expect(meeting.ownerID).toBe('#9876');
  });

  it('should return its chat id', () => {
    expect(meeting.chatID).toBe('#6789');
  });

  it('should return if it is private', () => {
    expect(meeting.isPrivate).toBe(true);
  });

  it('should return it members id', () => {
    expect(meeting.membersID).not.toBe(true);
    expect(meeting.membersID.length).toBe(2);
  });
});
