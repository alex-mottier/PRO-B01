/**
 * @file    EditCovidData.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    07.05.2021
 * @brief   Host covid data editing page
 */

import * as React from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CovidData from '../../../components/CovidData/CovidData';
import styles from './styles';

const EditCovidData: React.FC = () => {
  return (
    <ScrollView>
      <Image
        source={require('../../../../assets/Establishment.jpg')}
        style={styles.image}
        resizeMode="cover"
        blurRadius={1}
      />
      <Image
        source={require('../../../../assets/Logo.png')}
        style={styles.logo}
        resizeMode="stretch"
      />
      <CovidData isEnabled={true} />
    </ScrollView>
  );
};

export default EditCovidData;
