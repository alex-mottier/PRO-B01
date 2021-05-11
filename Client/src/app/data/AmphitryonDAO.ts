/**
 * @file    AmphitryonDAO.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    09.04.2021
 * @brief   Amphitryon DAO to retrieve data from API
 */

import { Alert } from 'react-native';
import Globals from '../context/Globals';
import Strings from '../context/Strings';
import { Filter, Host, Location, Meeting, Message, Student } from '../models/ApplicationTypes';

export default class AmphitryonDAO {
  private static instance: AmphitryonDAO = new AmphitryonDAO();
  private headerWithoutSessionToken = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  };
  private headerWithSessionToken = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    session_token_amphitryon: '',
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
  public setSessionTokenFromResponse(response: Response): void {
    const sessionToken = response.headers.get(Globals.STRINGS.SESSION_TOKEN_NAME);
    if (sessionToken)
      this.headerWithSessionToken = {
        Accept: '*/*',
        'Content-Type': 'application/json',
        session_token_amphitryon: sessionToken,
      };
  }

  /**
   * Create a user
   * @param tokenId of the user
   * @param user to create
   * @returns the session token
   */
  async createStudent(tokenId: string, user: Student): Promise<Response | null> {
    return fetch(Globals.URLS.API_URL + '/signUpStudent', {
      method: 'POST',
      headers: this.headerWithoutSessionToken,
      body: JSON.stringify({ tokenID: tokenId, username: user.username }),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_USER_CREATION);
        return null;
      });
  }

  /**
   * Connect a user
   * @param tokenId of the user
   * @returns user response or null if connection failed
   */
  async connectUser(tokenId: string): Promise<Response | null> {
    return fetch(Globals.URLS.API_URL + '/login', {
      method: 'POST',
      headers: this.headerWithoutSessionToken,
      body: JSON.stringify({ tokenID: tokenId }),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_USER_LOGIN);
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
      headers: this.headerWithSessionToken,
      body: JSON.stringify(meeting),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_MEETING_CREATE);
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
      headers: this.headerWithSessionToken,
      body: JSON.stringify(meeting),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_MEETING_UPDATE);
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
      headers: this.headerWithSessionToken,
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_MEETING_DELETE);
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
      headers: this.headerWithSessionToken,
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_USER_GET_CREATED_MEETINGS);
        return null;
      });
  }

  /**
   * Load user meetings
   * @param startDate date from
   * @param endDate date to
   * @returns list of meetings
   */
  async loadUserMeetings(startDate: Date, endDate: Date): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/getMyMeetings ', {
      method: 'POST',
      headers: this.headerWithSessionToken,
      body: JSON.stringify({ endDate: endDate.toISOString(), startDate: startDate.toISOString() }),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_USER_LOAD_MEETINGS);
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
      headers: this.headerWithSessionToken,
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_SEARCH_WITH_ID);
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
      headers: this.headerWithSessionToken,
      body: JSON.stringify(filter),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_SEARCH_WITH_FILER);
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
      headers: this.headerWithSessionToken,
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_MEETING_JOIN);
        return null;
      });
  }

  /**
   * Leave a meeting
   * @param meetingID to leave
   * @returns if the meeting has been leaved by user
   */
  async leaveMeeting(meetingID: string): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/leaveMeeting/' + meetingID, {
      method: 'POST',
      headers: this.headerWithSessionToken,
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_MEETING_LEAVE);
        return null;
      });
  }

  /**
   * Load chat
   * @param chatID to load
   * @returns the chat loaded
   */
  async loadChat(chatID: string): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/chat/' + chatID, {
      method: 'GET',
      headers: this.headerWithSessionToken,
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_CHAT_LOAD);
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
      headers: this.headerWithSessionToken,
      body: JSON.stringify(message),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_CHAT_SEND);
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
      headers: this.headerWithSessionToken,
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_LOCATION_LOAD);
        return null;
      });
  }

  /**
   * Get all locations available
   * @param start date of the meeting (at 00h00)
   * @param end date of the meeting (at 23h59)
   * @param meetingId meeting id
   * @returns the location
   */
  async getAllLocationsAvailable(
    start: Date,
    end: Date,
    meetingId: string | null,
  ): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/locations/withDate', {
      method: 'POST',
      headers: this.headerWithSessionToken,
      body: JSON.stringify({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        meetingID: meetingId,
      }),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_LOCATIONS_LOAD);
        return null;
      });
  }

  /**
   * Get all locations
   * @returns All locations
   */
  async getAllLocations(): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/locations', {
      method: 'GET',
      headers: this.headerWithSessionToken,
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_LOCATIONS_LOAD);
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
      headers: this.headerWithSessionToken,
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_HOST_LOAD);
        return null;
      });
  }

  /** HOST PROFILE */

  /**
   * Create a host
   * @param tokenId of the user
   * @param host to create
   * @returns the session token
   */
  async createHost(tokenId: string, host: Host): Promise<Response | null> {
    return fetch(Globals.URLS.API_URL + '/signUpHost', {
      method: 'POST',
      headers: this.headerWithoutSessionToken,
      body: JSON.stringify({
        tokenID: tokenId,
        name: host.name,
        street: host.address.street,
        streetNb: host.address.streetNb,
        cityName: host.address.cityName,
        npa: host.address.npa,
        description: host.description,
        tags: host.tags,
      }),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_HOST_CREATE);
        return null;
      });
  }

  /**
   * Get host locations
   * @returns host locations
   */
  async getHostLocations(): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/getMyLocations', {
      method: 'GET',
      headers: this.headerWithSessionToken,
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_HOST_LOCATIONS);
        return null;
      });
  }

  /**
   * Create a location
   * @param location to create
   * @returns the location created
   */
  async createLocation(location: Location): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/location', {
      method: 'POST',
      headers: this.headerWithSessionToken,
      body: JSON.stringify(location),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_LOCATION_CREATE);
        return null;
      });
  }

  /**
   * Delete a location
   * @param locationId to delete
   * @returns if the location has been successfully deleted or null
   */
  async deleteLocation(locationId: string): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/location/' + locationId, {
      method: 'DELETE',
      headers: this.headerWithSessionToken,
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_LOCATION_DELETE);
        return null;
      });
  }

  /**
   * Update a location
   * @param location to update
   * @returns if the location has been successfully updated or null
   */
  async updateLocation(location: Location): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/location', {
      method: 'PATCH',
      headers: this.headerWithSessionToken,
      body: JSON.stringify(location),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_LOCATION_UPDATE);
        return null;
      });
  }

  /**
   * Get host reservations
   * @param startDate date from
   * @param endDate date to
   * @returns host reservations
   */
  async getReservations(startDate: Date, endDate: Date): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/getReservations', {
      method: 'POST',
      headers: this.headerWithSessionToken,
      body: JSON.stringify({ endDate: endDate.toISOString(), startDate: startDate.toISOString() }),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_HOST_RESERVATIONS);
        return null;
      });
  }

  /**
   * Update host
   * @param host to update
   * @returns if the host has been successfully updated or null
   */
  async updateHost(host: Host): Promise<Response | null> {
    return await fetch(Globals.URLS.API_URL + '/host', {
      method: 'PATCH',
      headers: this.headerWithSessionToken,
      body: JSON.stringify(host),
    })
      .then((response: Response) => {
        this.setSessionTokenFromResponse(response);
        return response;
      })
      .catch(() => {
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_HOST_UPDATE);
        return null;
      });
  }
}
