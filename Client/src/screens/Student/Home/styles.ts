/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student home page styles
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  meetings: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  meeting: {
    width: '90%',
  },
});

export default styles;
