/**
 * @file    styles.ts
 * @author  Alexis Allemann
 * @date    09.02.2021
 * @brief   Authentication page styles
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttons: {
    width: '100%',
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  icon: {
    alignSelf: 'flex-start',
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
    marginTop: 30,
    marginBottom: 40,
    textAlign: 'center',
  },
});

export default styles;
