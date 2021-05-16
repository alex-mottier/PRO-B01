/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Location creation page styles
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  card: {
    marginTop: 10,
    width: '100%',
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  fab: { marginTop: 20 },
  fields: {
    marginTop: 10,
    width: '100%',
  },
  name: {
    width: '100%',
  },
});

export default styles;
