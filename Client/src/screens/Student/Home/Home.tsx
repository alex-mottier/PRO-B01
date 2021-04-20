/**
 * @file    Home.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student home page
 */

import * as React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import styles from './styles';
import { Agenda, AgendaItemsMap } from 'react-native-calendars';
import Globals from '../../../app/context/Globals';
import { LocaleConfig } from 'react-native-calendars';
import { observer } from 'mobx-react-lite';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import { Meeting } from '../../../app/models/ApplicationTypes';
import { addDays, addYears, format } from 'date-fns';
import { dateLocale } from '../../../app/context/DateFormat';
import GlobalStore from '../../../app/stores/GlobalStore';

// Format date definition
LocaleConfig.locales['fr'] = dateLocale;
LocaleConfig.defaultLocale = 'fr';

const Home: React.FC = () => {
  /* Usage of MobX global state store */
  const store = React.useContext(GlobalStore);

  /* Component states */
  const [items, setItems] = React.useState<AgendaItemsMap<Meeting> | undefined>();
  const [meetings, setMeetings] = React.useState([]);

  /**
   * Action when component is loaded
   */
  React.useEffect(() => {
    generateItems(new Date());
  }, []);

  /**
   * Generate next 10 days agenda items from a given date
   * @param from date from to generate items
   */
  const generateItems = (from: Date) => {
    const nbDays = 10;
    const items = ['{ '];
    for (let i = 0; i <= nbDays; ++i) {
      items.push('"' + format(addDays(from, i), 'yyyy-MM-dd') + '" : []');
      if (i != nbDays) items.push(',');
    }
    items.push(' }');
    setItems(JSON.parse(items.join('')));
  };

  return (
    <Agenda
      items={items}
      pastScrollRange={1}
      futureScrollRange={12}
      selected={format(new Date(), 'yyyy-MM-dd')}
      minDate={format(new Date(), 'yyyy-MM-dd')}
      maxDate={format(addYears(new Date(), 1), 'yyyy-MM-dd')}
      onDayPress={(day) => {
        const newDate = new Date(day.dateString);
        console.log(newDate);
        generateItems(newDate);
      }}
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
        return r1.id !== r2.id;
      }}
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
