/**
 * @file    stlyes.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Authentication page styles
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  arrowUp: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginRight: '10%',
    marginLeft: '10%',
    alignItems: 'center',
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
  infoWithIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
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
  gray: {
    color: 'gray',
  },
  close: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default styles;
