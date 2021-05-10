import * as React from 'react';
import AuthenticationStore from '../stores/AuthenticationStore';
import RootStore from '../stores/RootStore';
import StudentStore from '../stores/StudentStore';
import ThemeStore from '../stores/ThemeStore';
import HostStore from '../stores/HostStore';

const storesContext = React.createContext({
  rootStore: RootStore.getInstance(),
  studentStore: StudentStore.getInstance(),
  themeStore: ThemeStore.getInstance(),
  authenticationStore: AuthenticationStore.getInstance(),
  hostStore: HostStore.getInstance(),
});

export const useStores = (): {
  rootStore: RootStore;
  studentStore: StudentStore;
  hostStore: HostStore;
  themeStore: ThemeStore;
  authenticationStore: AuthenticationStore;
} => React.useContext(storesContext);
