/**
 * @file    SignIn.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    27.03.2021
 * @brief   Sign in page
 */

import * as React from 'react';
import { Alert, Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import styles from './styles';
import Globals from '../../../app/context/Globals';
import { useNavigation } from '@react-navigation/native';
import FacebookButton from '../../../components/Buttons/FacebookButton';
import GoogleButton from '../../../components/Buttons/GoogleButton';
import { useStores } from '../../../app/context/storesContext';
import Strings from '../../../app/context/Strings';

const SignIn: React.FC = () => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  /* Usage of MobX global state store */
  const { authenticationStore } = useStores();

  const handleLogin = async () => {
    await authenticationStore.signIn();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          source={require('../../../../assets/Classroom.jpg')}
          style={styles.image}
          resizeMode="cover"
          blurRadius={1}
        />
        <Image
          source={require('../../../../assets/Logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <View style={styles.container}>
          <Title>{Strings.SIGN_IN_WITH}</Title>
          <Text style={styles.text}>{Strings.SIGN_IN_CHOOSE}</Text>
          <View style={styles.buttons}>
            <FacebookButton
              onPress={() => {
                Alert.alert(Strings.DEVELOPPING);
              }}
            />
            <GoogleButton onPress={handleLogin} />
            <Button
              icon={Globals.ICONS.PROFILE}
              color={Globals.COLORS.GRAY}
              onPress={() => navigation.navigate('SignUp')}>
              {Strings.SIGN_UP}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
