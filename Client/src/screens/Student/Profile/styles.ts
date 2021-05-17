/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student profile page styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../../app/context/Globals';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    color: Globals.COLORS.TEXT,
    marginLeft: 20,
    fontSize: 25,
  },
  text: {
    width: '100%',
    color: Globals.COLORS.PRIMARY,
    alignItems: 'flex-start',
    paddingTop: 15,
  },
});

export default styles;
