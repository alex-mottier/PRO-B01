/**
 * @file    styles.ts
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
  name: { width: '75%', marginBottom: 10 },
  fields: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    marginTop: 10,
    width: '100%',
    padding: 10,
  },
  button: {
    marginTop: 20,
  },
  marginRigth: {
    marginRight: 20,
  },
  marginLeft: {
    marginLeft: 20,
    color: 'gray',
  },
});

export default styles;
