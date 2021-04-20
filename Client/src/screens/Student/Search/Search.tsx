/**
 * @file    Search.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Search meeting page
 */

import * as React from 'react';
import { Platform, SafeAreaView, ScrollView, View } from 'react-native';
import {
  Button,
  FAB,
  IconButton,
  Modal,
  Portal,
  Provider,
  Text,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';
import Globals from '../../../app/context/Globals';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import styles from './styles';
import { Location, Meeting, Tag } from '../../../app/models/ApplicationTypes';
import { mockMeetings } from '../../../mock/Meetings';
import TagsComponent from '../../../components/Tags/TagsComponent';
import SearchLocation from '../../../components/SearchLocation/SearchLocation';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { addDays } from 'date-fns/esm';
import NoMeeting from '../../../components/NoMeeting/NoMeeting';
import { observer } from 'mobx-react-lite';
import GlobalStore from '../../../app/stores/GlobalStore';

const Search: React.FC = () => {
  // Usage of react native paper theme library
  const paperTheme = useTheme();

  /* Usage of MobX global state store */
  const store = React.useContext(GlobalStore);

  /* Component states */
  const [search, setSearch] = React.useState('');
  const [visible, setModalVisible] = React.useState(false);
  const [tags, setTags] = React.useState([{ name: 'Android' }, { name: 'IOS' }]);
  const [location, setLocation] = React.useState<Location | null>(null);
  const [uniqueID, setUniqueID] = React.useState('');
  const [showStartDate, setShowStartDate] = React.useState(false);
  const [showEndDate, setShowEndDate] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(addDays(new Date(), 7));

  /* Local variables */
  const meetings: Meeting[] = mockMeetings;

  /**
   * Action when start date is changed
   * @param selectedDate new date selected
   */
  const handleChangeStartDate = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowStartDate(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  /**
   * Action when end date is changed
   * @param selectedDate new date selected
   */
  const handleChangeEndDate = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setShowEndDate(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  /**
   * Action when filter button is pressed
   */
  const handleSubmit = () => {
    setModalVisible(false);
    console.log('Filter');
  };

  /**
   * Add tag to filter
   * @param tag to add
   */
  const handleAddTag = (tag: Tag) => {
    tag.name = tag.name.toUpperCase();
    if (
      !tags.find((current: Tag) => {
        return current.name == tag.name;
      })
    )
      setTags([...tags, tag]);
  };

  /**
   * Remove tag from filter
   * @param tag to remove
   */
  const handleDeleteTag = (tag: Tag) => {
    const newTags = tags.filter((current: Tag) => {
      return current.name !== tag.name;
    });
    setTags(newTags);
  };

  return (
    <Provider>
      <SafeAreaView>
        <ScrollView>
          <View style={[styles.container, { backgroundColor: paperTheme.colors.surface }]}>
            <View style={styles.search}>
              <TextInput
                label="Rechercher..."
                value={search}
                onChangeText={(username) => setSearch(username)}
                style={styles.fields}
              />
              <FAB
                style={styles.fab}
                small
                icon={Globals.ICONS.FILTER}
                onPress={() => setModalVisible(true)}
              />
            </View>
            {meetings.length === 0 ? (
              <NoMeeting />
            ) : (
              meetings.map((meeting: Meeting) => (
                <MeetingComponent
                  key={meeting.id}
                  meeting={meeting}
                  isOwner={false}
                  isChatable={true}
                  isInCalendar={false}
                />
              ))
            )}
            <Portal>
              <Modal
                visible={visible}
                onDismiss={() => setModalVisible(false)}
                contentContainerStyle={[
                  styles.modalcontainer,
                  { backgroundColor: paperTheme.colors.surface },
                ]}>
                <View style={styles.modal}>
                  <View style={styles.close}>
                    <IconButton
                      icon={Globals.ICONS.CLOSE_LOCATION}
                      size={Globals.SIZES.ICON_BUTTON}
                      color={Globals.COLORS.GRAY}
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                  <Title style={styles.title}>Filtres</Title>
                  <View style={styles.content}>
                    <TextInput
                      label="Id unique de la réunion"
                      value={uniqueID}
                      onChangeText={(id) => setUniqueID(id)}
                      style={styles.fields}
                    />
                    <View style={styles.dateHeure}>
                      <Text style={{ color: Globals.COLORS.TEXT }}>Entre les dates :</Text>
                    </View>
                    <View style={styles.date}>
                      <View style={styles.row}>
                        <Text style={{ color: Globals.COLORS.TEXT }}>
                          {format(new Date(startDate), 'dd.MM.yyyy')}
                        </Text>
                        <IconButton
                          icon={Globals.ICONS.CALENDAR}
                          size={Globals.SIZES.ICON_MENU}
                          color={Globals.COLORS.PRIMARY}
                          onPress={() => setShowStartDate(true)}
                        />
                      </View>
                      <View style={styles.row}>
                        <Text style={{ color: Globals.COLORS.TEXT }}>
                          {format(new Date(endDate), 'dd.MM.yyyy')}
                        </Text>
                        <IconButton
                          icon={Globals.ICONS.CALENDAR}
                          size={Globals.SIZES.ICON_MENU}
                          color={Globals.COLORS.PRIMARY}
                          onPress={() => setShowEndDate(true)}
                        />
                      </View>
                    </View>
                    <View style={{ width: '100%' }}>
                      <TagsComponent
                        tags={tags}
                        addTag={(tag: Tag) => handleAddTag(tag)}
                        removeTag={(tag: Tag) => handleDeleteTag(tag)}
                      />
                    </View>
                    <View style={{ width: '100%' }}>
                      <SearchLocation
                        location={location}
                        chooseLocation={(location: Location | null) => setLocation(location)}
                      />
                    </View>
                  </View>
                  <Button
                    icon={Globals.ICONS.SEARCH}
                    mode="contained"
                    color={Globals.COLORS.PRIMARY}
                    labelStyle={{ color: Globals.COLORS.WHITE }}
                    onPress={handleSubmit}
                    style={styles.button}>
                    Rechercher
                  </Button>
                  <View>
                    {showStartDate && (
                      <DateTimePicker
                        value={startDate}
                        mode={'date'}
                        display="default"
                        onChange={(_event: Event, newDate: Date | undefined) =>
                          handleChangeStartDate(newDate)
                        }
                      />
                    )}
                  </View>
                  <View>
                    {showEndDate && (
                      <DateTimePicker
                        value={endDate}
                        mode={'date'}
                        display="default"
                        onChange={(_event: Event, newDate: Date | undefined) =>
                          handleChangeEndDate(newDate)
                        }
                      />
                    )}
                  </View>
                </View>
              </Modal>
            </Portal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default observer(Search);
