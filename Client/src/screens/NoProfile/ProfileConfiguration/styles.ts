/**
 * @file    styles.ts
 * @author  Alexandre Mottier
 * @date    09.02.2021
 * @brief   Configuration profile page styles
 */

import { StyleSheet } from 'react-native';
import Globals from '../../../app/context/Globals';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  chip: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  icon: {
    alignSelf: 'flex-start',
  },

  title: {
    textAlign: 'center',
  },
  activate: {
    backgroundColor: Globals.COLORS.DISABLED,
  },
  deactivate: {
    backgroundColor: Globals.COLORS.BLUE,
  },
  formInput: {
    margin: 30,
    padding: 10,
  },
  button: {
    margin: 30,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 250,
  },
  logo: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 80,
    width: 80,
    height: 80,
    borderRadius: 200,
  },
});

export default styles;
