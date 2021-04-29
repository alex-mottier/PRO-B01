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
import { useStores } from '../../../app/context/storesContext';
import TagsComponent from '../../../components/Tags/TagsComponent';
import { Tag } from '../../../app/models/ApplicationTypes';

const ProfileConfiguration: React.FC = () => {
  // Usage of react native paper theme library
  const paperTheme = useTheme();

  /* Usage of MobX global state store */
  const { authenticationStore, studentStore } = useStores();

  /* Component states for Student */
  const [username, setUsername] = React.useState('');
  const [establishment, setEstablishment] = React.useState('');

  /* Component states for Host */
  const [host, setHost] = React.useState('');
  const [addressName, setAddressName] = React.useState('');
  const [addressNumber, setAddressNumber] = React.useState('');
  const [city, setCity] = React.useState('');
  const [npa, setNpa] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState<Tag[]>([]);

  /**
   * Action done when submit button for student tab is pressed
   */
  const handleSubmit = async () => {
    const loginSucceed = await authenticationStore.signUp({ id: '', username: username });
    if (loginSucceed) void studentStore.loadUserData();
  };

  /**
   * Add tag to filter
   * @param tag to add
   */
  const handleAddTag = (tag: Tag) => {
    tag.name = tag.name.toUpperCase();
    if (
      !tags.find((current: Tag) => {
        return current.name == tag.name;
      })
    )
      setTags([...tags, tag]);
  };

  /**
   * Remove tag from filter
   * @param tag to remove
   */
  const handleDeleteTag = (tag: Tag) => {
    const newTags = tags.filter((current: Tag) => {
      return current.name !== tag.name;
    });
    setTags(newTags);
  };

  /**
   * Action done when submit button for host tab is pressed
   */
  const handleHostSubmit = () => {
    // TO UNCOMMENT
    // void store.signUpHost({
    //   id: '',
    //   name: host,
    //   address: {
    //     id: '',
    //     street: addressName,
    //     streetNb: addressNumber,
    //     cityName: city,
    //     npa: npa,
    //   },
    //   description: description,
    //   tags: tags
    // });
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
                onPress={handleSubmit}
                style={styles.button}>
                Finaliser le profile
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TabScreen>
      <TabScreen label="Hebergeur">
        <SafeAreaView>
          <ScrollView>
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
              <TextInput
                label="Nom de l'hébébergement"
                value={host}
                onChangeText={(host) => setHost(host)}
                style={styles.fields}
                mode={'outlined'}
              />
              <TextInput
                label="Description de l'hébébergement"
                value={description}
                onChangeText={(description) => setDescription(description)}
                style={styles.fields}
                mode={'outlined'}
              />
              <View style={styles.row}>
                <TextInput
                  label="Adresse de l'hébébergement"
                  value={addressName}
                  onChangeText={(addressName) => setAddressName(addressName)}
                  style={styles.fields70}
                  mode={'outlined'}
                />
                <TextInput
                  label="Numéro de l'adresse"
                  value={addressNumber}
                  onChangeText={(addressNumber) => setAddressNumber(addressNumber)}
                  style={styles.fields20}
                  mode={'outlined'}
                />
              </View>
              <View style={styles.row}>
                <TextInput
                  label="Ville"
                  value={city}
                  onChangeText={(city) => setCity(city)}
                  style={styles.fields70}
                  mode={'outlined'}
                />
                <TextInput
                  label="NPA"
                  value={npa}
                  onChangeText={(npa) => setNpa(npa)}
                  style={styles.fields20}
                  mode={'outlined'}
                />
              </View>
              <View style={{ width: '100%' }}>
                <TagsComponent
                  tags={tags}
                  addTag={(tag: Tag) => handleAddTag(tag)}
                  removeTag={(tag: Tag) => handleDeleteTag(tag)}
                />
              </View>
              <Button
                icon={Globals.ICONS.SEND}
                mode="contained"
                color={Globals.COLORS.PRIMARY}
                labelStyle={{ color: Globals.COLORS.WHITE }}
                onPress={handleHostSubmit}
                style={styles.button}>
                Finaliser le profile
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TabScreen>
    </Tabs>
  );
};

export default ProfileConfiguration;
