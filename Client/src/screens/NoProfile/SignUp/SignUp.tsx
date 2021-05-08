/**
 * @file    SignUp.tsx
 * @author  Alexandre Mottier
 * @date    27.03.2021
 * @brief   Sign up page
 */

import * as React from 'react';
import { Alert, Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Text, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import Globals from '../../../app/context/Globals';
import GoogleButton from '../../../components/Buttons/GoogleButton';
import CustomButton from '../../../components/Buttons/CustomButton';
import FacebookButton from '../../../components/Buttons/FacebookButton';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../app/context/storesContext';

const SignUp: React.FC = () => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  /* Usage of MobX global state store */
  const { authenticationStore } = useStores();

  /**
   * Sign up button pressed
   */
  const handleSignUp = () => {
    authenticationStore.setIsLoading(true);
    // Try to see if an account already match the selected account
    void authenticationStore.signInWithGoogle().then(async (isLoggedIn: boolean) => {
      if (authenticationStore.userToken && authenticationStore.userToken.idToken) {
        const response = await authenticationStore.tryToConnect(
          authenticationStore.userToken.idToken,
        );

        // If selected email is not assigned to an account
        if (!response || !response.ok) {
          if (isLoggedIn) navigation.navigate('ProfileConfiguration');
        } else {
          Alert.alert(
            'Compte déjà utilisé',
            'Ce compte Google est déjà rattaché à un compte Amphitryon, veuillez vous connecter',
          );
        }
      }
    });
    authenticationStore.setIsLoading(false);
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
            <FacebookButton
              onPress={() => {
                Alert.alert('En développement', 'Fonctionnalité en développement');
              }}
            />
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

export default observer(SignUp);
