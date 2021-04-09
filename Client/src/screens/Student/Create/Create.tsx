/**
 * @file    Create.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    09.02.2021
 * @brief   Student create page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';
import styles from './styles';

const Create: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Title>Create</Title>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
