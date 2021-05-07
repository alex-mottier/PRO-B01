import { Host } from '../app/models/ApplicationTypes';

export const mockHost: Host = {
  id: '1',
  name: 'HEIG-VD',
  description: 'Prix Béton !',
  tags: [{ name: 'HES-SO' }, { name: 'HEIG-VD' }],
  address: {
    id: '1',
    street: 'Route de Cheseaux',
    streetNb: '1',
    cityName: 'Yverdon-les-bains',
    npa: '1401',
  },
  covidData: {
    isOpen: true,
    masksRequired: true,
    disinfectionRequired: true,
    recommendedDistancing: '2 mètres',
    comments: 'Commentaire',
  },
};
