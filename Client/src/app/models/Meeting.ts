/**
 * @file    Meeting.ts
 * @author  Alexis Allemann
 * @date    08.04.2021
 * @brief   Meeting interface
 */

import Location from './Location';
import Tag from './Tag';

export default interface Meeting {
  name: string;
  description: string;
  tags: Tag[];
  location: Location;
  nbPeople: number;
  start: Date;
  end: Date;
}
