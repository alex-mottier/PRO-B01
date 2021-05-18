/**
 * @file    CovidData.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    07.05.2021
 * @brief   Host covid data editing page
 */

import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import { Button, Switch, Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStores } from '../../app/stores/StoresContext';
import LoadingComponent from '../Loading/LoadingComponent';
import styles from './styles';
import Globals from '../../app/context/Globals';
import { observer } from 'mobx-react-lite';
import Strings from '../../app/context/Strings';

const CovidDataComponent: React.FC = () => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  /* Usage of MobX global state store */
  const { authenticationStore } = useStores();
  /* Component states */
  const host = authenticationStore.authenticatedHost;
  const [isOpen, setIsOpen] = React.useState<boolean>(host ? host.covidData.isOpen : true);
  const [faceMask, setFaceMask] = React.useState<boolean>(
    host ? host.covidData.masksRequired : true,
  );
  const [disinfection, setDisinfection] = React.useState<boolean>(
    host ? host.covidData.disinfectionRequired : true,
  );
  const [distancing, setDistancing] = React.useState<string>(
    host ? host.covidData.recommendedDistancing : '',
  );
  const [comments, setComments] = React.useState<string>(host ? host.covidData.comments : '');
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Action done when submit button is pressed
   */
  const handleSubmit = async () => {
    setIsLoading(true);
    const newHost = Object.assign({}, authenticationStore.authenticatedHost);
    if (newHost) {
      newHost.covidData = {
        isOpen: isOpen,
        masksRequired: faceMask,
        disinfectionRequired: disinfection,
        recommendedDistancing: distancing,
        comments: comments,
      };
      await authenticationStore.updateHost(newHost);
    }
    setIsLoading(false);
    navigation.goBack();
  };

  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 15 }}>
        <LoadingComponent />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={Globals.ICONS.OPEN}
          color={Globals.COLORS.GRAY}
          size={Globals.SIZES.ICON_BUTTON}
          style={styles.icon}
        />
        <Text style={styles.gray}>{Strings.HOST_OPEN}</Text>
        <Switch
          value={isOpen}
          color={Globals.COLORS.PRIMARY}
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onValueChange={() => setIsOpen(!isOpen)}
        />
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={Globals.ICONS.FACEMASK}
          color={Globals.COLORS.GRAY}
          size={Globals.SIZES.ICON_BUTTON}
          style={styles.icon}
        />
        <Text style={styles.gray}>{Strings.MASKS_REQUIRED}</Text>
        <Switch
          value={faceMask}
          color={Globals.COLORS.PRIMARY}
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onValueChange={() => setFaceMask(!faceMask)}
        />
      </View>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={Globals.ICONS.DISINFECTION}
          color={Globals.COLORS.GRAY}
          size={Globals.SIZES.ICON_BUTTON}
          style={styles.icon}
        />
        <Text style={styles.gray}>{Strings.DISINFECTION_REQUIRED}</Text>
        <Switch
          value={disinfection}
          color={Globals.COLORS.PRIMARY}
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onValueChange={() => setDisinfection(!disinfection)}
        />
      </View>
      <TextInput
        label="Distanciation"
        value={distancing}
        onChangeText={setDistancing}
        style={styles.fields}
        mode={'outlined'}
      />

      <TextInput
        label="Commentaires"
        value={comments}
        onChangeText={setComments}
        style={styles.fields}
        mode={'outlined'}
      />
      <Button
        icon={Globals.ICONS.SEND}
        mode="contained"
        color={Globals.COLORS.PRIMARY}
        labelStyle={{ color: Globals.COLORS.WHITE }}
        onPress={handleSubmit}
        style={styles.button}>
        {Strings.SAVE}
      </Button>
    </View>
  );
};

export default observer(CovidDataComponent);
