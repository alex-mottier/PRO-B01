/**
 * @file    ProfileConfiguration.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Profile configuration page
 */

import * as React from 'react';
import { Image, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { Chip, Title, TextInput, Button, IconButton } from 'react-native-paper';
import Globals from '../../../app/context/Globals';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../ProfileConfiguration/styles';
import launchImageLibrary from 'react-native-image-picker';

const ProfileConfiguration: React.FC = () => {
  const [isStudent, setIsStudent] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [userImage, setUserImage] = React.useState(null);

  const createFormData = (
    photo: { fileName: any; type: any; uri: string },
    body: { [x: string]: any },
  ) => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };
  const editUserImage: () => void = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response: { uri: string }) => {
      if (response.uri) {
        setUserImage(response);
        handleUploadPhoto();
      }
    });
  };

  const handleUploadPhoto = () => {
    fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: createFormData(userImage, { userId: '123' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('upload succes', response);
        setUserImage(null);
      })
      .catch((error) => {
        console.log('upload error', error);
      });
  };

  /**
   * TODO Function to POST the username to the backend
   */
  const submitForm: () => void = () => {};
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
              onPress={() => editUserImage()}
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
                  onPress={() => submitForm()}>
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
