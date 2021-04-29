/**
 * @file    Home.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student home page
 */

import * as React from 'react';
import { View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import styles from './styles';
import { Agenda } from 'react-native-calendars';
import Globals from '../../../app/context/Globals';
import { LocaleConfig } from 'react-native-calendars';
import { observer } from 'mobx-react-lite';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import { Meeting } from '../../../app/models/ApplicationTypes';
import { addYears, format } from 'date-fns';
import { dateLocale } from '../../../app/context/DateFormat';
import { useStores } from '../../../app/context/storesContext';

// Format date definition
LocaleConfig.locales['fr'] = dateLocale;
LocaleConfig.defaultLocale = 'fr';

const Home: React.FC = () => {
  /* Usage of MobX global state store */
  const { studentStore } = useStores();
  const paperTheme = useTheme();
  return (
    <Agenda
      items={studentStore.items ? studentStore.items : {}}
      pastScrollRange={1}
      futureScrollRange={12}
      selected={format(new Date(), 'yyyy-MM-dd')}
      minDate={format(new Date(), 'yyyy-MM-dd')}
      maxDate={format(addYears(new Date(), 1), 'yyyy-MM-dd')}
      onDayPress={(day) => {
        const newDate = new Date(day.dateString);
        void studentStore.generateItems(newDate);
      }}
      renderItem={(item) => {
        return (
          <View style={styles.meetings}>
            <View style={styles.meeting}>
              <MeetingComponent
                meeting={item}
                isSearchView={false}
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
          <View style={styles.knob}>
            <IconButton
              icon={Globals.ICONS.ARROW_DOWN}
              size={Globals.SIZES.ICON_MENU}
              color={Globals.COLORS.GRAY}
            />
          </View>
        );
      }}
      rowHasChanged={(r1: Meeting, r2: Meeting) => {
        return r1 !== r2;
      }}
      theme={{
        calendarBackground: paperTheme.colors.surface,
        backgroundColor: paperTheme.colors.surface,
        agendaDayTextColor: Globals.COLORS.TEXT,
        agendaDayNumColor: Globals.COLORS.TEXT,
        agendaTodayColor: Globals.COLORS.PRIMARY,
        agendaKnobColor: Globals.COLORS.PRIMARY,
        dotColor: Globals.COLORS.BLUE,
        selectedDayBackgroundColor: Globals.COLORS.BLUE,
      }}
    />
  );
};

export default observer(Home);
