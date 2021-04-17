/**
 * @file    LocationComponent.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    08.04.2021
 * @brief   Location component
 */

import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Card, Avatar, Text, Chip, IconButton } from 'react-native-paper';
import Globals from '../../app/context/Globals';
import { Location, Tag } from '../../app/models/ApplicationTypes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../app/context/Theme';
import { useNavigation } from '@react-navigation/core';

interface IProps {
  location: Location;
  onChoose(location: Location): void;
  isAddView: boolean;
}

const LocationComponent: React.FC<IProps> = ({ location, onChoose, isAddView }) => {
  const navigation = useNavigation();
  const [isReduced, setIsReduced] = React.useState(true);

  let nbColors = 3;

  /**
   * Deploy or reduce meeting informations
   */
  const handleReduceOrDeploy = () => {
    isReduced ? setIsReduced(false) : setIsReduced(true);
  };

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={handleReduceOrDeploy}>
        <Card.Title
          title={location.name}
          subtitle={location.description}
          left={() => <Avatar.Image size={40} source={require('../../../assets/HEIG-VD.png')} />}
          right={() => (
            <View style={styles.iconsRight}>
              <View style={styles.infos}>
                <MaterialCommunityIcons
                  name={Globals.ICONS.INFO}
                  color={Globals.COLORS.GRAY}
                  size={Globals.SIZES.ICON_BUTTON}
                  onPress={() => navigation.navigate('LocationDetails')}
                />
              </View>
              <View style={styles.nbPeople}>
                <Text style={{ color: 'gray' }}>{location.nbPeople}</Text>
                <MaterialCommunityIcons
                  name={Globals.ICONS.PROFILE}
                  color={Globals.COLORS.GRAY}
                  size={Globals.SIZES.ICON_BUTTON}
                />
              </View>
            </View>
          )}
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
          {isAddView && (
            <Card.Actions style={styles.actions}>
              <View>
                <IconButton
                  icon={Globals.ICONS.CREATE}
                  size={30}
                  color={Globals.COLORS.GREEN}
                  onPress={() => onChoose(location)}
                />
                <Text style={[styles.gray, styles.buttonText]}>Choisir</Text>
              </View>
            </Card.Actions>
          )}
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