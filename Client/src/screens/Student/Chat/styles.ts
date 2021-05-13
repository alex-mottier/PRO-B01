/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    17.04.2021
 * @brief   Meeting chat page styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../../app/context/Globals';

const styles = StyleSheet.create({
  authenticedUserContainer: {
    alignSelf: 'flex-end',
  },
  authenticedUserMessage: {
    backgroundColor: Globals.COLORS.BLUE,
    width: 'auto',
    marginRight: 20,
    marginBottom: 5,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  authenticedUserMessageText: {
    color: Globals.COLORS.WHITE,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    alignContent: 'space-between',
  },
  dateText: {
    fontSize: 11,
    color: Globals.COLORS.DARK_GRAY,
  },
  fields: { width: '80%' },
  meeting: {
    marginTop: -10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  send: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 20,
    width: '25%',
  },
  userContainer: {
    alignSelf: 'flex-start',
  },
  userDate: {
    marginLeft: 20,
    marginBottom: 20,
  },
  userMessage: {
    backgroundColor: Globals.COLORS.GRAY,
    width: 'auto',
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
});

export default styles;
