/**
 * @file    styles.ts
 * @author  Alexandre Mottier
 * @date    08.05.2021
 * @brief   Covid data page styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../app/context/Globals';

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    width: '100%',
  },
  cardTitle: {
    color: Globals.COLORS.TEXT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -10,
  },
  gray: {
    color: Globals.COLORS.TEXT,
  },
  icon: {
    marginRight: 10,
  },
  paragraph: {
    maxWidth: '80%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 40,
    marginBottom: 5,
  },
});

export default styles;
