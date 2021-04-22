/**
 * @file    Create.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Meeting creation page
 */

import * as React from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, IconButton, Button, Text, Card, Provider, FAB } from 'react-native-paper';
import styles from './styles';
import { Location, Meeting, Tag } from '../../../app/models/ApplicationTypes';
import Globals from '../../../app/context/Globals';
import DateTimePicker from '@react-native-community/datetimepicker';
import TagsComponent from '../../../components/Tags/TagsComponent';
import { addHours, format } from 'date-fns';
import SearchLocation from '../../../components/SearchLocation/SearchLocation';
import GlobalStore from '../../../app/stores/GlobalStore';
import { useNavigation } from '@react-navigation/native';
import LoadingComponent from '../../../components/Loading/LoadingComponent';

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
  const store = React.useContext(GlobalStore);

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
   * Validate the form
   * @returns is the form is valid
   */
  const isValid = (): boolean => {
    if (meetingName === '') {
      Alert.alert('Nom nul', 'Le nom de la réunion ne peut pas être nul');
      return false;
    } else if (meetingDescription === '') {
      Alert.alert('Description nulle', 'La description de la réunion ne peut pas être nulle');
      return false;
    } else if (startDate >= endDate) {
      Alert.alert('Erreur de date', "L'heure de fin doit être après l'heure de début");
      return false;
    } else if (tags.length === 0) {
      Alert.alert('Aucun tag', 'Veuillez définir un moins un tag à la réunion');
      return false;
    } else if (location === null) {
      Alert.alert('Aucun lieu', 'Veuillez définir le lieu de la réunion');
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
    void store
      .updateMeeting({
        id: meeting ? meeting.id : '',
        name: meetingName,
        description: meetingDescription,
        tags: tags,
        locationID: location?.id,
        locationName: location?.name,
        nbPeople: meeting ? meeting.nbPeople : 1,
        maxPeople: location.nbPeople,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        ownerID: meeting ? meeting.ownerID : '',
        chatId: meeting ? meeting.chatId : '',
        isPrivate: isPrivateOn,
      })
      .then(() => {
        Alert.alert(
          'Réunion mise à jour',
          'La réunion que vous avez soumise a bien été mise à jour',
        );
      });

    navigation.goBack();
  };

  /**
   * Action when submit button is pressed
   */
  const handleSubmit = () => {
    // Validation of form entries
    if (!isValid() || !location) return;

    // Everything is well filled => meeting can be created
    void store
      .createMeeting({
        id: '',
        name: meetingName,
        description: meetingDescription,
        tags: tags,
        locationID: location?.id,
        locationName: location?.name,
        nbPeople: 1,
        maxPeople: location.nbPeople,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        ownerID: '',
        chatId: '',
        isPrivate: isPrivateOn,
      })
      .then(() => {
        Alert.alert('Réunion crée', 'La réunion que vous avez soumise a bien été enregistrée');
      });

    handleReset();
  };

  /**
   * Reset form field states
   */
  const handleReset = () => {
    store.setMeetingToUpdate(null);
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
      void store.loadLocationToDisplay().then(() => {
        const meeting = store.meetingToUpdate;
        setMeeting(meeting);
        if (meeting) {
          setMeetingName(meeting.name);
          setIsPrivateOn(meeting.isPrivate);
          setMeetingDescription(meeting.description);
          setStartDate(new Date(meeting.startDate));
          setEndDate(new Date(meeting.endDate));
          setTags(meeting.tags);
        }

        setLocation(store.locationToDisplay);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Provider>
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
                    Créer la réunion
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
                    Modifier la réunion
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
