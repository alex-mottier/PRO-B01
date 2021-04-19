/**
 * @file    Home.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student home page
 */

import * as React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import styles from './styles';
import { Agenda, DateObject } from 'react-native-calendars';
import Globals from '../../../app/context/Globals';
import { LocaleConfig } from 'react-native-calendars';
import { observer } from 'mobx-react-lite';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import { Meeting } from '../../../app/models/ApplicationTypes';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const Home: React.FC = () => {
  console.log(new Date().toUTCString());
  return (
    <Agenda
      items={{
        '2021-04-17': [],
        '2021-04-18': [],
        '2021-04-19': [],
        '2021-04-20': [],
        '2021-04-21': [],
        '2021-04-22': [
          {
            name: 'RES - Préparation TE1',
            description: 'Java IO et programmation TCP',
            tags: [{ name: 'RES' }, { name: 'Java IO' }, { name: 'TCP' }],
            locationID: '',
            locationName: 'Bibliothèque',
            nbPeople: 1,
            maxPeople: 3,
            start: new Date(),
            end: new Date(),
            ownerID: '',
            chatId: '',
            isPrivate: true,
          },
          {
            name: 'PRO - Coordination',
            description: "Réunion pour coordiner l'avancement du projet",
            tags: [{ name: 'PRO' }, { name: 'Coordination' }],
            locationID: '',
            locationName: 'Salle G01',
            nbPeople: 2,
            maxPeople: 5,
            start: new Date(),
            end: new Date(),
            ownerID: '',
            chatId: '',
            isPrivate: true,
          },
        ],
        '2021-04-23': [],
        '2021-04-24': [],
        '2021-04-25': [],
        '2021-04-26': [],
        '2021-04-27': [
          {
            name: 'PCO - Labo train',
            description: 'Laboratoire train PCO',
            tags: [{ name: 'PCO' }, { name: 'Laboratoire' }],
            locationID: '',
            locationName: 'Salle G04',
            nbPeople: 4,
            maxPeople: 10,
            start: new Date(),
            end: new Date(),
            ownerID: '',
            chatId: '',
            isPrivate: false,
          },
        ],
        '2021-04-28': [],
      }}
      markingType={'simple'}
      loadItemsForMonth={(month) => {
        // TODO : load meetings
      }}
      onDayChange={(day) => {
        // TODO : load older meetings
      }}
      selected={'2021-04-19'}
      minDate={'2020-04-19'}
      maxDate={'2022-04-19'}
      pastScrollRange={1}
      futureScrollRange={1}
      renderItem={(item) => {
        return (
          <View style={styles.meetings}>
            <View style={styles.meeting}>
              <MeetingComponent
                meeting={item}
                isOwner={false}
                isChatable={true}
                isInCalendar={true}
              />
            </View>
          </View>
        );
      }}
      renderEmptyDate={() => {
        return <View></View>;
      }}
      renderKnob={() => {
        return (
          <View style={{ marginTop: -15 }}>
            <IconButton
              icon={Globals.ICONS.ARROW_DOWN}
              size={Globals.SIZES.ICON_MENU}
              color={Globals.COLORS.GRAY}
            />
          </View>
        );
      }}
      // Specify what should be rendered instead of ActivityIndicator
      renderEmptyData={() => {
        return <Text />;
      }}
      rowHasChanged={(r1: Meeting, r2: Meeting) => {
        return r1.name !== r2.name;
      }}
      onRefresh={() => console.log('refreshing...')}
      refreshing={false}
      refreshControl={null}
      theme={{
        agendaDayTextColor: Globals.COLORS.TEXT,
        agendaDayNumColor: Globals.COLORS.TEXT,
        agendaTodayColor: Globals.COLORS.PRIMARY,
        agendaKnobColor: Globals.COLORS.PRIMARY,
      }}
    />
  );
};

export default observer(Home);
