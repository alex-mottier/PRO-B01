/**
 * @file    AmphitryonDAO.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    09.04.2021
 * @brief   Amphitryon DAO to retrieve data from API
 */

import { Alert } from 'react-native';
import Globals from '../context/Globals';
import { Filter, Meeting, Message, User } from '../models/ApplicationTypes';

export default class AmphitryonDAO {
  private static instance: AmphitryonDAO = new AmphitryonDAO();
  private sessionToken = '';
  private header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    session_token_amphitryon: this.sessionToken,
  };

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
  async createUser(tokenId: string, user: User): Promise<Response | null> {
    return fetch(Globals.URLS.API_URL + '/signUpStudent', {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify({ tokenID: tokenId, username: user.username }),
    })
      .then((response: Response) => {
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
  async connectUser(tokenId: string): Promise<Response | null> {
    return fetch(Globals.URLS.API_URL + '/login', {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify({ tokenID: tokenId }),
    })
      .then((response: Response) => {
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
  async createMeeting(meeting: Meeting): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/meeting', {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify(meeting),
    })
      .then((response: Response) => {
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
  async updateMeeting(meeting: Meeting): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/meeting', {
      method: 'PATCH',
      headers: this.header,
      body: JSON.stringify(meeting),
    })
      .then((response: Response) => {
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
  async deleteMeeting(meetingID: string): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/meeting/' + meetingID, {
      method: 'DELETE',
      headers: this.header,
    })
      .then((response: Response) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors de la suppression la réunion');
        return null;
      });
  }

  /**
   * Load meetings created by user
   * @returns list of meetings
   */
  async loadMeetingCreatedByUser(): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/getCreatedMeetings', {
      method: 'GET',
      headers: this.header,
    })
      .then((response: Response) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors du chargement de vos réunions');
        return null;
      });
  }

  /**
   * Load user meetings
   * @returns list of meetings
   */
  async loadUserMeetings(startDate: Date, endDate: Date): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/getMyMeetings ', {
      method: 'GET',
      headers: this.header,
      body: JSON.stringify({ startDate: startDate.toISOString(), endDate: endDate.toISOString() }),
    })
      .then((response: Response) => {
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
  async searchMeetingWithID(meetingID: string): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/meeting/' + meetingID, {
      method: 'GET',
      headers: this.header,
    })
      .then((response: Response) => {
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
  async searchMeeting(filter: Filter): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/meetings/filter', {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify(filter),
    })
      .then((response: Response) => {
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
  async joinMeeting(meetingID: string): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/meeting/join/' + meetingID, {
      method: 'POST',
      headers: this.header,
    })
      .then((response: Response) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", "Erreur lors de l'inscription");
        return null;
      });
  }

  /**
   * Leave a meeting
   * @param meetingID to leave
   * @returns if the meeting has been leaved by user
   */
  async leaveMeeting(meetingID: string): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/meeting/leave/' + meetingID, {
      method: 'POST',
      headers: this.header,
    })
      .then((response: Response) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors de la désinscription');
        return null;
      });
  }

  /**
   * Load chat messages
   * @param chatID to load
   * @returns list of messages
   */
  async loadMessages(chatID: string): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/chat/' + chatID, {
      method: 'GET',
      headers: this.header,
    })
      .then((response: Response) => {
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
  async sendMessage(chatId: string, message: Message): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/chat/createMessage/' + chatId, {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify(message),
    })
      .then((response: Response) => {
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
  async getLocationDetails(locationID: string): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/location/' + locationID, {
      method: 'GET',
      headers: this.header,
    })
      .then((response: Response) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors du lieu');
        return null;
      });
  }

  /**
   * Get all locations available
   * @param start date of the meeting (at 00h00)
   * @param end date of the meeting (at 23h59)
   * @returns the location
   */
  async getAllLocations(start: Date, end: Date): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/locations/withDate', {
      method: 'GET',
      headers: this.header,
      body: JSON.stringify({ startDate: start.toISOString(), endDate: end.toISOString() }),
    })
      .then((response: Response) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors du chargement des lieux');
        return null;
      });
  }

  /**
   * Get a host
   * @param hostId to load
   * @returns the host
   */
  async getHostDetails(hostId: string): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/host/' + hostId, {
      method: 'GET',
      headers: this.header,
    })
      .then((response: Response) => {
        return response;
      })
      .catch(() => {
        Alert.alert("Une erreur s'est produite", 'Erreur lors du lieu');
        return null;
      });
  }
}
