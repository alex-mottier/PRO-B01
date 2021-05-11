/**
 * @file    SearchLocation.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    10.04.2021
 * @brief   Search location component
 */

import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { IconButton, TextInput, Text, Portal, Modal, Title, useTheme } from 'react-native-paper';
import Globals from '../../app/context/Globals';
import { useStores } from '../../app/stores/StoresContext';
import Strings from '../../app/context/Strings';
import { Location } from '../../app/models/ApplicationTypes';
import LoadingComponent from '../Loading/LoadingComponent';
import LocationComponent from '../Location/LocationComponent';
import styles from './styles';

/**
 * Component props
 */
interface IProps {
  location: Location | null;
  chooseLocation(location: Location | null): void;
  startDate?: Date | null;
  endDate?: Date | null;
}

const SearchLocation: React.FC<IProps> = ({ location, chooseLocation, startDate, endDate }) => {
  /* Usage of MobX global state store */
  const { studentStore } = useStores();

  /* Component states */
  const [locationName, setLocationName] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [locations, setLocations] = React.useState<Location[] | null>(studentStore.locations);
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Action when a location is choosen
   * @param location new location
   */
  const handleChooseLocation = (location: Location) => {
    chooseLocation(location);
    setModalVisible(false);
    setLocationName('');
    setLocations(studentStore.locations);
  };

  /**
   * Action when a location is choosen
   * @param locationName new location name
   */
  const handleLocationNameChange = (locationName: string) => {
    setLocationName(locationName);
    const newLocations =
      studentStore.locations &&
      studentStore.locations.filter((current: Location) => {
        return current.name.search(locationName) !== -1;
      });
    setLocations(newLocations);
  };

  /**
   * Action when component is loaded
   */
  React.useEffect(() => {
    setIsLoading(true);
    if (startDate && endDate)
      void studentStore.loadLocations(startDate, endDate, null).then(() => {
        setLocations(studentStore.locations);
        setIsLoading(false);
      });
    else
      void studentStore.loadAllLocations().then(() => {
        setLocations(studentStore.locations);
        setIsLoading(false);
      });
  }, []);

  return (
    <View>
      <View style={styles.tags}>
        <Text style={{ color: Globals.COLORS.TEXT }}>{Strings.LOCATION}</Text>
        <IconButton
          icon={Globals.ICONS.SEARCH}
          size={Globals.SIZES.ICON_MENU}
          color={Globals.COLORS.PRIMARY}
          onPress={() => setModalVisible(true)}
        />
        <IconButton
          icon={Globals.ICONS.DELETE}
          size={Globals.SIZES.ICON_MENU}
          color={Globals.COLORS.TEXT}
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
          contentContainerStyle={[
            styles.container,
            { backgroundColor: useTheme().colors.surface },
          ]}>
          <View style={styles.modal}>
            <View style={styles.close}>
              <IconButton
                icon={Globals.ICONS.CLOSE_LOCATION}
                size={Globals.SIZES.ICON_BUTTON}
                color={Globals.COLORS.GRAY}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <Title style={styles.title}>{Strings.LOCATIONS_SEARCH}</Title>
            <TextInput
              label="Nom du lieu"
              value={locationName}
              onChangeText={(name) => handleLocationNameChange(name)}
              style={styles.field}
            />
            {isLoading && (
              <View style={styles.scrollview}>
                <LoadingComponent />
              </View>
            )}
            {!isLoading && (
              <ScrollView style={styles.scrollview}>
                <View style={styles.locations}>
                  {locations &&
                    locations?.map((location: Location) => (
                      <LocationComponent
                        key={location.name}
                        location={location}
                        onChoose={(location: Location) => handleChooseLocation(location)}
                        isAddView={true}
                      />
                    ))}
                </View>
              </ScrollView>
            )}
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default SearchLocation;
