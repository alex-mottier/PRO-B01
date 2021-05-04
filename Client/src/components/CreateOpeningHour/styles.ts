/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Tags component styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../app/context/Globals';

const styles = StyleSheet.create({
  dateHeure: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  date: {
    paddingLeft: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  field: {
    width: '80%',
  },
  card: {
    marginTop: 10,
    width: '100%',
  },
  modal: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
    color: Globals.COLORS.BLUE,
  },
  openingHoursList: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  openingHours: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: -10,
  },
});

export default styles;
