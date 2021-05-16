/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Opening hour styles
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 12,
    marginTop: -10,
    textAlign: 'center',
  },
  card: {
    marginTop: 10,
    width: '100%',
    elevation: 5,
  },
  days: {
    marginRight: 20,
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    paddingRight: 30,
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
});

export default styles;
