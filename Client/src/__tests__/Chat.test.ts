/**
 * @file    Chat.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    16.04.2021
 * @brief   Test class of the chat
 */

import { Chat } from '../app/models/ApplicationTypes';

describe('Chat', () => {
  const chat: Chat = {
    id: '#1234',
    messages: [{ id: '#1234', message: 'Hey :)', username: 'developpeur', date: new Date() }],
  };

  it('should create a new chat instance', () => {
    expect(chat).not.toBe(null);
    expect(chat).not.toBe(undefined);
  });

  it('should return its id', () => {
    expect(chat.id).toBe('#1234');
  });

  it('should return its messages', () => {
    expect(chat.messages).not.toBe(null);
    expect(chat.messages.length).toBe(1);
  });
});
