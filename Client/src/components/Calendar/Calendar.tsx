/**
 * @file    Calendar.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    18.05.2021
 * @brief   Application calendar
 */

import * as React from 'react';
import { addMonths, format } from 'date-fns';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { View } from 'react-native';
import MeetingComponent from '../Meeting/MeetingComponent';
import styles from './styles';
import Globals from '../../app/context/Globals';
import { Meeting } from '../../app/models/ApplicationTypes';
import { IconButton } from 'react-native-paper';
import HostStore from '../../app/stores/HostStore';
import StudentStore from '../../app/stores/StudentStore';
import { dateLocale } from '../../app/context/DateFormat';
import { observer } from 'mobx-react-lite';

/**
 * Component props
 */
interface IProps {
  store: HostStore | StudentStore;
  theme: ReactNativePaper.Theme;
}

// Format date definition
LocaleConfig.locales['fr'] = dateLocale;
LocaleConfig.defaultLocale = 'fr';

const Calendar: React.FC<IProps> = ({ store, theme }) => {
  /**
   * Refresh action
   */
  const onRefresh = React.useCallback(async () => {
    await store.loadUserData();
  }, []);

  return (
    <Agenda
      onRefresh={onRefresh}
      items={store.items ? store.items : {}}
      pastScrollRange={0}
      futureScrollRange={2}
      selected={format(new Date(), 'yyyy-MM-dd')}
      minDate={format(new Date(), 'yyyy-MM-dd')}
      maxDate={format(addMonths(new Date(), 2), 'yyyy-MM-dd')}
      onDayPress={(day) => {
        const newDate = new Date(day.dateString);
        void store.generateItems(newDate);
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
                isChatView={false}
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
        calendarBackground: theme.colors.surface,
        backgroundColor: theme.colors.surface,
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

export default observer(Calendar);
