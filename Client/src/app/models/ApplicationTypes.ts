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
};

export type OpeningHour = {
  startTime: Date;
  endTime: Date;
  day: Day;
};

export enum Day {
  SUN,
  LUN,
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
};

export type Chat = {
  id: string;
  messages: Message[];
};

export type Message = {
  id: string;
  message: string;
  username: string;
  date: Date;
};

export type Tag = {
  name: string;
};

export type User = {
  name: string;
};

export type Success = {
  name: string;
  message: string;
};

export type Filter = {
  name: string | null;
  startDate: Date | null;
  endDate: Date | null;
  tags: Tag[] | null;
  locations: Location[] | null;
  // hosts: Host[] | null
};
