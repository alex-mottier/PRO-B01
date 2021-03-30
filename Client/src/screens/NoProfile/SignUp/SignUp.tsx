/**
 * @file    SignUp.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Sign up page
 */

import * as React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Globals from '../../../app/context/Globals';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
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
          <Text style={styles.text}>Veuillez choisir une option d'inscription :</Text>
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
            labelStyle={{ color: Globals.COLORS.WHITE }}
            onPress={() => navigation.navigate('ProfileConfiguration')}>
            S'inscrire avec Facebook
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
            onPress={() => navigation.navigate('ProfileConfiguration')}>
            S'inscrire avec Google
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
