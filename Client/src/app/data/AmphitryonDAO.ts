/**
 * @file    AmphitryonDAO.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    09.04.2021
 * @brief   Amphitryon DAO to retrieve data
 */

import axios from 'axios';
import Globals from '../context/Globals';
import { Meeting, Success } from '../models/ApplicationTypes';

export default class AmphitryonDAO {
  private static instance: AmphitryonDAO = new AmphitryonDAO();

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

  async createMeeting(meeting: Meeting): Promise<Success | Error> {
    const success: Success = {
      name: 'success',
      message: 'The meeting has been successfully added',
    };
    try {
      await axios({
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
