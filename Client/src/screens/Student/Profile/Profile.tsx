/**
 * @file    Profile.tsx
 * @author  Alexis Allemann
 * @date    09.02.2021
 * @brief   Student profile page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';
import styles from './styles';

const Profile: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Title>Profile</Title>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
