/**
 * @file    FacebookButton.tsx
 * @author  Alexandre Mottier
 * @date    27.03.2021
 * @brief   Facebook button Component
 */

import * as React from 'react';
import { Button } from 'react-native-paper';
import Globals from '../../app/context/Globals';

interface IProps {
  onPress: () => void;
}

const FacebookButton: React.FC<IProps> = ({ onPress }) => {
  return (
    <Button icon={Globals.ICONS.FACEBOOK} color={Globals.COLORS.FACEBOOK} onPress={onPress}>
      Facebook
    </Button>
  );
};

export default FacebookButton;
