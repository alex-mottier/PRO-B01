/**
 * @file    CovidDataDisplay.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    07.05.2021
 * @brief   Host covid data display page
 */

import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import Globals from '../../app/context/Globals';
import { observer } from 'mobx-react-lite';
import { Host } from '../../app/models/ApplicationTypes';
import Strings from '../../app/context/Strings';

/**
 * Component props
 */
interface IProps {
  host: Host;
  editButtonDisplayed: boolean;
}

const CovidDataDisplay: React.FC<IProps> = ({ host, editButtonDisplayed }) => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  return (
    <Card style={styles.card} elevation={10}>
      <Card.Content>
        <View style={styles.cardTitle}>
          <Text style={styles.gray}>{Strings.COVID_DATA}</Text>
          {editButtonDisplayed && (
            <IconButton
              icon={Globals.ICONS.EDIT}
              size={Globals.SIZES.ICON_MENU}
              color={Globals.COLORS.PRIMARY}
              onPress={() => {
                navigation.navigate(Globals.NAVIGATION.HOST_EDIT_COVID);
              }}
            />
          )}
        </View>
        <View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name={Globals.ICONS.OPEN}
              color={Globals.COLORS.GRAY}
              size={Globals.SIZES.ICON_BUTTON}
              style={styles.icon}
            />
            <Text style={styles.gray}>
              {host?.covidData.isOpen ? Strings.HOST_OPEN : Strings.HOST_CLOSED}
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name={Globals.ICONS.FACEMASK}
              color={Globals.COLORS.GRAY}
              size={Globals.SIZES.ICON_BUTTON}
              style={styles.icon}
            />
            <Text style={styles.gray}>
              {host?.covidData.masksRequired ? Strings.MASKS_REQUIRED : Strings.MASKS_NOT_REQUIRED}
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name={Globals.ICONS.DISINFECTION}
              color={Globals.COLORS.GRAY}
              size={Globals.SIZES.ICON_BUTTON}
              style={styles.icon}
            />
            <Text style={styles.gray}>
              {host?.covidData.disinfectionRequired
                ? Strings.DISINFECTION_REQUIRED
                : Strings.DISINFECTION_NOT_REQUIRED}
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name={Globals.ICONS.DISTANCING}
              color={Globals.COLORS.GRAY}
              size={Globals.SIZES.ICON_BUTTON}
              style={styles.icon}
            />
            <View style={{ width: '100%' }}>
              <Text style={[styles.paragraph, styles.gray]}>
                {host?.covidData.recommendedDistancing === ''
                  ? Strings.DISTANCING_NULL
                  : host?.covidData.recommendedDistancing}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name={Globals.ICONS.ABC}
              color={Globals.COLORS.GRAY}
              size={Globals.SIZES.ICON_BUTTON}
              style={styles.icon}
            />
            <View style={{ width: '100%' }}>
              <Text style={[styles.paragraph, styles.gray]}>
                {host?.covidData.comments === '' ? Strings.COMMENTS_NULL : host?.covidData.comments}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default observer(CovidDataDisplay);
