/**
 * @file    AmphitryonDAO.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    09.04.2021
 * @brief   Amphitryon DAO to retrieve data
 */

import axios, { AxiosError, AxiosResponse } from 'axios';
import { Alert } from 'react-native';
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
    return await this.restAPI({
      method: 'POST',
      url: Globals.URLS.SIGN_UP_STUDENT,
      data: { tokenID: tokenId, userName: user.name },
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", "Erreur lors de la création de l 'utilisateur");
        return null;
      });
  }

  /**
   * Connect a user
   * @param tokenId of the user
   * @returns Réponse axios
   */
  async connectUser(tokenId: string): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'POST',
      url: Globals.URLS.CONNECT,
      data: { tokenID: tokenId },
    })
      .then((response: AxiosResponse<string>) => {
        console.log(response);
        return response;
      })
      .catch(() => {
        Alert.alert(
          "Une erreur s'est produite",
          'Erreur lors de la récupération des informations de votre compte',
        );
        return null;
      });
  }

  /**
   * Create a meeting
   * @param meeting to create
   * @returns if the meeting has been successfully added or the error
   */
  async createMeeting(meeting: Meeting): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'post',
      url: Globals.URLS.CREATE_MEETING,
      data: meeting,
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors de la création de la réunion');
        return null;
      });
  }
}
