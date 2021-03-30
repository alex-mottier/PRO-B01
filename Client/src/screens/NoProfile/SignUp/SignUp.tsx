/**
 * @file    SignUp.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Sign up page
 */

import * as React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Button } from 'react-native-paper';
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
        <View>
          <Button
            icon={() => (
              <MaterialCommunityIcons
                name={Globals.ICONS.SEARCH}
                color={Globals.COLORS.WHITE}
                size={Globals.SIZES.ICON_HEADER}
                style={styles.icon}
              />
            )}
            mode="contained"
            style={styles.buttons}
            color={Globals.COLORS.BLUE}
            labelStyle={{ color: Globals.COLORS.WHITE }}
            onPress={() => navigation.navigate('ProfileConfiguration')}>
            Se connecter avec Facebook
          </Button>
          <Button
            icon={() => (
              <MaterialCommunityIcons
                name={Globals.ICONS.SEARCH}
                color={Globals.COLORS.WHITE}
                size={Globals.SIZES.ICON_HEADER}
                style={styles.icon}
              />
            )}
            mode="contained"
            style={styles.buttons}
            color={Globals.COLORS.BLUE}
            labelStyle={{ color: Globals.COLORS.WHITE }}
            onPress={() => navigation.navigate('ProfileConfiguration')}>
            Se connecter avec Google
          </Button>
          <Button
            icon={() => (
              <MaterialCommunityIcons
                name={Globals.ICONS.SEARCH}
                color={Globals.COLORS.WHITE}
                size={Globals.SIZES.ICON_HEADER}
                style={styles.icon}
              />
            )}
            mode="contained"
            style={styles.buttons}
            color={Globals.COLORS.BLUE}
            labelStyle={{ color: Globals.COLORS.WHITE }}
            onPress={() => navigation.navigate('ProfileConfiguration')}>
            Se connecter avec Instagram
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
