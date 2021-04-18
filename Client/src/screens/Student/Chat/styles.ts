/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    17.04.2021
 * @brief   Meeting chat page styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../../app/context/Globals';

const styles = StyleSheet.create({
  container: {},
  authenticedUserMessage: {
    backgroundColor: Globals.COLORS.BLUE,
    width: 'auto',
    marginRight: 20,
    marginBottom: 5,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
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
  authenticedUserMessageText: {
    color: Globals.COLORS.WHITE,
  },
  authenticedUserContainer: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
  userContainer: {
    display: 'flex',
    alignSelf: 'flex-start',
  },
  userDate: {
    marginLeft: 20,
    marginBottom: 20,
  },
  authenticedUserDate: {},
  dateText: {
    fontSize: 11,
    color: Globals.COLORS.DARK_GRAY,
  },
  userMessageText: {},
  message: {
    display: 'flex',
    flexDirection: 'row',
  },
  messages: {
    display: 'flex',
    alignContent: 'flex-start',
  },
  fields: { width: '80%' },
  private: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 20,
    width: '25%',
  },
});

export default styles;
