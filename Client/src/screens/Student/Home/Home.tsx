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
import { Agenda } from 'react-native-calendars';
import Globals from '../../../app/context/Globals';
import { LocaleConfig } from 'react-native-calendars';
import { observer } from 'mobx-react-lite';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import { Meeting } from '../../../app/models/ApplicationTypes';
import { dateLocale } from '../../../app/context/DateFormat';

// Format date definition
LocaleConfig.locales['fr'] = dateLocale;
LocaleConfig.defaultLocale = 'fr';

const Home: React.FC = () => {
  return (
    <Agenda
      items={{
        '2021-04-17': [],
        '2021-04-18': [],
        '2021-04-19': [],
        '2021-04-20': [],
        '2021-04-21': [],
        '2021-04-22': [],
        '2021-04-23': [
          {
            id: '#1',
            name: 'PRO - Coordination',
            description: "Réunion pour coordiner l'avancement du projet",
            tags: [{ name: 'PRO' }, { name: 'Coordination' }],
            locationID: '',
            locationName: 'Salle G01',
            nbPeople: 2,
            maxPeople: 5,
            startDate: '2021-03-15T15:00:00',
            endDate: '2021-03-15T16:00:00',
            ownerID: '',
            chatId: '',
            isPrivate: true,
          },
        ],
        '2021-04-24': [],
        '2021-04-25': [],
        '2021-04-26': [],
        '2021-04-27': [],
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
        return r1.id !== r2.id;
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
      markedDates={{}}
    />
  );
};

export default observer(Home);
