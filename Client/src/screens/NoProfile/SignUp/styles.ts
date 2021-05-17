/**
 * @file    styles.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    08.04.2021
 * @brief   Sign up page styles
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttons: {
    marginTop: 10,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 250,
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
  text: {
    textAlign: 'center',
  },
});

export default styles;
