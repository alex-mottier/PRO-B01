/**
 * @file    stlyes.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Authentication page styles
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  chip: {
    width: 'auto',
    margin: 5,
  },
  chips: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  field: {
    width: '80%',
  },
  card: {
    marginTop: 10,
    width: '100%',
  },
});

export default styles;
