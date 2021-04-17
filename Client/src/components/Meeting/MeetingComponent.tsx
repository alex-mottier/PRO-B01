/**
 * @file    Meeting.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    08.04.2021
 * @brief   Meeting component
 */

import * as React from 'react';
import { Avatar, Card, Chip, IconButton, Paragraph, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import Globals from '../../app/context/Globals';
import { View } from 'react-native';
import { format } from 'date-fns';
import frenchLocale from 'date-fns/locale/fr';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Meeting, Tag } from '../../app/models/ApplicationTypes';
import { useNavigation } from '@react-navigation/core';

interface IProps {
  meeting: Meeting;
  isOwner: boolean;
}

const MeetingComponent: React.FC<IProps> = ({ meeting, isOwner }) => {
  const navigation = useNavigation();
  const [isReduced, setIsReduced] = React.useState(true);

  let nbColors = 0;
  const colors = [
    Globals.COLORS.YELLOW,
    Globals.COLORS.BLUE,
    Globals.COLORS.PINK,
    Globals.COLORS.ORANGE,
    Globals.COLORS.GREEN,
  ];

  /**
   * Deploy or reduce meeting informations
   */
  const handleReduceOrDeploy = () => {
    isReduced ? setIsReduced(false) : setIsReduced(true);
  };

  return (
    <Card style={styles.card} elevation={10}>
      <TouchableOpacity onPress={handleReduceOrDeploy}>
        <Card.Title
          title={meeting.name}
          subtitle={isReduced ? meeting.description : ''}
          left={() => <Avatar.Image size={40} source={require('../../../assets/HEIG-VD.png')} />}
          right={() => (
            <View>
              <View style={styles.nbPeople}>
                <Text style={styles.gray}>
                  {meeting.nbPeople}/{meeting.maxPeople}
                </Text>
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
            {meeting.tags.map((tag: Tag) => {
              return (
                <Chip
                  key={tag.name}
                  style={[styles.chip, { backgroundColor: colors[nbColors++ % colors.length] }]}>
                  {tag.name}
                </Chip>
              );
            })}
          </View>
          <View style={styles.infoWithIcon}>
            <MaterialCommunityIcons
              name={Globals.ICONS.INFO}
              color={Globals.COLORS.GRAY}
              size={Globals.SIZES.ICON_BUTTON}
              style={styles.icon}
            />
            <Paragraph style={[styles.paragraph, styles.gray]}>{meeting.description}</Paragraph>
          </View>
          <View style={styles.infoWithIcon}>
            <MaterialCommunityIcons
              name={Globals.ICONS.CALENDAR}
              color={Globals.COLORS.GRAY}
              size={Globals.SIZES.ICON_BUTTON}
              style={styles.icon}
            />
            <Text style={styles.gray}>
              {format(meeting.start, 'EEEE MM LLLL yyyy | HH:mm', { locale: frenchLocale })} -
              {format(meeting.end, 'HH:mm', { locale: frenchLocale })}
            </Text>
          </View>
          <View style={styles.infoWithIcon}>
            <MaterialCommunityIcons
              name={Globals.ICONS.LOCATION}
              color={Globals.COLORS.GRAY}
              size={Globals.SIZES.ICON_BUTTON}
              style={styles.icon}
            />
            <Text style={styles.gray}>{meeting.locationName}</Text>
          </View>
          <Card.Actions style={styles.actions}>
            <View>
              <IconButton
                icon={Globals.ICONS.MESSAGE}
                size={30}
                color={Globals.COLORS.ORANGE}
                onPress={() => console.log('Pressed')}
              />
              <Text style={[styles.gray, styles.buttonText]}>Discuter</Text>
            </View>
            {!isOwner && (
              <View>
                <IconButton
                  icon={Globals.ICONS.JOIN}
                  size={30}
                  onPress={() => console.log('Pressed')}
                  color={Globals.COLORS.GREEN}
                />
                <Text style={[styles.gray, styles.buttonText]}>Rejoindre</Text>
              </View>
            )}
            {isOwner && (
              <View>
                <IconButton
                  icon={Globals.ICONS.EDIT}
                  size={30}
                  onPress={() => navigation.navigate(Globals.STRINGS.CREATE)}
                  color={Globals.COLORS.BLUE}
                />
                <Text style={[styles.gray, styles.buttonText]}>Modifier</Text>
              </View>
            )}
            {isOwner && (
              <View>
                <IconButton
                  icon={Globals.ICONS.DELETE}
                  size={30}
                  onPress={() => console.log('Pressed')}
                  color={Globals.COLORS.PINK}
                />
                <Text style={[styles.gray, styles.buttonText]}>Supprimer</Text>
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

export default MeetingComponent;
