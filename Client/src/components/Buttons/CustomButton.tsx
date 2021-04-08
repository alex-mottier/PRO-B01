/**
 * @file    CustomButton.tsx
 * @author  Alexandre Mottier
 * @date    27.03.2021
 * @brief   Custom button Component
 */

import * as React from 'react';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Globals from '../../app/context/Globals';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttons: {
    width: '90%',
    marginTop: 10,
    alignItems: 'center',
  },
});

interface IProps {
  icon: string;
  color: string;
  text: string;
  onPress: () => void;
}

const CustomButton: React.FC<IProps> = ({ icon, color, onPress, text }) => {
  return (
    <Button
      icon={() => (
        <MaterialCommunityIcons
          name={icon}
          color={Globals.COLORS.WHITE}
          size={Globals.SIZES.ICON_HEADER}
        />
      )}
      mode="contained"
      style={styles.buttons}
      color={color}
      labelStyle={{ color: Globals.COLORS.WHITE }}
      onPress={onPress}>
      {text}
    </Button>
  );
};

export default CustomButton;
