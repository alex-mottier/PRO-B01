import { Location } from '../app/models/ApplicationTypes';

const date = new Date();
const endDate = new Date(date.getHours() + 1);

export const mockLocation: Location = {
  id: '123',
  name: 'G01',
  description: 'Salle de cours avec Wifi',
  tags: [{ name: 'Salle de cours' }, { name: 'HEIG-VD' }],
  nbPeople: 10,
  openingHours: [
    {
      startTime: date.toISOString(),
      endTime: endDate.toISOString(),
      day: 1,
    },
    {
      startTime: date.toISOString(),
      endTime: endDate.toISOString(),
      day: 4,
    },
    {
      startTime: date.toISOString(),
      endTime: endDate.toISOString(),
      day: 5,
    },
  ],
  hostId: '#123',
  hostName: 'HEIG-VD',
};
