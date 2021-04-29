/**
 * @file    CreateOpeningHourComponent.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    10.04.2021
 * @brief   Opening hour creation component
 */

import { addHours, format } from 'date-fns';
import * as React from 'react';
import { Alert, Platform, View } from 'react-native';
import {
  IconButton,
  Text,
  Portal,
  Modal,
  Button,
  Title,
  useTheme,
  Checkbox,
} from 'react-native-paper';
import Globals from '../../app/context/Globals';
import { OpeningHour } from '../../app/models/ApplicationTypes';
import OpeninHourComponent from '../OpeningHour/OpeningHourComponent';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { dateLocale } from '../../app/context/DateFormat';

/**
 * Component props
 */
interface IProps {
  openingHours: OpeningHour[];
  addOpeningHour(openingHour: OpeningHour[]): void;
  removeOpeningHour(openingHour: OpeningHour): void;
}

const CreateOpeningHourComponent: React.FC<IProps> = ({
  openingHours,
  addOpeningHour,
  removeOpeningHour,
}) => {
  /* Component states */
  const [modalVisible, setModalVisible] = React.useState(false);
  const [showStartTime, setShowStartTime] = React.useState(false);
  const [showEndTime, setShowEndTime] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(addHours(new Date(), 2));
  const [days, setDays] = React.useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  /** Local variables */
  let cpt = 0;

  /**
   * Action when a day is added
   * @param index of the day
   * @param checked if day is selected or not
   */
  const handleChangeDay = (index: number, checked: boolean) => {
    const newDays = [...days];
    newDays[index] = checked;
    setDays(newDays);
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
   * Action when adding a tag
   */
  const handleAddOpeningHours = () => {
    if (format(startDate, 'HH:mm') < format(endDate, 'HH:mm')) {
      setModalVisible(false);
      let cpt = 0;
      const openingHoursToAdd: OpeningHour[] = [];
      days.forEach((day) => {
        if (day) {
          openingHoursToAdd.push({
            startTime: format(startDate, 'HH:mm'),
            endTime: format(endDate, 'HH:mm'),
            day: cpt,
          });
        }
        cpt++;
      });
      addOpeningHour(openingHoursToAdd);
      setDays([false, false, false, false, false, false, false]);
    } else {
      Alert.alert('Heures incohérantes', 'Veuillez saisir des heures de début et de fin valides');
    }
  };

  return (
    <View>
      <View style={styles.openingHours}>
        <Text style={{ color: Globals.COLORS.TEXT }}>Plages horaires</Text>
        <IconButton
          icon={Globals.ICONS.ADD_TAG}
          size={Globals.SIZES.ICON_MENU}
          color={Globals.COLORS.PRIMARY}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.openingHoursList}>
        {openingHours.map((openingHour: OpeningHour) => (
          <OpeninHourComponent
            openingHour={openingHour}
            key={openingHour.day.toString() + openingHour.startTime}
          />
        ))}
      </View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={[
            styles.container,
            { backgroundColor: useTheme().colors.surface },
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
            <Title style={styles.title}>Ajout d&apos;horaires</Title>
            <View style={styles.row}>
              {days.map(() => {
                const index = cpt++;
                return (
                  <View key={index}>
                    <Text style={{ color: Globals.COLORS.TEXT }}>
                      {dateLocale.dayNamesShort[index]}
                    </Text>
                    <Checkbox
                      status={days[index] ? 'checked' : 'unchecked'}
                      onPress={() => {
                        handleChangeDay(index, !days[index]);
                      }}
                    />
                  </View>
                );
              })}
            </View>
            <View style={styles.dateHeure}>
              <Text style={{ color: Globals.COLORS.TEXT }}>Heures :</Text>
            </View>
            <View style={styles.date}>
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
            <Button
              icon={Globals.ICONS.ADD_TAG}
              mode="contained"
              color={Globals.COLORS.PRIMARY}
              labelStyle={{ color: Globals.COLORS.WHITE }}
              onPress={handleAddOpeningHours}
              style={styles.button}>
              Ajouter
            </Button>
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
        </Modal>
      </Portal>
    </View>
  );
};

export default CreateOpeningHourComponent;
