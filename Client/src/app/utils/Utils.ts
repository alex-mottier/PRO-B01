/**
 * @file    Utils.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    11.05.2021
 * @brief   Utils class
 */

import { addDays, format } from 'date-fns';
import { Alert } from 'react-native';
import { AgendaItemsMap } from 'react-native-calendars';
import Strings from '../context/Strings';
import { Meeting } from '../models/ApplicationTypes';

class Utils {
  private static instance: Utils;

  /**
   * Instantiation of the store
   */
  private constructor() {}

  /**
   * Get store instance
   * @returns the store instance
   */
  public static getInstance(): Utils {
    if (!Utils.instance) this.instance = new Utils();
    return this.instance;
  }

  /**
   * Errors management
   * @param response that is errored
   */
  async manageErrorInResponse(response: Response): Promise<void> {
    const error: Error = await response.json();
    switch (response.status) {
      case 401:
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_UNAUTHORIZED);
        break;
      case 403:
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_FORBIDEN);
        break;
      case 404:
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_NOT_FOUND);
        break;
      case 500:
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_SERVER);
        break;
      case 406:
        Alert.alert(Strings.ERROR_OCCURED, error.message);
        break;
      default:
        Alert.alert(Strings.ERROR_OCCURED, Strings.ERROR_UNEXPECTED);
    }
  }

  /**
   * Generated items for calendar view with meetings
   * @param meetings to generate items
   * @param from date from to filter meetings to display
   * @returns items
   */
  generateItems(meetings: Meeting[], from: Date): AgendaItemsMap<Meeting> {
    const nbDays = 10;
    const items = ['{ '];
    for (let i = 0; i <= nbDays; ++i) {
      items.push('"' + format(addDays(from, i), 'yyyy-MM-dd') + '" : [');
      const dayMeetings = meetings.filter((current: Meeting) => {
        return (
          format(new Date(current.startDate), 'yyyy-MM-dd') ===
          format(addDays(from, i), 'yyyy-MM-dd')
        );
      });

      let cpt = 0;
      dayMeetings?.map((current: Meeting) => {
        items.push(JSON.stringify(current));
        cpt++;
        if (cpt !== dayMeetings?.length) items.push(',');
      });
      items.push(']');
      if (i != nbDays) items.push(',');
    }
    items.push(' }');
    return JSON.parse(items.join(''));
  }
}

export default Utils;
