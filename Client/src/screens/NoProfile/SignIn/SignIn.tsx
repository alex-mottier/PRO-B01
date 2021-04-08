/**
 * @file    SignIn.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Authentication page of the application
 */

import * as React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import { AuthContext } from '../../../navigator/authentication/AuthProvider';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Globals from '../../../app/context/Globals';
import { useNavigation } from '@react-navigation/native';

const SignIn: React.FC = () => {
  const { login, setLogin } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogin = () => {
    login()?.then((loggedIn: boolean) => {
      if (loggedIn) {
        setLogin();
      }
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
            <Button
              icon={() => (
                <MaterialCommunityIcons
                  name={Globals.ICONS.FACEBOOK}
                  color={Globals.COLORS.WHITE}
                  size={Globals.SIZES.ICON_HEADER}
                />
              )}
              mode="contained"
              style={styles.buttons}
              color={Globals.COLORS.FACEBOOK}
              labelStyle={{ color: Globals.COLORS.WHITE }}>
              Facebook
            </Button>
            <Button
              icon={() => (
                <MaterialCommunityIcons
                  name={Globals.ICONS.GOOGLE}
                  color={Globals.COLORS.WHITE}
                  size={Globals.SIZES.ICON_HEADER}
                />
              )}
              mode="contained"
              style={styles.buttons}
              color={Globals.COLORS.GOOGLE}
              labelStyle={{ color: Globals.COLORS.WHITE }}
              onPress={handleLogin}>
              Google
            </Button>
            <Button
              icon={() => (
                <MaterialCommunityIcons
                  name={Globals.ICONS.ADD_PROFILE}
                  color={Globals.COLORS.WHITE}
                  size={Globals.SIZES.ICON_HEADER}
                />
              )}
              mode="contained"
              style={styles.buttons}
              color={Globals.COLORS.GRAY}
              labelStyle={{ color: Globals.COLORS.WHITE }}
              onPress={() => navigation.navigate('SignUp')}>
              S&apos;inscrire
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
