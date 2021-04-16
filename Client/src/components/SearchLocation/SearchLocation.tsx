/**
 * @file    SearchLocation.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    10.04.2021
 * @brief   Search location component
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { IconButton, TextInput, Text, Portal, Modal, Title } from 'react-native-paper';
import Globals from '../../app/context/Globals';
import { Location } from '../../app/models/ApplicationTypes';
import { mockLocations } from '../../mock/Locations';
import LocationComponent from '../Location/LocationComponent';
import styles from './styles';

interface IProps {
  location: Location | null;
  chooseLocation(location: Location | null): void;
}

const SearchLocation: React.FC<IProps> = ({ location, chooseLocation }) => {
  const [locationName, setLocationName] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [locations, setLocations] = React.useState<Location[]>(mockLocations);

  /**
   * Action when a location is choosen
   */
  const handleChooseLocation = (location: Location) => {
    chooseLocation(location);
    setModalVisible(false);
    setLocationName('');
    setLocations(mockLocations);
  };

  /**
   * Action when a location is choosen
   */
  const handleLocationNameChange = (locationName: string) => {
    setLocationName(locationName);
    const newLocations = mockLocations.filter((current: Location) => {
      return current.name.search(locationName) !== -1;
    });
    setLocations(newLocations);
  };

  return (
    <View>
      <View style={styles.tags}>
        <Text style={{ color: 'gray' }}>Lieu</Text>
        <IconButton
          icon={Globals.ICONS.SEARCH}
          size={Globals.SIZES.ICON_MENU}
          color={Globals.COLORS.PRIMARY}
          onPress={() => setModalVisible(true)}
        />
        <IconButton
          icon={Globals.ICONS.DELETE}
          size={Globals.SIZES.ICON_MENU}
          color={'gray'}
          disabled={location === null}
          style={styles.deleteLocation}
          onPress={() => chooseLocation(null)}
        />
      </View>
      <View style={styles.location}>
        {location && (
          <LocationComponent location={location} onChoose={() => {}} isAddView={false} />
        )}
      </View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.container}>
          <View style={styles.modal}>
            <View style={styles.close}>
              <IconButton
                icon={Globals.ICONS.CLOSE_LOCATION}
                size={Globals.SIZES.ICON_BUTTON}
                color={Globals.COLORS.GRAY}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <Title style={styles.title}>Recherche de lieux</Title>
            <TextInput
              label="Nom du lieu"
              value={locationName}
              onChangeText={(name) => handleLocationNameChange(name)}
              style={styles.field}
            />
            <ScrollView style={styles.scrollview}>
              <View style={styles.locations}>
                {locations.map((location: Location) => (
                  <LocationComponent
                    key={location.name}
                    location={location}
                    onChoose={(location: Location) => handleChooseLocation(location)}
                    isAddView={true}
                  />
                ))}
              </View>
            </ScrollView>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default SearchLocation;
