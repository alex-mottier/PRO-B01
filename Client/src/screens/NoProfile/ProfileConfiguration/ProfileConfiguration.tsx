/**
 * @file    ProfileConfiguration.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Profile configuration page
 */

import * as React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Chip, Title, TextInput, Button, IconButton } from 'react-native-paper';
import Globals from '../../../app/context/Globals';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../ProfileConfiguration/styles';

const ProfileConfiguration: React.FC = () => {
  const [isStudent, setIsStudent] = React.useState(true);
  const [username, setUsername] = React.useState('');
  

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Chip
            icon={() => (
              <MaterialCommunityIcons
                name={Globals.ICONS.PROFILE}
                color={isStudent ? Globals.COLORS.PRIMARY : Globals.COLORS.WHITE}
                size={Globals.SIZES.ICON_HEADER}
                style={styles.icon}
              />
            )}
            disabled={isStudent}
            textStyle={
              isStudent
                ? { color: Globals.COLORS.PRIMARY, fontWeight: 'bold' }
                : { color: Globals.COLORS.WHITE }
            }
            onPress={() => setIsStudent(true)}
            style={isStudent ? [styles.chip, styles.activate] : [styles.chip, styles.deactivate]}>
            Etudiant
          </Chip>
          <Chip
            icon={() => (
              <MaterialCommunityIcons
                name={Globals.ICONS.HOME}
                color={!isStudent ? Globals.COLORS.PRIMARY : Globals.COLORS.WHITE}
                size={Globals.SIZES.ICON_HEADER}
                style={styles.icon}
              />
            )}
            textStyle={
              !isStudent
                ? { color: Globals.COLORS.PRIMARY, fontWeight: 'bold' }
                : { color: Globals.COLORS.WHITE }
            }
            disabled={!isStudent}
            onPress={() => setIsStudent(false)}
            style={!isStudent ? [styles.chip, styles.activate] : [styles.chip, styles.deactivate]}>
            Hebergeur
          </Chip>
        </View>
        {isStudent && (
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
            <IconButton
              icon={() => (
                <MaterialCommunityIcons
                  name={Globals.ICONS.EDIT_IMAGE}
                  color={Globals.COLORS.PRIMARY}
                  size={Globals.SIZES.ICON_HEADER}
                  style={styles.editImage}
                />
              )}
              color={Globals.COLORS.PRIMARY}
              style={styles.iconImage}
              onPress={() => {}}
            />
            <View>
              <Title style={styles.title}>Etudiant</Title>
              <View style={styles.formInput}>
                <TextInput
                  mode="outlined"
                  label="Nom d'utilisateur"
                  value={username}
                  onChangeText={(username) => setUsername(username)}
                />
                <Button
                  icon={() => (
                    <MaterialCommunityIcons
                      name={Globals.ICONS.SEND}
                      color={Globals.COLORS.WHITE}
                      size={Globals.SIZES.ICON_HEADER}
                      style={styles.icon}
                    />
                  )}
                  mode="contained"
                  style={styles.button}
                  color={Globals.COLORS.PRIMARY}
                  labelStyle={{ color: Globals.COLORS.WHITE }}
                  onPress={}>
                  Finaliser le profile
                </Button>
              </View>
            </View>
          </View>
        )}
        {!isStudent && (
          <View>
            <Title style={styles.title}>Disponible dans le prochain livrable</Title>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileConfiguration;
