/**
 * @file    stlyes.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Search component page styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../app/context/Globals';

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: '60%',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  deleteLocation: {
    marginLeft: -5,
  },
  location: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  tags: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: -10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    backgroundColor: 'white',
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
  scrollview: {
    width: '100%',
    height: 300,
  },
  title: {
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
    color: Globals.COLORS.BLUE,
  },
});

export default styles;
