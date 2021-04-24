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
import CustomButton from '../../../components/Buttons/CustomButton';
import GlobalStore from '../../../app/stores/GlobalStore';

const Welcome: React.FC = () => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  // To be deleted (just to simplify the connection during development)
  const store = React.useContext(GlobalStore);

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
          <Title>Bienvenue sur Amphitryon</Title>
          <Text style={styles.text}>
            En vous connectant, vous acceptez nos conditions générales. Pour en savoir plus sur
            l&apos;usage que nous faisons de vos données, consultez notre politique de
            confidentialité et notre politique en matière de cookies.
          </Text>
          <View style={styles.buttons}>
            <Button
              icon={Globals.ICONS.PROFILE}
              mode="contained"
              style={styles.buttons}
              color={Globals.COLORS.PRIMARY}
              labelStyle={{ color: Globals.COLORS.WHITE }}
              onPress={() => navigation.navigate('SignIn')}>
              Se connecter
            </Button>
            <Button
              icon={Globals.ICONS.ADD_PROFILE}
              mode="contained"
              style={styles.buttons}
              color={Globals.COLORS.BLUE}
              labelStyle={{ color: Globals.COLORS.WHITE }}
              onPress={() => navigation.navigate('SignUp')}>
              S&apos;inscrire
            </Button>
            <CustomButton
              icon={Globals.ICONS.SEND}
              color={Globals.COLORS.GRAY}
              onPress={() => {
                store.setIsLoggedIn(true);
                store.setAuthenticatedUser({ id: '1', username: 'Développeur' });
                void store.loadUserData();
              }}
              text={'Développement'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
