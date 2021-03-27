/**
 * @file    SignIn.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Authentication page of the application
 */

import * as React from 'react';
import { Button, SafeAreaView, ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';
import { AuthContext } from '../../../navigator/authentication/AuthProvider';
import styles from './styles';

const SignIn: React.FC = () => {
  const { login } = React.useContext(AuthContext);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Title>Ecran de connexion</Title>
          <Button title={'Login'} onPress={login} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
