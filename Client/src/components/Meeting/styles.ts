/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Meeting component styles
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  gray: {
    color: Globals.COLORS.TEXT,
  },
  icon: {
    marginRight: 10,
  },
  iconLittle: {
    paddingLeft: 10,
  },
  infoWithIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  nbPeople: {
    width: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paragraph: {
    maxWidth: '80%',
  },
});

export default styles;
