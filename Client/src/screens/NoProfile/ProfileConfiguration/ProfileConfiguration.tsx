/**
 * @file    ProfileConfiguration.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Profile configuration page
 */

import * as React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, Button, useTheme, Title } from 'react-native-paper';
import Globals from '../../../app/context/Globals';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../ProfileConfiguration/styles';
import { Tabs, TabScreen } from 'react-native-paper-tabs';

const ProfileConfiguration: React.FC = () => {
  const paperTheme = useTheme();
  const [username, setUsername] = React.useState('');

  return (
    <Tabs
      style={{
        backgroundColor: paperTheme.colors.surface,
      }}
      theme={{
        ...paperTheme,
        colors: {
          ...paperTheme.colors,
          primary: Globals.COLORS.BLUE,
        },
      }}>
      <TabScreen label="Etudiant">
        <SafeAreaView>
          <ScrollView>
            <Image
              source={require('../../../../assets/Student.jpg')}
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
              <TextInput
                label="Nom d'utilisateur"
                value={username}
                onChangeText={(username) => setUsername(username)}
                style={styles.fields}
              />
              <Button
                icon={() => (
                  <MaterialCommunityIcons
                    name={Globals.ICONS.SEND}
                    color={Globals.COLORS.WHITE}
                    size={Globals.SIZES.ICON_HEADER}
                  />
                )}
                mode="contained"
                color={Globals.COLORS.PRIMARY}
                labelStyle={{ color: Globals.COLORS.WHITE }}
                onPress={() => console.log('todo')}>
                Finaliser le profile
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TabScreen>
      <TabScreen label="Hebergeur">
        <View>
          <Image
            source={require('../../../../assets/Establishment.jpg')}
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
            <Title>Disponible dans le prochain livrable</Title>
          </View>
        </View>
      </TabScreen>
    </Tabs>
  );
};

export default ProfileConfiguration;
