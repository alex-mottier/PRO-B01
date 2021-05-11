/**
 * @file    styles.ts
 * @author  Alexandre Mottier
 * @date    08.05.2021
 * @brief   Covid data page styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../app/context/Globals';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 30,
    paddingTop: 20,
  },
  fields: {
    width: '100%',
    marginBottom: 5,
  },
  button: { marginTop: 20 },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 40,
    marginBottom: 5,
  },
  gray: {
    color: Globals.COLORS.TEXT,
  },
  icon: {
    marginRight: 10,
  },
  paragraph: {
    maxWidth: '80%',
  },
  card: {
    marginTop: 10,
    width: '100%',
  },
  cardTitle: {
    color: Globals.COLORS.TEXT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -10,
  },
});

export default styles;
