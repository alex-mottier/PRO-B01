/**
 * @file    LocationComponent.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    08.04.2021
 * @brief   Location component
 */

import * as React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Card, Avatar, Text, Chip, IconButton } from 'react-native-paper';
import Globals from '../../app/context/Globals';
import { Location, Tag } from '../../app/models/ApplicationTypes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../app/context/Theme';
import { useNavigation } from '@react-navigation/core';
import { useStores } from '../../app/stores/StoresContext';
import Strings from '../../app/context/Strings';

/**
 * Component props
 */
interface IProps {
  location: Location;
  onChoose(location: Location): void;
  isAddView: boolean;
}

const LocationComponent: React.FC<IProps> = ({ location, onChoose, isAddView }) => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  /* Usage of MobX global state store */
  const { authenticationStore, studentStore, hostStore } = useStores();

  /* Component states */
  const [isReduced, setIsReduced] = React.useState(true);

  /* Local variables */
  let nbColors = 3;
  const isOwnerView = location.hostId === authenticationStore.authenticatedHost?.id;

  /**
   * Deploy or reduce meeting informations
   */
  const handleReduceOrDeploy = () => {
    isReduced ? setIsReduced(false) : setIsReduced(true);
  };

  /**
   * Action when the edit button is pressed
   */
  const handleEdit = () => {
    hostStore.setLocationToUpdate(location);
    navigation.navigate(Globals.NAVIGATION.HOST_EDIT_LOCATION);
  };

  /**
   * Suppression de la réunion
   */
  const handleDelete = () => {
    Alert.alert(Strings.ASK_DELETE, Strings.ASK_LOCATION_DELETE + location.name + ' ?', [
      {
        text: Strings.NO,
        style: 'cancel',
      },
      {
        text: Strings.YES,
        onPress: () => {
          void hostStore.deleteLocation(location.id);
        },
      },
    ]);
  };

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={handleReduceOrDeploy}>
        <Card.Title
          title={location.name}
          subtitle={location.description}
          left={() => <Avatar.Image size={40} source={require('../../../assets/HEIG-VD.png')} />}
          right={() =>
            !isOwnerView && (
              <View style={styles.iconsRight}>
                <View style={styles.infos}>
                  <MaterialCommunityIcons
                    name={Globals.ICONS.INFO}
                    color={Globals.COLORS.GRAY}
                    size={Globals.SIZES.ICON_BUTTON}
                    onPress={() => {
                      studentStore.setLocationToLoad(location.id);
                      navigation.navigate(Globals.NAVIGATION.STUDENT_LOCATION);
                    }}
                  />
                </View>
                <View style={styles.nbPeople}>
                  <Text style={{ color: Globals.COLORS.TEXT }}>{location.nbPeople}</Text>
                  <MaterialCommunityIcons
                    name={Globals.ICONS.PROFILE}
                    color={Globals.COLORS.GRAY}
                    size={Globals.SIZES.ICON_BUTTON}
                  />
                </View>
              </View>
            )
          }
        />
      </TouchableOpacity>
      {!isReduced && (
        <Card.Content>
          <View style={styles.chips}>
            {location.tags.map((tag: Tag) => {
              return (
                <Chip
                  key={tag.name}
                  style={[styles.chip, { backgroundColor: colors[nbColors++ % colors.length] }]}>
                  {tag.name}
                </Chip>
              );
            })}
          </View>
          <Card.Actions style={styles.actions}>
            {isAddView && (
              <View>
                <IconButton
                  icon={Globals.ICONS.CREATE}
                  size={30}
                  color={Globals.COLORS.GREEN}
                  onPress={() => onChoose(location)}
                />
                <Text style={[styles.gray, styles.buttonText]}>{Strings.CHOOSE}</Text>
              </View>
            )}
            {isOwnerView && (
              <View>
                <IconButton
                  icon={Globals.ICONS.EDIT}
                  size={30}
                  onPress={handleEdit}
                  color={Globals.COLORS.BLUE}
                />
                <Text style={[styles.gray, styles.buttonText]}>{Strings.EDIT}</Text>
              </View>
            )}
            {isOwnerView && (
              <View>
                <IconButton
                  icon={Globals.ICONS.DELETE}
                  size={30}
                  onPress={handleDelete}
                  color={Globals.COLORS.PINK}
                />
                <Text style={[styles.gray, styles.buttonText]}>{Strings.DELETE}</Text>
              </View>
            )}
          </Card.Actions>
          <IconButton
            icon={Globals.ICONS.ARROW_UP}
            size={20}
            onPress={handleReduceOrDeploy}
            color={Globals.COLORS.GRAY}
            style={styles.arrowUp}
          />
        </Card.Content>
      )}
    </Card>
  );
};

export default LocationComponent;
