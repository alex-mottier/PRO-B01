/**
 * @file    EditHost.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    07.05.2021
 * @brief   Host editing page
 */

import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { useStores } from '../../../app/stores/StoresContext';
import { Host } from '../../../app/models/ApplicationTypes';
import HostData from '../../../components/HostData/HostData';
import LoadingComponent from '../../../components/Loading/LoadingComponent';

const EditHost: React.FC = () => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  /* Usage of MobX global state store */
  const { authenticationStore } = useStores();

  /* Component states */
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Action done when submit button for host tab is pressed
   */
  const handleHostSubmit = async (host: Host) => {
    setIsLoading(true);
    await authenticationStore.updateHost(host);
    setIsLoading(false);
    navigation.goBack();
  };

  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 15 }}>
        <LoadingComponent />
      </View>
    );

  return <HostData onSubmit={(host: Host) => handleHostSubmit(host)} buttonText="Modifier" />;
};

export default EditHost;
