/**
 * @file    Create.tsx
 * @author  Alexis Allemann
 * @date    09.02.2021
 * @brief   Student create page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';

const Create: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Title>Create</Title>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
