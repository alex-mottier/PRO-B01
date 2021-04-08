/**
 * @file    SignIn.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Authentication page of the application
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
import GlobalStore from '../../../app/stores/GlobalStore';

const SignIn: React.FC = () => {
  const store = React.useContext(GlobalStore);
  const navigation = useNavigation();

  const handleLogin = () => {
    void store.handleSignInAsync().then((loggedIn: boolean) => {
      store.setIsLoggedIn(loggedIn);
    });
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
            <FacebookButton onPress={() => console.log('todo')} />
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
