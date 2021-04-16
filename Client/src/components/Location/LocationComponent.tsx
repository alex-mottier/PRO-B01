/**
 * @file    Meeting.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    08.04.2021
 * @brief   Meeting component
 */

import * as React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Card, Avatar, Text, Chip, IconButton } from 'react-native-paper';
import Globals from '../../app/context/Globals';
import { Location, Tag } from '../../app/models/ApplicationTypes';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IProps {
  location: Location;
  onClose(): void | null;
}

const LocationComponent: React.FC<IProps> = ({ location, onClose }) => {
  let nbColors = 0;
  const colors = [
    Globals.COLORS.ORANGE,
    Globals.COLORS.GREEN,
    Globals.COLORS.GREEN,
    Globals.COLORS.YELLOW,
    Globals.COLORS.BLUE,
    Globals.COLORS.BLUE,
    Globals.COLORS.ORANGE,
    Globals.COLORS.GREEN,
  ];
  return (
    <Card style={styles.card}>
      <Card.Title
        title={location.name}
        subtitle={location.description}
        left={() => <Avatar.Image size={40} source={require('../../../assets/HEIG-VD.png')} />}
        right={() => (
          <View>
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
        <View style={styles.close}>
          <IconButton
            icon={Globals.ICONS.CLOSE_LOCATION}
            size={Globals.SIZES.ICON_BUTTON}
            color={Globals.COLORS.GRAY}
            onPress={onClose}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default LocationComponent;
