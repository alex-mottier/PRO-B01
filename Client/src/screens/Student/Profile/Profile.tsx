/**
 * @file    Profile.tsx
 * @author  Alexis Allemann
 * @date    09.02.2021
 * @brief   Student profile page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Title } from 'react-native-paper';
import styles from './styles';
import { observer } from 'mobx-react-lite';
import GlobalStore from '../../../app/stores/GlobalStore';

const Profile: React.FC = () => {
  const store = React.useContext(GlobalStore);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Title>Profile{store.isLoading ? 'test' : 'abcd'}</Title>
          <Button onPress={() => store.setIsLoading(!store.isLoading)}>Test</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Profile);
