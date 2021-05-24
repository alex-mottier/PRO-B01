/**
 * @file    Home.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    29.04.2021
 * @brief   Host home page
 */

import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../app/stores/StoresContext';
import Calendar from '../../../components/Calendar/Calendar';

const Home: React.FC = () => {
  /* Usage of MobX global state store */
  const { hostStore } = useStores();
  const paperTheme = useTheme();

  return <Calendar store={hostStore} theme={paperTheme} />;
};

export default observer(Home);
