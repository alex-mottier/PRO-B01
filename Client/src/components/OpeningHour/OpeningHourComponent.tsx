/**
 * @file    OpeningHour.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    10.04.2021
 * @brief   Opening hour component
 */

import * as React from 'react';
import { View } from 'react-native';
import { IconButton, Card, Text } from 'react-native-paper';
import Globals from '../../app/context/Globals';
import { OpeningHour } from '../../app/models/ApplicationTypes';
import styles from './styles';
import { format } from 'date-fns';
import { dateLocale } from '../../app/context/DateFormat';

/**
 * Component props
 */
interface IProps {
  openingHour: OpeningHour;
}

const OpeninHourComponent: React.FC<IProps> = ({ openingHour }) => {
  /* Local variables */
  const startHour = format(new Date(openingHour.startTime), 'hh');
  const startMinute = format(new Date(openingHour.startTime), 'mm');
  const endHour = format(new Date(openingHour.endTime), 'hh');
  const endMinute = format(new Date(openingHour.endTime), 'mm');

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
              <Text>{dateLocale.dayNames[openingHour.day]}</Text>
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
