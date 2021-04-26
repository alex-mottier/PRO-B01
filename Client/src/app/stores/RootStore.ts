/**
 * @file    RootStore.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Application root store
 */

import { action, makeAutoObservable, observable } from 'mobx';
import { Error } from '../models/ApplicationTypes';
import GoogleAuth from '../authentication/GoogleAuth';
import AmphitryonDAO from '../data/AmphitryonDAO';
import { Alert } from 'react-native';
import AuthenticationStore from './AuthenticationStore';
import StudentStore from './StudentStore';

class RootStore {
  private static instance: RootStore;
  private amphitryonDAO = AmphitryonDAO.getInstance();
  private googleAuth = GoogleAuth.getInstance();

  @observable isLoading = true;

  /**
   * Instantiation of the store
   */
  private constructor() {
    void this.loadTokens();
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
   * Set if the application is loading
   * @param isLoading if the application is loading
   */
  @action setIsLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  /**
   * Gestion des erreurs
   * @param response contenant l'erreur
   */
  async manageErrorInResponse(response: Response): Promise<void> {
    switch (response.status) {
      case 401:
        Alert.alert('Non autorisé', "Vous n'êtes pas autorisé à effectuer cette manipulation");
        break;
      case 403:
        Alert.alert('Interdit', "L'action effectuée est interdite pour l'utilisateur");
        break;
      case 404:
        Alert.alert('Non trouvé', "La ressource demandée n'a pas été trouvée");
        break;
      case 500:
        Alert.alert('Erreur', "Une erreur s'est produite sur le serveur");
        break;
      case 406:
        // eslint-disable-next-line no-case-declarations
        const error: Error = await response.json();
        Alert.alert("Une erreur s'est produite", error.message);
        break;
      default:
        Alert.alert(
          'Erreur inattendue',
          "Une erreur inattendue s'est produite : " + response.status.toString(),
        );
    }
  }

  /**
   * Loading the user's tokens
   */
  @action async loadTokens(): Promise<void> {
    const token = await this.googleAuth.getCachedAuthAsync();
    AuthenticationStore.getInstance().userToken = token;
    if (token && token.idToken) {
      const response = await this.amphitryonDAO.connectUser(token.idToken);
      if (response) {
        if (response.ok) {
          AuthenticationStore.getInstance().setAuthenticatedUser(await response.json());
          AuthenticationStore.getInstance().setIsLoggedIn(true);
          void StudentStore.getInstance().loadUserData();
        }
      }
      // this.setIsLoading(false);
    }
  }
}

export default RootStore;
