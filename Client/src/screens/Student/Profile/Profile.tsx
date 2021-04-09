/**
 * @file    Profile.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student profile page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';
import styles from './styles';
import { observer } from 'mobx-react-lite';

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

export default observer(Profile);
