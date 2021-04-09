/**
 * @file    LoadingComponent.tsx
 * @author  Alexis Allemann
 * @date    09.04.2021
 * @brief   Centered loading component
 */

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingComponent: React.FC = () => {
  return <ActivityIndicator animating={true} size={'large'} style={styles.center} />;
};

export default LoadingComponent;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
});
