import { Host } from '../app/models/ApplicationTypes';

export const mockHost: Host = {
  name: 'HEIG-VD',
  description: 'Prix Béton !',
  tags: [{ name: 'HES-SO' }, { name: 'HEIG-VD' }],
  address: {
    streetName: 'Route de Cheseaux 1',
    city: 'Yverdon-les-bains',
    npa: 1401,
  },
};
