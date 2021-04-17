import { Chat } from '../app/models/ApplicationTypes';

export const mockChat: Chat = {
  id: '1',
  messages: [
    {
      id: '1',
      message: 'Hello World',
      username: 'amottier',
      date: new Date(),
    },
    { id: '2', message: 'Salut, toi !', username: 'Développeur', date: new Date() },
    { id: '3', message: 'Salut, vous !', username: 'Roger', date: new Date() },
    { id: '4', message: 'Hello', username: 'aallemann', date: new Date() },
  ],
};
