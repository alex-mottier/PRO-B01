/**
 * @file    Home.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student home page
 */

import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../app/stores/StoresContext';
import Calendar from '../../../components/Calendar/Calendar';

const Home: React.FC = () => {
  /* Usage of MobX global state store */
  const { studentStore } = useStores();
  const paperTheme = useTheme();

  return <Calendar store={studentStore} theme={paperTheme} />;
};

export default observer(Home);
