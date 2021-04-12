/**
 * @file    ProfileConfiguration.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    27.03.2021
 * @brief   Profile configuration page
 */

import * as React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, Button, useTheme, Title, Drawer } from 'react-native-paper';
import Globals from '../../../app/context/Globals';
import styles from '../ProfileConfiguration/styles';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import GlobalStore from '../../../app/stores/GlobalStore';

const ProfileConfiguration: React.FC = () => {
  const paperTheme = useTheme();
  const store = React.useContext(GlobalStore);
  const [username, setUsername] = React.useState('');
  const [establishment, setEstablishment] = React.useState('');

  /**
   * Action done when submit button is pressed
   */
  const handleSubmit = () => {
    void store.signUp({ name: username });
  };

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
                mode={'outlined'}
              />
              <Drawer.Section title="Etablissement" style={{ width: '100%' }}>
                <Drawer.Item
                  label="HEIG-VD"
                  active={establishment === 'HEIG-VD' || establishment === ''}
                  onPress={() => setEstablishment('HEIG-VD')}
                />
                <Drawer.Item
                  label="Autre"
                  active={establishment === 'Autre'}
                  onPress={() => setEstablishment('Autre')}
                />
              </Drawer.Section>
              <Button
                icon={Globals.ICONS.SEND}
                mode="contained"
                color={Globals.COLORS.PRIMARY}
                labelStyle={{ color: Globals.COLORS.WHITE }}
                onPress={handleSubmit}>
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
            <Title style={{ textAlign: 'center' }}>Disponible dans le prochain livrable</Title>
          </View>
        </View>
      </TabScreen>
    </Tabs>
  );
};

export default ProfileConfiguration;
