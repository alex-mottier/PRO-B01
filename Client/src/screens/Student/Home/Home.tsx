/**
 * @file    Home.tsx
 * @author  Alexis Allemann
 * @date    09.02.2021
 * @brief   Student home page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';

const Home: React.FC = () => {
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

export default Home;
