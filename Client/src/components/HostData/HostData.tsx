/**
 * @file    HostData.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    07.05.2021
 * @brief   Host configuration page
 */

import * as React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { TabScreen } from 'react-native-paper-tabs';
import Globals from '../../app/context/Globals';
import { useStores } from '../../app/stores/StoresContext';
import { Host, Tag } from '../../app/models/ApplicationTypes';
import styles from './styles';
import TagsComponent from '../Tags/TagsComponent';
import Strings from '../../app/context/Strings';

/**
 * Component props
 */
interface IProps {
  onSubmit: (host: Host) => void;
  buttonText: string;
}

const HostData: React.FC<IProps> = ({ onSubmit, buttonText }) => {
  /* Usage of MobX global state store */
  const { authenticationStore } = useStores();

  /* Component states for Host */
  const hostAuth = authenticationStore.authenticatedHost;
  const [host, setHost] = React.useState(hostAuth ? hostAuth.name : '');
  const [addressName, setAddressName] = React.useState(hostAuth ? hostAuth.address.street : '');
  const [addressNumber, setAddressNumber] = React.useState(
    hostAuth ? hostAuth.address.streetNb : '',
  );
  const [city, setCity] = React.useState(hostAuth ? hostAuth.address.cityName : '');
  const [npa, setNpa] = React.useState(hostAuth ? hostAuth.address.npa : '');
  const [description, setDescription] = React.useState(hostAuth ? hostAuth.description : '');
  const [tags, setTags] = React.useState<Tag[]>(hostAuth ? hostAuth.tags : []);

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
   * Action when submit button is clicked
   */
  const handleSubmit = () => {
    const hostAuth = authenticationStore.authenticatedHost;
    onSubmit({
      id: hostAuth ? hostAuth.id : '',
      name: host,
      address: {
        id: '',
        street: addressName,
        streetNb: addressNumber,
        cityName: city,
        npa: npa,
      },
      description: description,
      tags: tags,
      covidData: hostAuth
        ? hostAuth.covidData
        : {
            isOpen: true,
            masksRequired: false,
            disinfectionRequired: false,
            recommendedDistancing: '',
            comments: '',
          },
    });
  };

  return (
    <ScrollView>
      <Image
        source={require('../../../assets/Establishment.jpg')}
        style={styles.image}
        resizeMode="cover"
        blurRadius={1}
      />
      <Image
        source={require('../../../assets/Logo.png')}
        style={styles.logo}
        resizeMode="stretch"
      />
      <TabScreen label="Hebergeur">
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              <TextInput
                label={Strings.HOST_NAME}
                value={host}
                onChangeText={(host) => setHost(host)}
                style={styles.fields}
                mode={'outlined'}
              />
              <TextInput
                label={Strings.HOST_DESCRIPTION}
                value={description}
                onChangeText={(description) => setDescription(description)}
                style={styles.fields}
                mode={'outlined'}
              />
              <View style={styles.row}>
                <TextInput
                  label={Strings.HOST_ADDRESS_NAME}
                  value={addressName}
                  onChangeText={(addressName) => setAddressName(addressName)}
                  style={styles.fields70}
                  mode={'outlined'}
                />
                <TextInput
                  label={Strings.HOST_ADDRESS_NUMBER}
                  value={addressNumber}
                  onChangeText={(addressNumber) => setAddressNumber(addressNumber)}
                  style={styles.fields20}
                  mode={'outlined'}
                />
              </View>
              <View style={styles.row}>
                <TextInput
                  label={Strings.HOST_ADDRESS_CITY}
                  value={city}
                  onChangeText={(city) => setCity(city)}
                  style={styles.fields70}
                  mode={'outlined'}
                />
                <TextInput
                  label={Strings.HOST_ADDRESS_ZIP}
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
                onPress={handleSubmit}
                style={styles.button}>
                {buttonText}
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TabScreen>
    </ScrollView>
  );
};

export default HostData;
