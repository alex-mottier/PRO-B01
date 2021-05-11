import * as React from 'react';
import AuthenticationStore from './AuthenticationStore';
import StudentStore from './StudentStore';
import ThemeStore from './ThemeStore';
import HostStore from './HostStore';

const StoresContext = React.createContext({
  studentStore: StudentStore.getInstance(),
  themeStore: ThemeStore.getInstance(),
  authenticationStore: AuthenticationStore.getInstance(),
  hostStore: HostStore.getInstance(),
});

export const useStores = (): {
  studentStore: StudentStore;
  hostStore: HostStore;
  themeStore: ThemeStore;
  authenticationStore: AuthenticationStore;
} => React.useContext(StoresContext);
