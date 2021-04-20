import { Location } from '../app/models/ApplicationTypes';

export const mockLocation: Location = {
  id: '1',
  name: 'G01',
  description: 'Salle de cours avec Wifi',
  tags: [{ name: 'Salle de cours' }, { name: 'HEIG-VD' }],
  nbPeople: 10,
  openingHours: [
    {
      id: '1',
      startTime: '2021-04-20T15:00:00',
      endTime: '2021-04-20T16:00:00',
      day: 2,
    },
    {
      id: '2',
      startTime: '2021-04-20T15:00:00',
      endTime: '2021-04-20T16:00:00',
      day: 2,
    },
    {
      id: '3',
      startTime: '2021-04-20T15:00:00',
      endTime: '2021-04-20T16:00:00',
      day: 2,
    },
  ],
  hostId: '1',
  hostName: 'HEIG-VD',
};
