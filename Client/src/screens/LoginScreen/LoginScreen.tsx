/**-----------------------------------------------------------------------------------
 * @file    LoginScreen.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Authentication page of the application
 -----------------------------------------------------------------------------------*/

import * as React from 'react';
import { useContext } from 'react';
import { Button, SafeAreaView, ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';
import { AuthContext } from '../../navigator/authentication/AuthProvider';
import styles from './styles';

const LoginScreen: React.FC = () => {
  const { login } = useContext(AuthContext);
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

export default LoginScreen;
