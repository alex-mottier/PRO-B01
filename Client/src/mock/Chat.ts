import { Chat } from '../app/models/ApplicationTypes';

export const mockChat: Chat = {
  id: '1',
  messages: [
    {
      id: '1',
      message: 'Hello World',
      username: 'amottier',
      date: '2021-04-20T15:00:00',
    },
    { id: '2', message: 'Salut, toi !', username: 'Développeur', date: '2021-04-20T15:00:00' },
    { id: '3', message: 'Salut, vous !', username: 'Roger', date: '2021-04-20T15:00:00' },
    { id: '4', message: 'Hello', username: 'aallemann', date: '2021-04-20T15:00:00' },
  ],
};
