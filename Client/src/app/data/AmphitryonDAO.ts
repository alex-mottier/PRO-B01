/**
 * @file    AmphitryonDAO.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    09.04.2021
 * @brief   Amphitryon DAO to retrieve data
 */

import axios, { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import Globals from '../context/Globals';
import { Filter, Meeting, Message, User } from '../models/ApplicationTypes';

export default class AmphitryonDAO {
  private static instance: AmphitryonDAO = new AmphitryonDAO();

  private sessionToken = '';
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
   * Set the user session token
   * @param token of the user session
   */
  public setSessionToken(token: string): void {
    this.sessionToken = token;
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
      url: '/signUpStudent',
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
      url: '/connect',
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
   * @returns if the meeting has been successfully added or null
   */
  async createMeeting(meeting: Meeting): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'POST',
      url: '/',
      headers: this.sessionToken,
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

  /**
   * Update a meeting
   * @param meeting to update
   * @returns if the meeting has been successfully updated or null
   */
  async updateMeeting(meeting: Meeting): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'PATCH',
      url: '/',
      headers: this.sessionToken,
      data: meeting,
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors de la mise à jour de la réunion');
        return null;
      });
  }

  /**
   * Delete a meeting
   * @param meeting to delete
   * @returns if the meeting has been successfully deleted or null
   */
  async deleteMeeting(meeting: Meeting): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'DELETE',
      url: '/',
      headers: this.sessionToken,
      data: meeting,
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors de la suppression la réunion');
        return null;
      });
  }

  /**
   * Load the user's meeting
   * @returns list of meetings
   */
  async loadUserMeetings(): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'GET',
      url: '/',
      headers: this.sessionToken,
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors du chargement de vos réunions');
        return null;
      });
  }

  /**
   * Search a meeting
   * @param meetingID to search
   * @returns list of meetings
   */
  async searchMeetingWithID(meetingID: string): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'GET',
      url: '/',
      headers: this.sessionToken,
      data: { meetingID: meetingID },
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors de la recherche de réunion');
        return null;
      });
  }

  /**
   * Search a meeting
   * @param filter filter
   * @returns list of meetings
   */
  async searchMeeting(filter: Filter): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'GET',
      url: '/',
      headers: this.sessionToken,
      data: filter,
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors de la recherche de réunion');
        return null;
      });
  }

  /**
   * Join a meeting
   * @param meetingID to join
   * @returns if the meeting has been joined by user
   */
  async joinMeeting(meetingID: string): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'POST',
      url: '/',
      headers: this.sessionToken,
      data: meetingID,
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", "Erreur lors de l'inscription");
        return null;
      });
  }

  /**
   * Load chat messages
   * @param chatID to load
   * @returns list of messages
   */
  async loadMessages(chatID: string): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'GET',
      url: '/',
      headers: this.sessionToken,
      data: chatID,
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors de la récupération des messages');
        return null;
      });
  }

  /**
   * Send a message
   * @param message to send
   * @returns if the messages was successfully sent
   */
  async sendMesssage(message: Message): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'POST',
      url: '/',
      headers: this.sessionToken,
      data: message,
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", "Erreur lors de l'envoi du message");
        return null;
      });
  }

  /**
   * Get a location
   * @param locationID to load
   * @returns the location
   */
  async getLocationDetails(locationID: string): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'GET',
      url: '/',
      headers: this.sessionToken,
      data: locationID,
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors du lieu');
        return null;
      });
  }

  /**
   * Get all locations available
   * @param start date of the meeting
   * @param end date of the meeting
   * @returns the location
   */
  async getAllLocations(start: Date, end: Date): Promise<AxiosResponse<string> | null> {
    return await this.restAPI({
      method: 'GET',
      url: '/',
      headers: this.sessionToken,
      data: { start: start, end: end },
    })
      .then((response: AxiosResponse<string>) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors du chargement des lieux');
        return null;
      });
  }
}
