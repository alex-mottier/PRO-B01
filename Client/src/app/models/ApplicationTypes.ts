/**
 * @file    Interfaces.ts
 * @author  Alexis Allemann
 * @date    08.04.2021
 * @brief   Application types for typing
 */

import { TokenResponse } from 'expo-app-auth';

export type Location = {
  name: string;
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
  token: TokenResponse;
};
