/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Search component styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../app/context/Globals';

const styles = StyleSheet.create({
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
  deleteLocation: {
    marginLeft: -5,
  },
  field: {
    width: '80%',
    marginBottom: 20,
  },
  location: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  locations: {
    padding: 10,
    paddingTop: 0,
    width: '98%',
  },
  modal: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  scrollview: {
    width: '100%',
    height: 300,
  },
  tags: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: -10,
  },
  title: {
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: Globals.COLORS.BLUE,
  },
});

export default styles;
