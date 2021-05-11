/**
 * @file    Utils.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    11.05.2021
 * @brief   Utils class
 */

import { Alert } from 'react-native';
import Strings from '../context/Strings';

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
}

export default Utils;
