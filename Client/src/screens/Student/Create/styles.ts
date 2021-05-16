/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Meeting creation page styles
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
  date: {
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateHour: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  fab: { marginTop: 20 },
  fields: {
    width: '100%',
  },
  name: {
    width: '75%',
    marginBottom: 10,
  },
  private: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
    width: '25%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default styles;
