/**
 * @file    ProfileConfiguration.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    27.03.2021
 * @brief   Profile configuration page
 */

import * as React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, Button, useTheme, Drawer } from 'react-native-paper';
import Globals from '../../../app/context/Globals';
import styles from '../ProfileConfiguration/styles';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import { useStores } from '../../../app/stores/StoresContext';
import { Host } from '../../../app/models/ApplicationTypes';
import HostData from '../../../components/HostData/HostData';
import Strings from '../../../app/context/Strings';

const ProfileConfiguration: React.FC = () => {
  // Usage of react native paper theme library
  const paperTheme = useTheme();

  /* Usage of MobX global state store */
  const { authenticationStore } = useStores();

  /* Component states for Student */
  const [username, setUsername] = React.useState('');
  const [establishment, setEstablishment] = React.useState('');

  /**
   * Action done when submit button for student tab is pressed
   */
  const handleStudentSubmit = () => {
    void authenticationStore.signUpStudent({ id: '', username: username });
  };

  /**
   * Action done when submit button for host tab is pressed
   */
  const handleHostSubmit = (host: Host) => {
    void authenticationStore.signUpHost(host);
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
      <TabScreen label={Strings.STUDENT}>
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
                label={Strings.USER_NAME}
                value={username}
                onChangeText={(username) => setUsername(username)}
                style={styles.fields}
                mode={'outlined'}
              />
              <Drawer.Section title={Strings.ESTABLISHMENT} style={{ width: '100%' }}>
                <Drawer.Item
                  label={Strings.HEIGVD}
                  active={establishment === Strings.HEIGVD || establishment === ''}
                  onPress={() => setEstablishment(Strings.HEIGVD)}
                />
                <Drawer.Item
                  label={Strings.OTHER}
                  active={establishment === Strings.OTHER}
                  onPress={() => setEstablishment(Strings.OTHER)}
                />
              </Drawer.Section>
              <Button
                icon={Globals.ICONS.SEND}
                mode="contained"
                color={Globals.COLORS.PRIMARY}
                labelStyle={{ color: Globals.COLORS.WHITE }}
                onPress={handleStudentSubmit}
                style={styles.button}>
                {Strings.PROFILE_SEND}
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TabScreen>
      <TabScreen label={Strings.HOST}>
        <SafeAreaView>
          <HostData
            onSubmit={(host: Host) => handleHostSubmit(host)}
            buttonText={Strings.PROFILE_SEND}
          />
        </SafeAreaView>
      </TabScreen>
    </Tabs>
  );
};

export default ProfileConfiguration;
