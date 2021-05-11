/**
 * @file    GoogleButton.tsx
 * @author  Alexandre Mottier
 * @date    27.03.2021
 * @brief   Google button Component
 */

import * as React from 'react';
import { Button } from 'react-native-paper';
import Globals from '../../app/context/Globals';

/**
 * Component props
 */
interface IProps {
  onPress: () => void;
}

const GoogleButton: React.FC<IProps> = ({ onPress }) => {
  return (
    <Button
      icon={Globals.ICONS.GOOGLE}
      color={Globals.COLORS.GOOGLE}
      onPress={onPress}
      mode={'contained'}
      style={{ marginTop: 10 }}>
      Google
    </Button>
  );
};

export default GoogleButton;
