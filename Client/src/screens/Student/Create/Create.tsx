/**
 * @file    Create.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Meeting creation page
 */

import * as React from 'react';
import { Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, IconButton, Button, Text, Card, Provider } from 'react-native-paper';
import styles from './styles';
import { Location, Tag } from '../../../app/models/ApplicationTypes';
import Globals from '../../../app/context/Globals';
import DateTimePicker from '@react-native-community/datetimepicker';
import TagsComponent from '../../../components/Tags/TagsComponent';
import { format } from 'date-fns';
import SearchLocation from '../../../components/SearchLocation/SearchLocation';
import GlobalStore from '../../../app/stores/GlobalStore';
import { observer } from 'mobx-react-lite';

const Create: React.FC = () => {
  /* Usage of MobX global state store */
  const store = React.useContext(GlobalStore);

  /* Component states */
  const meeting = store.getMeetingDefaultValues();
  const [meetingName, setMeetingName] = React.useState(meeting.name);
  const [meetingDescription, setMeetingDescription] = React.useState(meeting.description);
  const [isPrivateOn, setIsPrivateOn] = React.useState(meeting.isPrivate);
  const [showDate, setShowDate] = React.useState(false);
  const [showStartTime, setShowStartTime] = React.useState(false);
  const [showEndTime, setShowEndTime] = React.useState(false);
  const [startDate, setStartDate] = React.useState(meeting.start);
  const [endDate, setEndDate] = React.useState(meeting.end);
  const [tags, setTags] = React.useState(meeting.tags);
  const [location, setLocation] = React.useState<Location | null>(null);

  /**
   * Action when date is changed
   * @param selectedDate new date selected
   */
  const handleChangeDate = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowDate(Platform.OS === 'ios');
    setStartDate(currentDate);
    setEndDate(currentDate);
  };

  /**
   * Action when start date is changed
   * @param selectedDate new date selected
   */
  const handleChangeStartTime = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowStartTime(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  /**
   * Action when end date is changed
   * @param selectedDate new date selected
   */
  const handleChangeEndTime = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowEndTime(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  /**
   * Action when submit button is pressed
   */
  const handleSubmit = () => {
    console.log('Meeting created');
  };

  /**
   * Add a tag
   * @param tag new tag added
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
   * Remove a tag
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
          <View style={styles.container}>
            <Card style={styles.card} elevation={10}>
              <View style={styles.row}>
                <TextInput
                  label="Nom de la réunion"
                  value={meetingName}
                  onChangeText={(meetingName) => setMeetingName(meetingName)}
                  style={styles.name}
                />
                <View style={styles.private}>
                  <IconButton
                    icon={isPrivateOn ? Globals.ICONS.LOCK : Globals.ICONS.UNLOCK}
                    size={Globals.SIZES.ICON_MENU}
                    color={Globals.COLORS.PRIMARY}
                    onPress={() => setIsPrivateOn(!isPrivateOn)}
                  />
                  <Text style={{ color: Globals.COLORS.TEXT, marginTop: -5 }}>
                    {isPrivateOn ? 'Privée' : 'Publique'}
                  </Text>
                </View>
              </View>
              <TextInput
                label="Description de la réunion"
                value={meetingDescription}
                onChangeText={(meetingDescription) => setMeetingDescription(meetingDescription)}
                style={styles.fields}
              />
            </Card>
            <Card style={styles.card} elevation={10}>
              <View style={styles.dateHeure}>
                <Text style={{ color: Globals.COLORS.TEXT }}>Date / Heure :</Text>
              </View>
              <View style={styles.date}>
                <View style={styles.row}>
                  <Text style={{ color: Globals.COLORS.TEXT }}>
                    {format(startDate, 'dd.MM.yyyy')}
                  </Text>
                  <IconButton
                    icon={Globals.ICONS.CALENDAR}
                    size={Globals.SIZES.ICON_MENU}
                    color={Globals.COLORS.PRIMARY}
                    onPress={() => setShowDate(true)}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={{ color: Globals.COLORS.TEXT }}>{format(startDate, 'hh:mm')}</Text>
                  <IconButton
                    icon={Globals.ICONS.END_TIME}
                    size={Globals.SIZES.ICON_MENU}
                    color={Globals.COLORS.PRIMARY}
                    onPress={() => setShowStartTime(true)}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={{ color: Globals.COLORS.TEXT }}>{format(endDate, 'hh:mm')}</Text>
                  <IconButton
                    icon={Globals.ICONS.END_TIME}
                    size={Globals.SIZES.ICON_MENU}
                    color={Globals.COLORS.PRIMARY}
                    onPress={() => setShowEndTime(true)}
                  />
                </View>
              </View>
            </Card>
            <Card style={styles.card} elevation={10}>
              <TagsComponent
                tags={tags}
                addTag={(tag: Tag) => handleAddTag(tag)}
                removeTag={(tag: Tag) => handleDeleteTag(tag)}
              />
            </Card>
            <Card style={styles.card} elevation={10}>
              <View style={styles.row}>
                <SearchLocation
                  location={location}
                  chooseLocation={(location: Location | null) => setLocation(location)}
                />
              </View>
            </Card>
            <Button
              icon={Globals.ICONS.CREATE}
              mode="contained"
              color={Globals.COLORS.PRIMARY}
              labelStyle={{ color: Globals.COLORS.WHITE }}
              onPress={handleSubmit}
              style={styles.button}>
              Créer la réunion
            </Button>
            <View>
              {showDate && (
                <DateTimePicker
                  value={startDate}
                  mode={'date'}
                  display="default"
                  onChange={(_event: Event, newDate: Date | undefined) => handleChangeDate(newDate)}
                />
              )}
            </View>
            <View>
              {showStartTime && (
                <DateTimePicker
                  value={startDate}
                  mode={'time'}
                  display="default"
                  onChange={(_event: Event, newDate: Date | undefined) =>
                    handleChangeStartTime(newDate)
                  }
                />
              )}
            </View>
            <View>
              {showEndTime && (
                <DateTimePicker
                  value={endDate}
                  mode={'time'}
                  display="default"
                  onChange={(_event: Event, newDate: Date | undefined) =>
                    handleChangeEndTime(newDate)
                  }
                />
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default observer(Create);
