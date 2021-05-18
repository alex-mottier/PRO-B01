/**
 * @file    Create.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    29.04.2021
 * @brief   Create location page
 */

import * as React from 'react';
import { Alert, SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Card, FAB, Provider, TextInput, useTheme } from 'react-native-paper';

import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '../../../app/stores/StoresContext';
import { Location, OpeningHour, Tag } from '../../../app/models/ApplicationTypes';
import LoadingComponent from '../../../components/Loading/LoadingComponent';
import TagsComponent from '../../../components/Tags/TagsComponent';
import Globals from '../../../app/context/Globals';
import styles from './styles';
import CreateOpeningHourComponent from '../../../components/CreateOpeningHour/CreateOpeningHourComponent';
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
  const { hostStore, authenticationStore } = useStores();

  /* Component states */
  const [location, setLocation] = React.useState<Location | null>(
    isEditMode ? hostStore.locationToUpdate : null,
  );
  const [name, setName] = React.useState<string>(location ? location.name : '');
  const [description, setDescription] = React.useState<string>(
    location ? location.description : '',
  );
  const [nbPeople, setNbPeople] = React.useState<number>(location ? location.nbPeople : 0);
  const [tags, setTags] = React.useState<Tag[]>(location ? location.tags : []);
  const [openingHours, setOpeningHours] = React.useState<OpeningHour[]>(
    location ? location.openingHours : [],
  );
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Validate the form
   * @returns is the form is valid
   */
  const isValid = (): boolean => {
    if (name === '') {
      Alert.alert(Strings.ERROR_OCCURED, Strings.LOCATION_NAME_NULL);
      return false;
    } else if (description === '') {
      Alert.alert(Strings.ERROR_OCCURED, Strings.LOCATION_DESCRIPTION_NULL);
      return false;
    } else if (nbPeople <= 0) {
      Alert.alert(Strings.ERROR_OCCURED, Strings.LOCATION_NB_PEOPLE_NULL);
      return false;
    } else if (tags.length === 0) {
      Alert.alert(Strings.ERROR_OCCURED, Strings.LOCATION_TAGS_NULL);
      return false;
    } else if (openingHours.length === 0) {
      Alert.alert(Strings.ERROR_OCCURED, Strings.LOCATION_OPENING_HOURS_NULL);
      return false;
    }
    return true;
  };

  /**
   * Action when edit button is pressed
   */
  const handleEdit = () => {
    // Validation of form entries
    if (!isValid()) return;

    // Everything is well filled => meeting can be udpated
    setIsLoading(true);
    void hostStore
      .updateLocation({
        id: location ? location.id : '',
        name: name,
        description: description,
        tags: tags,
        nbPeople: nbPeople,
        openingHours: openingHours,
        hostId: location ? location.hostId : '',
        hostName: location ? location.hostName : '',
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
    if (!isValid()) return;

    // Everything is well filled => meeting can be created
    setIsLoading(true);
    const host = authenticationStore.authenticatedHost;
    void hostStore
      .createLocation({
        id: '',
        name: name,
        description: description,
        tags: tags,
        nbPeople: nbPeople,
        openingHours: openingHours,
        hostId: host ? host.id : '',
        hostName: host ? host.name : '',
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
    hostStore.setLocationToUpdate(null);
    setName('');
    setDescription('');
    setNbPeople(0);
    setTags([]);
    setOpeningHours([]);
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
   * Add an openings hours
   * @param newHours to add
   */
  const handleAddOpeningHour = (newHours: OpeningHour[]) => {
    const openingHoursToAdd: OpeningHour[] = [];
    newHours.forEach((openingHour: OpeningHour) => {
      if (
        !openingHours.find((current: OpeningHour) => {
          return (
            current.day === openingHour.day &&
            current.endTime === openingHour.endTime &&
            current.startTime === openingHour.startTime
          );
        })
      )
        openingHoursToAdd.push(openingHour);
    });
    setOpeningHours(
      openingHours.concat(openingHoursToAdd).sort((a: OpeningHour, b: OpeningHour) => {
        return a.day - b.day;
      }),
    );
  };

  /**
   * Remove an opening hour
   * @param tag to remove
   */
  const handleDeleteOpeningHour = (openingHour: OpeningHour) => {
    const newOpeningHours = openingHours.filter((current: OpeningHour) => {
      return current !== openingHour;
    });
    setOpeningHours(newOpeningHours);
  };

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
                <TextInput
                  label={Strings.LOCATION_NAME}
                  value={name}
                  onChangeText={(name) => setName(name)}
                  style={styles.name}
                />
                <TextInput
                  label={Strings.LOCATION_DESCRIPTION}
                  value={description}
                  onChangeText={(description) => setDescription(description)}
                  style={styles.fields}
                />
                <TextInput
                  label={Strings.LOCATION_NB_PEOPLE}
                  value={nbPeople.toString()}
                  onChangeText={(nbPeople) => setNbPeople(nbPeople === '' ? 0 : parseInt(nbPeople))}
                  style={styles.fields}
                  keyboardType="numeric"
                />
              </Card>
              <Card style={styles.card} elevation={10}>
                <TagsComponent
                  tags={tags}
                  addTag={(tag: Tag) => handleAddTag(tag)}
                  removeTag={(tag: Tag) => handleDeleteTag(tag)}
                />
              </Card>
              <Card style={styles.card} elevation={10}>
                <CreateOpeningHourComponent
                  openingHours={openingHours}
                  addOpeningHour={(openingHour: OpeningHour[]) => handleAddOpeningHour(openingHour)}
                  removeOpeningHour={(openingHour: OpeningHour) =>
                    handleDeleteOpeningHour(openingHour)
                  }
                />
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
                    {Strings.LOCATION_CREATE}
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
                    {Strings.LOCATION_UPDATE}
                  </Button>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default observer(Create);
