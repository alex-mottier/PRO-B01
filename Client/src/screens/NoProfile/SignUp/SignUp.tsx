/**
 * @file    SignUp.tsx
 * @author  Alexandre Mottier
 * @date    27.03.2021
 * @brief   Sign up page
 */

import * as React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Text, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import Globals from '../../../app/context/Globals';
import GoogleButton from '../../../components/Buttons/GoogleButton';
import CustomButton from '../../../components/Buttons/CustomButton';
import FacebookButton from '../../../components/Buttons/FacebookButton';
import GlobalStore from '../../../app/stores/GlobalStore';

const SignUp: React.FC = () => {
  const store = React.useContext(GlobalStore);
  const navigation = useNavigation();

  const handleSignUp = () => {
    store.setIsLoading(true);
    void store.signInWithGoogle().then((isLoggedIn: boolean) => {
      if (isLoggedIn) navigation.navigate('ProfileConfiguration');
    });
    store.setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
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
          <Title>S&apos;inscrire avec</Title>
          <Text style={styles.text}>Veuillez choisir une option d&apos;inscription</Text>
          <View style={styles.buttons}>
            <FacebookButton onPress={() => navigation.navigate('ProfileConfiguration')} />
            <GoogleButton onPress={handleSignUp} />
            <CustomButton
              icon={Globals.ICONS.PROFILE}
              color={Globals.COLORS.GRAY}
              onPress={() => navigation.navigate('SignIn')}
              text={'Se connecter'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
