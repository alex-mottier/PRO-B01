/**
 * @file    Profile.tsx
 * @author  Alexis Allemann
 * @date    09.02.2021
 * @brief   Student profile page
 */

import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Title } from 'react-native-paper';

const Profile: React.FC = () => {
  //   const nav = useNavigation();
  //   React.useEffect(() => {
  //     nav.setOptions({
  //       headerTitle: 'test',
  //       headerRight: () => <Button>Test</Button>,
  //     });
  //   });

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Title>Profile</Title>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
