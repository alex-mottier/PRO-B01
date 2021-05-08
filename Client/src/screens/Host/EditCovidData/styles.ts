/**
 * @file    styles.ts
 * @author  Alexandre Mottier
 * @date    08.05.2021
 * @brief   Edit Covid data page styles
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 30,
    paddingTop: 20,
  },
});

export default styles;
