/**
 * @file    ProfileConfiguration.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Profile configuration page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';

const ProfileConfiguration: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Title>ProfileConfiguration</Title>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileConfiguration;
