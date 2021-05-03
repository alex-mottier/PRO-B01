/**
 * @file    FacebookButton.tsx
 * @author  Alexandre Mottier
 * @date    27.03.2021
 * @brief   Facebook button Component
 */

import * as React from 'react';
import Globals from '../../app/context/Globals';
import CustomButton from './CustomButton';

interface IProps {
  onPress: () => void;
}

const FacebookButton: React.FC<IProps> = ({ onPress }) => {
  return (
    <CustomButton
      icon={Globals.ICONS.FACEBOOK}
      color={Globals.COLORS.FACEBOOK}
      onPress={onPress}
      text={'Facebook'}
    />
  );
};

export default FacebookButton;
