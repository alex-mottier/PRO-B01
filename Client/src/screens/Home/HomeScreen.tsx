/**
 * @file    HomeScreen.tsx
 * @author  Alexis Allemann
 * @date    09.02.2021
 * @brief   Home page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Title>Welcome to amphitryon</Title>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
