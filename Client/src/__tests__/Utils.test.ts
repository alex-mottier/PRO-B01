/**
 * @file    Utils.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Util class test
 */

import Utils from '../app/utils/Utils';

describe('Utils', () => {
  it('should return instance', () => {
    expect(Utils.getInstance()).not.toBeNull();
    expect(Utils.getInstance()).not.toBeUndefined();
  });

  it('should generate items correctly', () => {
    const meetings = [
      {
        chatID: '60a28fa4876e696f73671431',
        description: 'Coordination du groupe B01',
        endDate: '2021-05-20T14:55:52.931Z',
        id: '60a28fa4876e696f73671432',
        isPrivate: true,
        locationID: '60a2855e8d3bf55d40e244b6',
        locationName: 'G01',
        maxPeople: 10,
        membersId: ['60a28e4a876e696f73671430'],
        name: 'PRO - Coordination',
        ownerID: '60a28e4a876e696f73671430',
        startDate: '2021-05-20T13:15:52.931Z',
        tags: [
          {
            name: 'PRO',
          },
          {
            name: 'B01',
          },
        ],
      },
      {
        chatID: '60a376e48af2c909e662a160',
        description: 'Coordination PRO groupe B01',
        endDate: '2021-05-18T14:55:48.021Z',
        id: '60a376e48af2c909e662a161',
        isPrivate: false,
        locationID: '60a2855e8d3bf55d40e244b6',
        locationName: 'G01',
        maxPeople: 10,
        membersId: ['60a28e4a876e696f73671430'],
        name: 'PRO - Coordination',
        ownerID: '60a28e4a876e696f73671430',
        startDate: '2021-05-18T13:15:48.021Z',
        tags: [
          {
            name: 'PRO',
          },
          {
            name: 'B01',
          },
        ],
      },
    ];

    const date = new Date('2021-05-18T11:52:49.619Z');

    expect(Utils.getInstance().generateItems(meetings, date)).toStrictEqual({
      '2021-05-18': [
        {
          chatID: '60a376e48af2c909e662a160',
          description: 'Coordination PRO groupe B01',
          endDate: '2021-05-18T14:55:48.021Z',
          id: '60a376e48af2c909e662a161',
          isPrivate: false,
          locationID: '60a2855e8d3bf55d40e244b6',
          locationName: 'G01',
          maxPeople: 10,
          membersId: ['60a28e4a876e696f73671430'],
          name: 'PRO - Coordination',
          ownerID: '60a28e4a876e696f73671430',
          startDate: '2021-05-18T13:15:48.021Z',
          tags: [
            {
              name: 'PRO',
            },
            {
              name: 'B01',
            },
          ],
        },
      ],
      '2021-05-19': [],
      '2021-05-20': [
        {
          chatID: '60a28fa4876e696f73671431',
          description: 'Coordination du groupe B01',
          endDate: '2021-05-20T14:55:52.931Z',
          id: '60a28fa4876e696f73671432',
          isPrivate: true,
          locationID: '60a2855e8d3bf55d40e244b6',
          locationName: 'G01',
          maxPeople: 10,
          membersId: ['60a28e4a876e696f73671430'],
          name: 'PRO - Coordination',
          ownerID: '60a28e4a876e696f73671430',
          startDate: '2021-05-20T13:15:52.931Z',
          tags: [
            {
              name: 'PRO',
            },
            {
              name: 'B01',
            },
          ],
        },
      ],
      '2021-05-21': [],
      '2021-05-22': [],
      '2021-05-23': [],
      '2021-05-24': [],
      '2021-05-25': [],
      '2021-05-26': [],
      '2021-05-27': [],
      '2021-05-28': [],
    });
  });
});
