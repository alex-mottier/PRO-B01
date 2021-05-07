/**
 * @file    RootStore.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Application root store
 */

import { action, makeAutoObservable, observable } from 'mobx';
import { Error, UserResponse } from '../models/ApplicationTypes';
import { Alert } from 'react-native';
import AuthenticationStore from './AuthenticationStore';
import GoogleAuth from '../authentication/GoogleAuth';
import AmphitryonDAO from '../data/AmphitryonDAO';
import HostStore from './HostStore';
import StudentStore from './StudentStore';

class RootStore {
  private static instance: RootStore;

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
   * Loading the user's tokens
   */
  @action async loadTokens(): Promise<void> {
    const token = await GoogleAuth.getInstance().getCachedAuthAsync();
    AuthenticationStore.getInstance().userToken = token;
    if (token && token.idToken) {
      const response = await AmphitryonDAO.getInstance().connectUser(token.idToken);
      if (response) {
        if (response.ok) {
          const userResponse: UserResponse = await response.json();
          if (userResponse.isStudent) {
            AuthenticationStore.getInstance().setAuthenticatedHost(null);
            AuthenticationStore.getInstance().setAuthenticatedStudent({
              id: userResponse.id,
              username: userResponse.username,
            });
            await StudentStore.getInstance().loadUserData();
          } else {
            AuthenticationStore.getInstance().setAuthenticatedStudent(null);
            const host = await AmphitryonDAO.getInstance().getHostDetails(userResponse.id);
            if (host) {
              if (host.ok) {
                AuthenticationStore.getInstance().setAuthenticatedHost(await host.json());
                await HostStore.getInstance().loadUserData();
              }
            }
          }
          AuthenticationStore.getInstance().setIsLoggedIn(true);
          AuthenticationStore.getInstance().setAuthenticatedStudent(await response.json());
          AuthenticationStore.getInstance().setIsLoggedIn(true);
        }
      }
      // this.setIsLoading(false);
    }
  }

  /**
   * Gestion des erreurs
   * @param response contenant l'erreur
   */
  async manageErrorInResponse(response: Response): Promise<void> {
    const error: Error = await response.json();
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
        Alert.alert("Une erreur s'est produite", error.message);
        break;
      default:
        Alert.alert(
          'Erreur inattendue',
          "Une erreur inattendue s'est produite : " + response.status.toString(),
        );
    }
  }
}

export default RootStore;
