/**
 * @file    stlyes.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Authentication page styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../../app/context/Globals';

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: '90%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    backgroundColor: 'white',
    padding: 20,
  },
  fab: {
    marginTop: 10,
    marginLeft: 10,
  },
  fields: {
    width: '80%',
  },
  modal: {
    width: '100%',
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
