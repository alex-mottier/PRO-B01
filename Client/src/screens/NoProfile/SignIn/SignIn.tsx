/**
 * @file    SignIn.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    27.03.2021
 * @brief   Sign in page
 */

import * as React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Text, Title } from 'react-native-paper';
import styles from './styles';
import Globals from '../../../app/context/Globals';
import { useNavigation } from '@react-navigation/native';
import FacebookButton from '../../../components/Buttons/FacebookButton';
import GoogleButton from '../../../components/Buttons/GoogleButton';
import CustomButton from '../../../components/Buttons/CustomButton';
import { useStores } from '../../../app/context/storesContext';

const SignIn: React.FC = () => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  /* Usage of MobX global state store */
  const { authenticationStore, studentStore } = useStores();

  const handleLogin = async () => {
    const succeed = await authenticationStore.signIn();
    if (succeed) void studentStore.loadUserData();
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
          <Title>Se connecter avec</Title>
          <Text style={styles.text}>Veuillez choisir une option de connexion</Text>
          <View style={styles.buttons}>
            <FacebookButton onPress={() => {}} />
            <GoogleButton onPress={handleLogin} />
            <CustomButton
              icon={Globals.ICONS.PROFILE}
              color={Globals.COLORS.GRAY}
              onPress={() => navigation.navigate('SignUp')}
              text={"S'inscrire"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
