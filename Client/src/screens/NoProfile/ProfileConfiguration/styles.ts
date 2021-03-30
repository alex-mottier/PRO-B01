/**
 * @file    styles.ts
 * @author  Alexandre Mottier
 * @date    09.02.2021
 * @brief   Authentication page styles
 */

import { StyleSheet } from 'react-native';

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
  activate: {
    backgroundColor: 'red',
  },
});

export default styles;
