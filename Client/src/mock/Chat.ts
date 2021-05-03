import { Chat } from '../app/models/ApplicationTypes';

export const mockChat: Chat = {
  id: '1',
  messages: [
    {
      message: 'Hello World',
      username: 'amottier',
      date: '2021-04-20T15:00:00',
    },
    { message: 'Salut, toi !', username: 'Développeur', date: '2021-04-20T15:00:00' },
    { message: 'Salut, vous !', username: 'Roger', date: '2021-04-20T15:00:00' },
    { message: 'Hello', username: 'aallemann', date: '2021-04-20T15:00:00' },
  ],
};
