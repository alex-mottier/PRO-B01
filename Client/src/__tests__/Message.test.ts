/**
 * @file    Message.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    16.04.2021
 * @brief   Test class of a message
 */

import { Message } from '../app/models/ApplicationTypes';

describe('Message', () => {
  const message: Message = {
    id: '#1234',
    message: 'Hey :)',
    username: 'developpeur',
    date: new Date().toISOString(),
  };
  it('should create a new chat instance', () => {
    expect(message).not.toBe(null);
    expect(message).not.toBe(undefined);
  });

  it('should return its id', () => {
    expect(message.id).toBe('#1234');
  });

  it('should return its message', () => {
    expect(message.message).toBe('Hey :)');
  });

  it('should return its username', () => {
    expect(message.username).toBe('developpeur');
  });

  it('should return its date', () => {
    expect(message.date).not.toBe(null);
  });
});
