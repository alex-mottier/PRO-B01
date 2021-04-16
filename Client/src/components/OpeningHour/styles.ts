/**
 * @file    stlyes.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Authentication page styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../app/context/Globals';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    paddingRight: 30,
  },
  card: {
    marginTop: 10,
    width: '100%',
    elevation: 5,
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  days: {
    marginRight: 20,
  },
  hours: {},
});

export default styles;
