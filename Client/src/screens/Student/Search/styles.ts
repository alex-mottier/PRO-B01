/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Search meeting page styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../../app/context/Globals';

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  date: {
    paddingLeft: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
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
  fab: {
    marginTop: 10,
    marginLeft: 10,
  },
  fields: {
    width: '80%',
  },
  modal: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
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
