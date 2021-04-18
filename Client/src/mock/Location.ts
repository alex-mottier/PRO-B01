import { DayEnum, Location } from '../app/models/ApplicationTypes';

const date = new Date();
const endDate = new Date(date.getHours() + 1);

export const mockLocation: Location = {
  name: 'G01',
  description: 'Salle de cours avec Wifi',
  tags: [{ name: 'Salle de cours' }, { name: 'HEIG-VD' }],
  nbPeople: 10,
  openingHours: [
    {
      id: '1',
      startTime: date,
      endTime: endDate,
      days: [
        { name: 'Lundi', day: DayEnum.MON },
        { name: 'Vendredi', day: DayEnum.FRI },
      ],
    },
    {
      id: '2',
      startTime: date,
      endTime: endDate,
      days: [{ name: 'Samedi', day: DayEnum.SAT }],
    },
    {
      id: '3',
      startTime: date,
      endTime: endDate,
      days: [{ name: 'Dimanche', day: DayEnum.SUN }],
    },
  ],
  host: {
    name: 'HEIG-VD',
    description: 'Prix Béton !',
    tags: [{ name: 'HES-SO' }, { name: 'HEIG-VD' }],
    address: {
      streetName: 'Rue du vieux Port 1',
      city: 'Yverdon-les-bains',
      npa: 1400,
    },
  },
};
