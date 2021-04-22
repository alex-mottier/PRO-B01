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
import { Alert, View } from 'react-native';
import { format } from 'date-fns';
import frenchLocale from 'date-fns/locale/fr';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Meeting, Tag } from '../../app/models/ApplicationTypes';
import { useNavigation } from '@react-navigation/core';
import GlobalStore from '../../app/stores/GlobalStore';
import { colors } from '../../app/context/Theme';
import Clipboard from 'expo-clipboard';

/**
 * Component props
 */
interface IProps {
  meeting: Meeting;
  isOwner: boolean;
  isChatable: boolean;
  isInCalendar: boolean;
}

const MeetingComponent: React.FC<IProps> = ({
  meeting,
  isOwner,
  isChatable = true,
  isInCalendar = false,
}) => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  /* Usage of MobX global state store */
  const store = React.useContext(GlobalStore);

  /* Component states */
  const [isReduced, setIsReduced] = React.useState(true);

  /* Local variables */
  let nbColors = 0;

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
    store.setMeetingToUpdate(meeting);
    store.setLocationToLoad(meeting.locationID);
    navigation.navigate('Edit');
  };

  /**
   * Suppression de la réunion
   */
  const handleDelete = () => {
    Alert.alert(
      'Supprimer ?',
      'Etes-vous sûr de vouloir supprimer la réunion ' + meeting.name + ' ?',
      [
        {
          text: 'Non',
          style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: () => {
            void store.deleteMeeting(meeting.id);
          },
        },
      ],
    );
  };

  /**
   * Copy meeting id to clipboard
   */
  const copyToClipboard = () => {
    Clipboard.setString(meeting.id);
    Alert.alert('Copié', "L'id de la réunion a été copié");
  };

  /**
   * Action on open chat button pressed
   */
  const handleOpenChat = () => {
    store.setChatToLoad(meeting.chatId);
    store.setMeetingToUpdate(meeting);
    navigation.navigate('Chat');
  };

  return (
    <Card style={styles.card} elevation={10}>
      <TouchableOpacity onPress={handleReduceOrDeploy}>
        <Card.Title
          title={meeting.name}
          subtitle={isReduced ? meeting.description : ''}
          left={() => <Avatar.Image size={40} source={require('../../../assets/HEIG-VD.png')} />}
          right={() =>
            !isInCalendar && (
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
            )
          }
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
              name={Globals.ICONS.ABC}
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
              {format(new Date(meeting.startDate), 'EEEE MM LLLL yyyy | HH:mm', {
                locale: frenchLocale,
              })}{' '}
              -{format(new Date(meeting.endDate), 'HH:mm', { locale: frenchLocale })}
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
            <View style={styles.iconLittle}>
              <MaterialCommunityIcons
                name={Globals.ICONS.INFO}
                color={Globals.COLORS.GRAY}
                size={Globals.SIZES.ICON_HEADER}
                onPress={() => {
                  void store.setLocationToLoad(meeting.locationID);
                  navigation.navigate('LocationDetails');
                }}
              />
            </View>
          </View>
          <Card.Actions style={styles.actions}>
            {isChatable && (
              <View>
                <IconButton
                  icon={Globals.ICONS.MESSAGE}
                  size={30}
                  color={Globals.COLORS.ORANGE}
                  onPress={handleOpenChat}
                />
                <Text style={[styles.gray, styles.buttonText]}>Discuter</Text>
              </View>
            )}
            {isOwner && !isInCalendar && (
              <View>
                <IconButton
                  icon={Globals.ICONS.COPY}
                  size={30}
                  onPress={copyToClipboard}
                  color={Globals.COLORS.GRAY}
                />
                <Text style={[styles.gray, styles.buttonText]}>Copier ID</Text>
              </View>
            )}
            {!isOwner && !isInCalendar && (
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
                  onPress={handleEdit}
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
                  onPress={handleDelete}
                  color={Globals.COLORS.PINK}
                />
                <Text style={[styles.gray, styles.buttonText]}>Supprimer</Text>
              </View>
            )}
            {!isOwner && (
              <View>
                <IconButton
                  icon={Globals.ICONS.LEAVE}
                  size={30}
                  onPress={() => console.log('Pressed')}
                  color={Globals.COLORS.PINK}
                />
                <Text style={[styles.gray, styles.buttonText]}>Quitter</Text>
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
