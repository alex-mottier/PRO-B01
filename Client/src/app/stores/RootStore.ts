/**
 * @file    RootStore.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Application root store
 */

import { makeAutoObservable } from 'mobx';
import { Error } from '../models/ApplicationTypes';
import { Alert } from 'react-native';
import Strings from '../context/Strings';

class RootStore {
  private static instance: RootStore;

  /**
   * Instantiation of the store
   */
  private constructor() {
    makeAutoObservable(this);
  }

  /**
   * Get store instance
   * @returns the store instance
   */
  public static getInstance(): RootStore {
    if (!RootStore.instance) this.instance = new RootStore();
    return this.instance;
  }

  /**
   * Gestion des erreurs
   * @param response contenant l'erreur
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

export default RootStore;
