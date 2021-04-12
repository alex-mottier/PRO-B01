/**
 * @file    AmphitryonDAO.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    09.04.2021
 * @brief   Amphitryon DAO to retrieve data
 */

import axios, { AxiosError, AxiosResponse } from 'axios';
import Globals from '../context/Globals';
import { Meeting, Success, User } from '../models/ApplicationTypes';

export default class AmphitryonDAO {
  private static instance: AmphitryonDAO = new AmphitryonDAO();
  private restAPI = axios.create({
    baseURL: Globals.URLS.API_URL,
    timeout: 1000,
  });

  /**
   * Private instantiation to apply singleton pattern
   */
  private constructor() {}

  /**
   * Get instance of the singleton amphitryon DAO class
   * @returns the instance of the amphitryon DAO class
   */
  public static getInstance(): AmphitryonDAO {
    return this.instance;
  }

  /**
   * Create a user
   * @param tokenId of the user
   * @param user to create
   * @returns the session token
   */
  async createUser(tokenId: string, user: User): Promise<AxiosResponse<string> | null> {
    try {
      return await this.restAPI({
        method: 'POST',
        url: Globals.URLS.SIGN_UP_STUDENT,
        data: { userid: user, tokenId: tokenId },
      })
        .then((response: AxiosResponse<string>) => {
          console.log(response);
          return response;
        })
        .catch((error: AxiosError<string>) => {
          console.log(error);
          return null;
        });
    } catch (error) {
      return null;
    }
  }

  /**
   * Connect a user
   * @param tokenId of the user
   * @returns the session token
   */
  async connectUser(tokenId: string): Promise<AxiosResponse<string> | null> {
    try {
      return await this.restAPI({
        method: 'POST',
        url: Globals.URLS.CONNECT,
        data: tokenId,
      })
        .then((response: AxiosResponse<string>) => {
          return response;
        })
        .catch((error: AxiosError<string>) => {
          console.log(error);
          return null;
        });
    } catch (error) {
      return null;
    }
  }

  // FAIRE ENTETES
  async createMeeting(meeting: Meeting): Promise<Success | Error> {
    const success: Success = {
      name: 'success',
      message: 'The meeting has been successfully added',
    };
    try {
      await this.restAPI({
        method: 'post',
        url: Globals.URLS.CREATE_MEETING,
        data: meeting,
      });

      return success;
    } catch (error) {
      return error;
    }
  }
}
