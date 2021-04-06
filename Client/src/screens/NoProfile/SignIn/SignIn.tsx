/**
 * @file    SignIn.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Authentication page of the application
 */

import * as React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { AuthContext } from '../../../navigator/authentication/AuthProvider';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Globals from '../../../app/context/Globals';

const SignIn: React.FC = () => {
  const { login } = React.useContext(AuthContext);
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
          <Text style={styles.text}>Veuillez choisir une option de connexion :</Text>
          <Button
            icon={() => (
              <MaterialCommunityIcons
                name={Globals.ICONS.FACEBOOK}
                color={Globals.COLORS.WHITE}
                size={Globals.SIZES.ICON_HEADER}
                style={styles.icon}
              />
            )}
            mode="contained"
            style={styles.buttons}
            color={Globals.COLORS.FACEBOOK}
            labelStyle={{ color: Globals.COLORS.WHITE }}>
            Se connecter avec Facebook
          </Button>
          <Button
            icon={() => (
              <MaterialCommunityIcons
                name={Globals.ICONS.GOOGLE}
                color={Globals.COLORS.WHITE}
                size={Globals.SIZES.ICON_HEADER}
                style={styles.icon}
              />
            )}
            mode="contained"
            style={styles.buttons}
            color={Globals.COLORS.GOOGLE}
            labelStyle={{ color: Globals.COLORS.WHITE }}
            onPress={login}>
            Se connecter avec Google
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
>>>>>>> 9cdfe9c908d527c38de70c291def89ed857ede84
