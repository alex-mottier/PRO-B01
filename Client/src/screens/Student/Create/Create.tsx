/**
 * @file    Create.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student create page
 */

import * as React from 'react';
import { Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, Switch, IconButton, Button, Text, Card } from 'react-native-paper';
import styles from './styles';
import { Meeting, Tag } from '../../../app/models/ApplicationTypes';
import Globals from '../../../app/context/Globals';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import TagsComponent from '../../../components/Tags/TagsComponent';

const Create: React.FC = () => {
  const meeting: Meeting = {
    name: '',
    description: '',
    tags: [],
    location: { name: '', nbPeople: 0 },
    nbPeople: 0,
    start: new Date(),
    end: new Date(),
  };

  const [meetingName, setmMeetingName] = React.useState(meeting.name);
  const [meetingDescription, setMeetingDescription] = React.useState(meeting.description);
  const [isPrivateOn, setIsPrivateOn] = React.useState(false);
  const [showDate, setShowDate] = React.useState(false);
  const [showStartTime, setShowStartTime] = React.useState(false);
  const [showEndTime, setShowEndTime] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [tags, setTags] = React.useState([{ name: 'Android' }, { name: 'IOS' }]);

  const onTogglePrivate = () => setIsPrivateOn(!isPrivateOn);

  const handleChangeDate = (_event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowDate(Platform.OS === 'ios');
    setStartDate(currentDate);
    setEndDate(currentDate);
  };

  const handleChangeStartTime = (_event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowStartTime(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const handleChangeEndTime = (_event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowEndTime(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const handleSubmit = () => {
    console.log('Meeting created');
  };

  const handleAddTag = (tag: Tag) => {
    console.log('test');
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tag: Tag) => {
    console.log('test2');
    // TODO : FIX refresh of screen when delete chip
    const index = tags.indexOf(tag);
    const newTags = tags;
    delete newTags[index];
    setTags(newTags);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Card style={styles.card} elevation={10}>
            <View style={styles.row}>
              <TextInput
                label="Nom de la réunion"
                value={meetingName}
                onChangeText={(meetingName) => setmMeetingName(meetingName)}
                style={styles.name}
              />
              <Switch
                value={isPrivateOn}
                onValueChange={onTogglePrivate}
                color={Globals.COLORS.PRIMARY}
              />
              <Text>Privé</Text>
            </View>
            <TextInput
              label="Description de la réunion"
              value={meetingDescription}
              onChangeText={(meetingDescription) => setMeetingDescription(meetingDescription)}
              style={styles.fields}
            />
          </Card>
          <Card style={styles.card} elevation={10}>
            <View style={styles.row}>
              <IconButton
                icon={Globals.ICONS.CALENDAR}
                size={Globals.SIZES.ICON_BUTTON}
                color={Globals.COLORS.PRIMARY}
              />
              <Text>Date : </Text>
              <Text>{Moment(startDate).format('DD.MM.yyyy')}</Text>
              <IconButton
                icon={Globals.ICONS.EDIT}
                size={Globals.SIZES.ICON_BUTTON}
                color={Globals.COLORS.GRAY}
                size={16}
                onPress={() => setShowDate(true)}
              />
            </View>
            <View style={styles.row}>
              <IconButton
                icon={Globals.ICONS.END_TIME}
                size={Globals.SIZES.ICON_BUTTON}
                color={Globals.COLORS.PRIMARY}
              />
              <Text>Début : </Text>
              <Text>{Moment(startDate).format('hh:mm')}</Text>
              <IconButton
                icon={Globals.ICONS.EDIT}
                size={Globals.SIZES.ICON_BUTTON}
                color={Globals.COLORS.GRAY}
                size={16}
                onPress={() => setShowStartTime(true)}
              />
              <Text style={styles.marginLeft}>Fin : </Text>
              <Text>{Moment(endDate).format('hh:mm')}</Text>
              <IconButton
                icon={Globals.ICONS.EDIT}
                size={Globals.SIZES.ICON_BUTTON}
                color={Globals.COLORS.GRAY}
                size={16}
                onPress={() => setShowEndTime(true)}
                style={styles.marginRigth}
              />
            </View>
          </Card>
          <Card style={styles.card} elevation={10}>
            <TagsComponent
              tags={tags}
              addTag={(tag: Tag) => handleAddTag(tag)}
              removeTag={(tag: Tag) => handleDeleteTag(tag)}
            />
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
                onChange={handleChangeDate}
              />
            )}
          </View>
          <View>
            {showStartTime && (
              <DateTimePicker
                value={startDate}
                mode={'time'}
                display="default"
                onChange={handleChangeStartTime}
              />
            )}
          </View>
          <View>
            {showEndTime && (
              <DateTimePicker
                value={endDate}
                mode={'time'}
                display="default"
                onChange={handleChangeEndTime}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
