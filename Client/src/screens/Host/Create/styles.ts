/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Location creation page styles
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
    width: '100%',
  },
  fields: {
    marginTop: 10,
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
  buttonText: {
    fontSize: 12,
    marginTop: -10,
    textAlign: 'center',
  },
});

export default styles;
