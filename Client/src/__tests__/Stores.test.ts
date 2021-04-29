/**
 * @file    Stores.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    26.04.2021
 * @brief   Test class of stores
 */

import AuthenticationStore from '../app/stores/AuthenticationStore';
import RootStore from '../app/stores/RootStore';
import StudentStore from '../app/stores/StudentStore';
import ThemeStore from '../app/stores/ThemeStore';

describe('Stores', () => {
  it('should return an authentication store instance', () => {
    const store = AuthenticationStore.getInstance();
    expect(store).not.toBeNull();
    expect(store).not.toBeUndefined();
  });

  it('should return an root store instance', () => {
    const store = RootStore.getInstance();
    expect(store).not.toBeNull();
    expect(store).not.toBeUndefined();
  });

  it('should return an student store instance', () => {
    const store = StudentStore.getInstance();
    expect(store).not.toBeNull();
    expect(store).not.toBeUndefined();
  });

  it('should return an theme store instance', () => {
    const store = ThemeStore.getInstance();
    expect(store).not.toBeNull();
    expect(store).not.toBeUndefined();
  });
});
