/**
 * @file    Interfaces.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    08.04.2021
 * @brief   Application types for typing
 */

export type Location = {
  name: string;
  desciption: string;
  tags: Tag[];
  nbPeople: number;
};

export type Meeting = {
  name: string;
  description: string;
  tags: Tag[];
  location: Location;
  nbPeople: number;
  start: Date;
  end: Date;
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
