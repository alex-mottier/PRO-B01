/**
 * @file    GoogleButton.tsx
 * @author  Alexandre Mottier
 * @date    27.03.2021
 * @brief   Google button Component
 */

import * as React from 'react';
import Globals from '../../app/context/Globals';
import CustomButton from './CustomButton';

interface IProps {
  onPress: () => void;
}

const GoogleButton: React.FC<IProps> = ({ onPress }) => {
  return (
    <CustomButton
      icon={Globals.ICONS.GOOGLE}
      color={Globals.COLORS.GOOGLE}
      onPress={onPress}
      text={'Google'}
    />
  );
};

export default GoogleButton;
