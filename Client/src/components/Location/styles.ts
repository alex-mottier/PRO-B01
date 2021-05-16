/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Location component styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../app/context/Globals';

const styles = StyleSheet.create({
  actions: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginRight: '10%',
    marginLeft: '10%',
    alignItems: 'center',
  },
  arrowUp: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  buttonText: {
    fontSize: 12,
    marginTop: -10,
    textAlign: 'center',
  },
  card: {
    marginTop: 10,
    width: '100%',
    elevation: 5,
  },
  chip: {
    width: 'auto',
    margin: 5,
  },
  chips: {
    marginLeft: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  nbPeople: {
    width: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  gray: {
    color: Globals.COLORS.TEXT,
  },
  infos: { marginRight: 10 },
  iconsRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default styles;
