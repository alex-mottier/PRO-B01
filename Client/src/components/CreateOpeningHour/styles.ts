/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Tags component styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../app/context/Globals';

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  date: {
    paddingLeft: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dateHour: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  modal: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  openingHours: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: -10,
  },
  openingHoursList: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
    color: Globals.COLORS.BLUE,
  },
});

export default styles;
