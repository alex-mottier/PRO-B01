/**
 * @file    Create.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Meeting creation page
 */

import * as React from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import {
  TextInput,
  IconButton,
  Button,
  Text,
  Card,
  Provider,
  FAB,
  useTheme,
} from 'react-native-paper';
import styles from './styles';
import { Location, Meeting, Tag } from '../../../app/models/ApplicationTypes';
import Globals from '../../../app/context/Globals';
import DateTimePicker from '@react-native-community/datetimepicker';
import TagsComponent from '../../../components/Tags/TagsComponent';
import { addHours, format } from 'date-fns';
import SearchLocation from '../../../components/SearchLocation/SearchLocation';
import { useNavigation } from '@react-navigation/native';
import LoadingComponent from '../../../components/Loading/LoadingComponent';
import { useStores } from '../../../app/stores/StoresContext';
import Strings from '../../../app/context/Strings';

/**
 * Component props
 */
interface IProps {
  isEditMode?: boolean | undefined;
}

const Create: React.FC<IProps> = ({ isEditMode }) => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  /* Usage of MobX global state store */
  const { studentStore } = useStores();

  /* Component states */
  const [meeting, setMeeting] = React.useState<Meeting | null>(null);
  const [meetingName, setMeetingName] = React.useState(meeting ? meeting.name : '');
  const [meetingDescription, setMeetingDescription] = React.useState(
    meeting ? meeting.description : '',
  );
  const [isPrivateOn, setIsPrivateOn] = React.useState(meeting ? meeting.isPrivate : false);
  const [showDate, setShowDate] = React.useState(false);
  const [showStartTime, setShowStartTime] = React.useState(false);
  const [showEndTime, setShowEndTime] = React.useState(false);
  const [startDate, setStartDate] = React.useState(
    meeting ? new Date(meeting.startDate) : new Date(),
  );
  const [endDate, setEndDate] = React.useState(
    new Date(meeting ? new Date(meeting.endDate) : addHours(new Date(), 2)),
  );
  const [tags, setTags] = React.useState<Tag[]>(meeting ? meeting.tags : []);
  const [location, setLocation] = React.useState<Location | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Action when date is changed
   * @param selectedDate new date selected
   */
  const handleChangeDate = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowDate(Platform.OS === 'ios');
    setStartDate(currentDate);
    setEndDate(addHours(currentDate, 2));
    setLocation(null);
  };

  /**
   * Action when start date is changed
   * @param selectedDate new date selected
   */
  const handleChangeStartTime = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowStartTime(Platform.OS === 'ios');
    setStartDate(currentDate);
    setEndDate(addHours(currentDate, 2));
    setLocation(null);
  };

  /**
   * Action when end date is changed
   * @param selectedDate new date selected
   */
  const handleChangeEndTime = (selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setShowEndTime(Platform.OS === 'ios');
    setEndDate(currentDate);
    setLocation(null);
  };

  /**
   * Validate the form
   * @returns is the form is valid
   */
  const isValid = (): boolean => {
    if (meetingName === '') {
      Alert.alert(Strings.ERROR_OCCURED, Strings.MEETING_NAME_NULL);
      return false;
    } else if (meetingDescription === '') {
      Alert.alert(Strings.ERROR_OCCURED, Strings.MEETING_DESCRIPTION_NULL);
      return false;
    } else if (startDate >= endDate) {
      Alert.alert(Strings.ERROR_OCCURED, Strings.MEETING_DATE_ERROR);
      return false;
    } else if (tags.length === 0) {
      Alert.alert(Strings.ERROR_OCCURED, Strings.MEETING_TAGS_NULL);
      return false;
    } else if (location === null) {
      Alert.alert(Strings.ERROR_OCCURED, Strings.MEETING_LOCATION_NULL);
      return false;
    }
    return true;
  };

  /**
   * Action when edit button is pressed
   */
  const handleEdit = () => {
    // Validation of form entries
    if (!isValid() || !location) return;

    // Everything is well filled => meeting can be udpated
    setIsLoading(true);
    void studentStore
      .updateMeeting({
        id: meeting ? meeting.id : '',
        name: meetingName,
        description: meetingDescription,
        tags: tags,
        locationID: location?.id,
        locationName: location?.name,
        membersId: meeting ? meeting.membersId : [],
        maxPeople: location.nbPeople,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        ownerID: meeting ? meeting.ownerID : '',
        chatID: meeting ? meeting.chatID : '',
        isPrivate: isPrivateOn,
      })
      .then(() => {
        navigation.goBack();
        setIsLoading(false);
      });
  };

  /**
   * Action when submit button is pressed
   */
  const handleSubmit = () => {
    // Validation of form entries
    if (!isValid() || !location) return;

    // Everything is well filled => meeting can be created
    setIsLoading(true);
    void studentStore
      .createMeeting({
        id: '',
        name: meetingName,
        description: meetingDescription,
        tags: tags,
        locationID: location?.id,
        locationName: location?.name,
        maxPeople: location.nbPeople,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        membersId: [],
        ownerID: '',
        chatID: '',
        isPrivate: isPrivateOn,
      })
      .then(() => {
        setIsLoading(false);
      });

    handleReset();
  };

  /**
   * Reset form field states
   */
  const handleReset = () => {
    studentStore.setMeetingToUpdate(null);
    setMeetingName('');
    setMeetingDescription('');
    setStartDate(new Date());
    setEndDate(addHours(new Date(), 2));
    setTags([]);
    setLocation(null);
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

  /**
   * Action when component is loaded
   */
  React.useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      void studentStore.loadLocationToDisplay().then(() => {
        const meeting = studentStore.meetingToUpdate;
        setMeeting(meeting);
        if (meeting) {
          setMeetingName(meeting.name);
          setIsPrivateOn(meeting.isPrivate);
          setMeetingDescription(meeting.description);
          setStartDate(new Date(meeting.startDate));
          setEndDate(new Date(meeting.endDate));
          setTags(meeting.tags);
        }

        setLocation(studentStore.locationToDisplay);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Provider theme={useTheme()}>
      <SafeAreaView>
        <ScrollView>
          {isLoading && (
            <View style={styles.container}>
              <LoadingComponent />
            </View>
          )}
          {!isLoading && (
            <View style={styles.container}>
              <Card style={styles.card} elevation={10}>
                <View style={styles.row}>
                  <TextInput
                    label={Strings.MEETING_NAME}
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
                      {isPrivateOn ? Strings.PRIVATE : Strings.PUBLIC}
                    </Text>
                  </View>
                </View>
                <TextInput
                  label={Strings.MEETING_DESCRIPTION}
                  value={meetingDescription}
                  onChangeText={(meetingDescription) => setMeetingDescription(meetingDescription)}
                  style={styles.fields}
                />
              </Card>
              <Card style={styles.card} elevation={10}>
                <View style={styles.dateHour}>
                  <Text style={{ color: Globals.COLORS.TEXT }}>{Strings.MEETING_DATE_TIME} :</Text>
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
                    <Text style={{ color: Globals.COLORS.TEXT }}>{format(startDate, 'HH:mm')}</Text>
                    <IconButton
                      icon={Globals.ICONS.END_TIME}
                      size={Globals.SIZES.ICON_MENU}
                      color={Globals.COLORS.PRIMARY}
                      onPress={() => setShowStartTime(true)}
                    />
                  </View>
                  <View style={styles.row}>
                    <Text style={{ color: Globals.COLORS.TEXT }}>{format(endDate, 'HH:mm')}</Text>
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
                    startDate={startDate}
                    endDate={endDate}
                  />
                </View>
              </Card>
              <View style={styles.buttons}>
                {!isEditMode && (
                  <FAB style={styles.fab} small icon={Globals.ICONS.DELETE} onPress={handleReset} />
                )}
                {!isEditMode && (
                  <Button
                    icon={Globals.ICONS.CREATE}
                    mode="contained"
                    color={Globals.COLORS.PRIMARY}
                    labelStyle={{ color: Globals.COLORS.WHITE }}
                    onPress={handleSubmit}
                    style={styles.button}>
                    {Strings.MEETING_CREATE}
                  </Button>
                )}
                {isEditMode && (
                  <Button
                    icon={Globals.ICONS.EDIT}
                    mode="contained"
                    color={Globals.COLORS.PRIMARY}
                    labelStyle={{ color: Globals.COLORS.WHITE }}
                    onPress={handleEdit}
                    style={styles.button}>
                    {Strings.MEETING_EDIT}
                  </Button>
                )}
              </View>
              <View>
                {showDate && (
                  <DateTimePicker
                    value={startDate}
                    mode={'date'}
                    display="default"
                    onChange={(_event: Event, newDate: Date | undefined) =>
                      handleChangeDate(newDate)
                    }
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
          )}
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default Create;
