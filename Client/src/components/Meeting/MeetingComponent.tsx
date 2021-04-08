/**
 * @file    Meeting.tsx
 * @author  Alexis Allemann
 * @date    08.04.2021
 * @brief   Meeting component
 */

import * as React from 'react';
import { Avatar, Card, Chip, IconButton, Paragraph, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Meeting from '../../app/models/Meeting';
import Tag from '../../app/models/Tag';
import styles from './styles';
import Globals from '../../app/context/Globals';
import { View } from 'react-native';
import { format } from 'date-fns';
import frenchLocale from 'date-fns/locale/fr';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps {
  meeting: Meeting;
}

const MeetingComponent: React.FC<IProps> = ({ meeting }) => {
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
    <Card style={styles.card}>
      <TouchableOpacity onPress={handleReduceOrDeploy}>
        <Card.Title
          title={meeting.name}
          subtitle={isReduced ? meeting.description : ''}
          left={() => <Avatar.Image size={40} source={require('../../../assets/HEIG-VD.png')} />}
          right={() => (
            <View>
              <View style={styles.nbPeople}>
                <Text style={styles.gray}>
                  {meeting.nbPeople}/{meeting.location.nbPeople}
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
            <Text style={styles.gray}>{meeting.location.name}</Text>
          </View>
          <Card.Actions style={styles.actions}>
            <View>
              <IconButton
                icon={() => (
                  <MaterialCommunityIcons
                    name={Globals.ICONS.MESSAGE}
                    color={Globals.COLORS.ORANGE}
                    size={Globals.SIZES.ICON_BUTTON}
                  />
                )}
                size={30}
                onPress={() => console.log('Pressed')}
              />
              <Text style={[styles.gray, styles.buttonText]}>Discuter</Text>
            </View>
            <View>
              <IconButton
                icon={() => (
                  <MaterialCommunityIcons
                    name={Globals.ICONS.JOIN}
                    color={Globals.COLORS.GREEN}
                    size={Globals.SIZES.ICON_BUTTON}
                  />
                )}
                size={30}
                onPress={() => console.log('Pressed')}
              />
              <Text style={[styles.gray, styles.buttonText]}>Rejoindre</Text>
            </View>
          </Card.Actions>
          <IconButton
            icon={() => (
              <MaterialCommunityIcons
                name={Globals.ICONS.ARROW_UP}
                color={Globals.COLORS.GRAY}
                size={Globals.SIZES.ICON_BUTTON}
              />
            )}
            size={20}
            onPress={handleReduceOrDeploy}
            style={styles.arrowUp}
          />
        </Card.Content>
      )}
    </Card>
  );
};

export default MeetingComponent;
