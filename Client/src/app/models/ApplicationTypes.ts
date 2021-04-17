/**
 * @file    Interfaces.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    08.04.2021
 * @brief   Application types for typing
 */

export type Location = {
  name: string;
  description: string;
  tags: Tag[];
  nbPeople: number;
  openingHours: OpeningHour[];
  host: Host;
};

// TODO : Sujet à modification
export type Host = {
  name: string;
  description: string;
  address: Address;
  tags: Tag[];
};

// TODO : Sujet à modification
export type Address = {
  streetName: string;
  city: string;
  npa: number;
};

export type OpeningHour = {
  id: string;
  startTime: Date;
  endTime: Date;
  days: Day[];
};

export type Day = {
  name: string;
  day: DayEnum;
};

export enum DayEnum {
  SUN,
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT,
}

export type Meeting = {
  name: string;
  description: string;
  tags: Tag[];
  locationID: string;
  locationName: string;
  maxPeople: number;
  nbPeople: number;
  start: Date;
  end: Date;
  ownerID: string;
  chatId: string;
  isPrivate: boolean;
};

export type Chat = {
  id: string;
  messages: Message[];
};

export type Message = {
  id: string;
  message: string;
  username: string | undefined;
  date: Date;
};

export type Tag = {
  name: string;
};

export type User = {
  name: string;
};

export type Filter = {
  name: string | null;
  startDate: Date | null;
  endDate: Date | null;
  tags: Tag[] | null;
  locations: Location[] | null;
};
