/**
 * @file    Welcome.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    27.03.2021
 * @brief   Welcome page
 */

import * as React from 'react';
import { Image } from 'react-native';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import Globals from '../../../app/context/Globals';
import styles from './styles';
import { useNavigation } from '@react-navigation/core';
import Strings from '../../../app/context/Strings';

const Welcome: React.FC = () => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View>
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
        </View>
        <View style={styles.container}>
          <Title>{Strings.WELCOME}</Title>
          <Text style={styles.text}>{Strings.AGREEMENT}</Text>
          <View style={styles.buttons}>
            <Button
              icon={Globals.ICONS.PROFILE}
              mode="contained"
              style={styles.buttons}
              color={Globals.COLORS.PRIMARY}
              labelStyle={{ color: Globals.COLORS.WHITE }}
              onPress={() => navigation.navigate('SignIn')}>
              {Strings.SIGN_IN}
            </Button>
            <Button
              icon={Globals.ICONS.ADD_PROFILE}
              mode="contained"
              style={styles.buttons}
              color={Globals.COLORS.BLUE}
              labelStyle={{ color: Globals.COLORS.WHITE }}
              onPress={() => navigation.navigate('SignUp')}>
              {Strings.SIGN_UP}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
