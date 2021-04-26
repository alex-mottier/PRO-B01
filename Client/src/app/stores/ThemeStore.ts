/**
 * @file    ThemeStore.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Theme store
 */

import { action, makeAutoObservable, observable } from 'mobx';

class ThemeStore {
  private static instance: ThemeStore;
  @observable theme: 'light' | 'dark' = 'light';

  /**
   * Instantiation of the store
   */
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Get store instance
   * @returns the store instance
   */
  public static getInstance(): ThemeStore {
    if (!ThemeStore.instance) this.instance = new ThemeStore();
    return this.instance;
  }

  /**
   * Inverting the theme colour
   */
  @action invertTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }
}

export default ThemeStore;
