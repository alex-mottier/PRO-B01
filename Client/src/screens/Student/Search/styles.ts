/**
 * @file    stlyes.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Authentication page styles
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  fab: {
    marginTop: 10,
    marginLeft: 10,
  },
  fields: {
    width: '80%',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default styles;
