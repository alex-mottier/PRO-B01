/**
 * @file    Create.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student create page
 */

import * as React from 'react';
import { Platform, SafeAreaView, ScrollView, View, ViewBase } from 'react-native';
import { TextInput, Switch, IconButton, Button, Text, Card, Provider } from 'react-native-paper';
import styles from './styles';
import { Location, Meeting, Tag } from '../../../app/models/ApplicationTypes';
import Globals from '../../../app/context/Globals';
import DateTimePicker from '@react-native-community/datetimepicker';
import TagsComponent from '../../../components/Tags/TagsComponent';
import LocationComponent from '../../../components/Location/LocationComponent';
import { format } from 'date-fns';
import SearchLocation from '../../../components/SearchLocation/SearchLocation';

const Create: React.FC = () => {
  const [meetingName, setMeetingName] = React.useState('');
  const [meetingDescription, setMeetingDescription] = React.useState('');
  const [isPrivateOn, setIsPrivateOn] = React.useState(false);
  const [showDate, setShowDate] = React.useState(false);
  const [showStartTime, setShowStartTime] = React.useState(false);
  const [showEndTime, setShowEndTime] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [tags, setTags] = React.useState([{ name: 'Android' }, { name: 'IOS' }]);
  const [location, setLocation] = React.useState<Location | null>(null);

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
    tag.name = tag.name.toUpperCase();
    if (
      !tags.find((current: Tag) => {
        return current.name == tag.name;
      })
    )
      setTags([...tags, tag]);
  };

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
                    onPress={onTogglePrivate}
                  />
                  <Text style={{ color: 'gray', marginTop: -5 }}>
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
                <Text style={{ color: 'gray' }}>Date / Heure :</Text>
              </View>
              <View style={styles.date}>
                <View style={styles.row}>
                  <Text style={{ color: 'gray' }}>{format(startDate, 'dd.MM.yyyy')}</Text>
                  <IconButton
                    icon={Globals.ICONS.CALENDAR}
                    size={Globals.SIZES.ICON_MENU}
                    color={Globals.COLORS.PRIMARY}
                    onPress={() => setShowDate(true)}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={{ color: 'gray' }}>{format(startDate, 'hh:mm')}</Text>
                  <IconButton
                    icon={Globals.ICONS.END_TIME}
                    size={Globals.SIZES.ICON_MENU}
                    color={Globals.COLORS.PRIMARY}
                    onPress={() => setShowStartTime(true)}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={{ color: 'gray' }}>{format(endDate, 'hh:mm')}</Text>
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
    </Provider>
  );
};

export default Create;
