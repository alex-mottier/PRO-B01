/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Meeting creation page styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../../app/context/Globals';

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  fab: { marginTop: 20 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  name: {
    width: '75%',
    marginBottom: 10,
  },
  fields: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    marginTop: 10,
    width: '100%',
    padding: 10,
  },
  button: {
    marginTop: 20,
  },
  marginRigth: {
    marginRight: 20,
  },
  marginLeft: {
    marginLeft: 20,
    color: Globals.COLORS.TEXT,
  },
  private: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    width: '25%',
  },
  date: {
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateHeure: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 12,
    marginTop: -10,
    textAlign: 'center',
  },
});

export default styles;
