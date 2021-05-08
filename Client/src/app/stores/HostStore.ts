/**
 * @file    HostStore.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    29.04.2021
 * @brief   Host store
 */

import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { Meeting, Location } from '../models/ApplicationTypes';
import AmphitryonDAO from '../data/AmphitryonDAO';
import { addDays, endOfDay, format, startOfDay } from 'date-fns';
import { AgendaItemsMap } from 'react-native-calendars';
import { Alert } from 'react-native';
import RootStore from './RootStore';

class HostStore {
  private static instance: HostStore;
  private amphitryonDAO = AmphitryonDAO.getInstance();
  private dateInCalendar = new Date();

  @observable hostLocations: Location[] = [];
  @observable meetingsLocatedAtHostLocations: Meeting[] | null = null;
  @observable items: AgendaItemsMap<Meeting> | null = null;
  @observable locationToUpdate: Location | null = null;

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
  public static getInstance(): HostStore {
    if (!HostStore.instance) this.instance = new HostStore();
    return this.instance;
  }

  /**
   * Retrieve user data from API
   */
  @action async loadUserData(): Promise<void> {
    await this.loadLocationsCreatedByHost();
    await this.loadMeetingsLocatedAtHostLocations(
      startOfDay(new Date()),
      endOfDay(addDays(new Date(), 10)),
    );
    void this.generateItems(new Date());
  }

  /**
   * Retrieve locations created by host
   */
  @action async loadLocationsCreatedByHost(): Promise<void> {
    const response = await this.amphitryonDAO.getHostLocations();
    if (response) {
      if (response.ok) {
        const locations = await response.json();
        runInAction(() => {
          this.hostLocations = locations;
        });
      } else {
        void RootStore.getInstance().manageErrorInResponse(response);
      }
    }
  }

  /**
   * Retrieve meetings located at host locations
   * @param startDate from date
   * @param endDate to date
   */
  @action async loadMeetingsLocatedAtHostLocations(startDate: Date, endDate: Date): Promise<void> {
    const response = await this.amphitryonDAO.getReservations(startDate, endDate);
    if (response) {
      if (response.ok) {
        void runInAction(async () => {
          this.meetingsLocatedAtHostLocations = await response.json();
        });
      } else {
        void RootStore.getInstance().manageErrorInResponse(response);
      }
    }
  }

  /**
   * Action when a location is updated
   * @param location to update
   */
  @action async updateLocation(location: Location): Promise<void> {
    const response = await this.amphitryonDAO.updateLocation(location);
    if (response) {
      if (response.ok) {
        runInAction(() => {
          if (this.hostLocations) {
            const index = this.hostLocations.findIndex((current: Location) => {
              return current.id == location.id;
            });
            if (index) this.hostLocations[index] = location;
          }
          Alert.alert(
            'Location mise à jour',
            'La location que vous avez soumise a bien été mise à jour',
          );
        });
      } else {
        void RootStore.getInstance().manageErrorInResponse(response);
      }
    }
  }

  /**
   * Action when a location is created
   * @param location to create
   */
  @action async createLocation(location: Location): Promise<void> {
    const response = await this.amphitryonDAO.createLocation(location);
    if (response) {
      if (response.ok) {
        const locationWithId = await response.json();
        void runInAction(() => {
          this.hostLocations.push(locationWithId);
          Alert.alert('Lieu créée', 'Le lieu que vous avez soumis a bien été enregistré');
        });
      } else {
        void RootStore.getInstance().manageErrorInResponse(response);
      }
    }
  }

  /**
   * Action when a location is deleted
   * @param location to delete
   */
  @action async deleteLocation(locationId: string): Promise<void> {
    const response = await this.amphitryonDAO.deleteLocation(locationId);
    if (response) {
      if (response.ok) {
        runInAction(() => {
          if (this.hostLocations)
            this.hostLocations = this.hostLocations.filter((current: Location) => {
              return current.id !== locationId;
            });
          Alert.alert('Supprimée', 'Le lieu a correctement été supprimé');
          this.regenerateItems();
        });
      } else {
        void RootStore.getInstance().manageErrorInResponse(response);
      }
    }
  }

  /**
   * Set location to update
   * @param location lieu à mettre à jour
   */
  @action setLocationToUpdate(location: Location | null): void {
    this.locationToUpdate = location;
  }

  /**
   * Set items in the calendar
   * @param items in the calendard
   */
  @action setItems(items: AgendaItemsMap<Meeting>): void {
    this.items = items;
  }

  /**
   * Generate next 10 days agenda items from a given date
   * @param from date from to generate items
   */
  @action generateItems(from: Date): void {
    this.dateInCalendar = from;
    const nbDays = 10;
    const items = ['{ '];
    for (let i = 0; i <= nbDays; ++i) {
      items.push('"' + format(addDays(from, i), 'yyyy-MM-dd') + '" : [');
      const dayMeetings = this.meetingsLocatedAtHostLocations?.filter((current: Meeting) => {
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
    this.items = JSON.parse(items.join(''));
  }

  /**
   * Regeneration of calendar items
   */
  @action regenerateItems(): void {
    this.generateItems(this.dateInCalendar);
  }
}

export default HostStore;
