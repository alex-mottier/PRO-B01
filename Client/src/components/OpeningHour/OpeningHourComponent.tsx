/**
 * @file    TagComponent.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    10.04.2021
 * @brief   Tags component
 */

import * as React from 'react';
import { View } from 'react-native';
import { IconButton, Card, Text } from 'react-native-paper';
import Globals from '../../app/context/Globals';
import { OpeningHour, Day } from '../../app/models/ApplicationTypes';
import styles from './styles';
import { format } from 'date-fns';

interface IProps {
  openingHour: OpeningHour;
}

const OpeninHourComponent: React.FC<IProps> = ({ openingHour }) => {
  const startHour = format(openingHour.startTime, 'hh');
  const startMinute = format(openingHour.startTime, 'mm');

  const endHour = format(openingHour.endTime, 'hh');
  const endMinute = format(openingHour.endTime, 'mm');

  const days = openingHour.days;
  return (
    <View>
      <Card elevation={10} style={styles.card}>
        <View style={styles.row}>
          <View style={styles.icon}>
            <IconButton
              icon={Globals.ICONS.END_TIME_OUT}
              size={Globals.SIZES.ICON_HEADER}
              color={Globals.COLORS.GRAY}
            />
          </View>
          <View style={styles.text}>
            <View style={styles.days}>
              <Text>
                {days.map((day: Day, i) => {
                  if (days.length !== i + 1) return day.name + ' - ';
                  else return day.name;
                })}
              </Text>
            </View>
            <View style={styles.hours}>
              <Text>
                {startHour}h{startMinute} - {endHour}h{endMinute}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default OpeninHourComponent;