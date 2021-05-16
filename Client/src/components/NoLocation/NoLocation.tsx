/**
 * @file    NoLocation.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    29.04.2021
 * @brief   No location component
 */

import * as React from 'react';
import { Button, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Globals from '../../app/context/Globals';
import { View } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Strings from '../../app/context/Strings';

const NoLocation: React.FC = () => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.row}>
        <MaterialCommunityIcons name={Globals.ICONS.SAD} color={Globals.COLORS.GRAY} size={50} />
        <Text style={styles.text}>{Strings.LOCATION_NONE}</Text>
      </View>
      <Button
        icon={Globals.ICONS.CREATE}
        mode="contained"
        color={Globals.COLORS.PRIMARY}
        labelStyle={{ color: Globals.COLORS.WHITE }}
        onPress={() => {
          navigation.navigate(Globals.NAVIGATION.HOST_CREATE_LOCATION);
        }}>
        {Strings.LOCATION_CREATE}
      </Button>
    </View>
  );
};

export default NoLocation;
