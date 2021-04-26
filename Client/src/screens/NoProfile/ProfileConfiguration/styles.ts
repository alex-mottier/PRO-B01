/**
 * @file    styles.ts
 * @author  Alexandre Mottier
 * @date    04.03.2021
 * @brief   Profile configuration page styles
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 320,
    margin: 30,
    paddingTop: 20,
  },
  image: {
    width: '100%',
    marginTop: -10,
    height: 200,
  },
  logo: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 130,
    width: 100,
    height: 100,
    borderRadius: 200,
  },
  fields: {
    width: '100%',
  },
  fields20: {
    width: '27%',
  },
  fields70: {
    width: '70%',
    marginRight:10
  },
  button:{ marginTop: 10},
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  }
});

export default styles;
