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
import { useStores } from '../../app/context/storesContext';
import LoadingComponent from '../Loading/LoadingComponent';
import styles from './styles';
import Globals from '../../app/context/Globals';

/**
 * Component props
 */
interface IProps {
  isEnabled: boolean;
}

const CovidData: React.FC<IProps> = ({ isEnabled }) => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  /* Usage of MobX global state store */
  const { authenticationStore } = useStores();

  /* Component states */
  const host = authenticationStore.getAuthenticatedHost();
  const [isOpen, setIsOpen] = React.useState(host?.covidData ? host.covidData.isOpen : true);
  const [faceMask, setFaceMask] = React.useState(
    host?.covidData ? host.covidData.masksRequired : true,
  );
  const [disinfection, setDisinfection] = React.useState(
    host?.covidData ? host.covidData.disinfectionRequired : true,
  );
  const [distancing, setDistancing] = React.useState(
    host?.covidData ? host.covidData.recommendedDistancing : '',
  );
  const [comments, setComments] = React.useState(host?.covidData ? host.covidData.comments : '');
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Action done when submit button is pressed
   */
  const handleSubmit = () => {
    setIsLoading(true);
    // TODO
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
    <View style={isEnabled && styles.container}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={Globals.ICONS.OPEN}
          color={Globals.COLORS.GRAY}
          size={Globals.SIZES.ICON_BUTTON}
          style={styles.icon}
        />
        <Text style={styles.gray}>Etablissement ouvert</Text>
        <Switch
          disabled={!isEnabled}
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
        <Text style={styles.gray}>Masques obligatoires</Text>
        <Switch
          disabled={!isEnabled}
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
        <Text style={styles.gray}>Désinfection requise</Text>
        <Switch
          disabled={!isEnabled}
          value={disinfection}
          color={Globals.COLORS.PRIMARY}
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onValueChange={() => setDisinfection(!disinfection)}
        />
      </View>
      {isEnabled && (
        <TextInput
          label="Distanciation"
          value={distancing}
          onChangeText={setDistancing}
          style={styles.fields}
          mode={'outlined'}
        />
      )}
      {isEnabled && (
        <TextInput
          disabled={!isEnabled}
          label="Commentaires"
          value={comments}
          onChangeText={setComments}
          style={styles.fields}
          mode={'outlined'}
        />
      )}
      {!isEnabled && (
        <View style={styles.row}>
          <MaterialCommunityIcons
            name={Globals.ICONS.DISTANCING}
            color={Globals.COLORS.GRAY}
            size={Globals.SIZES.ICON_BUTTON}
            style={styles.icon}
          />
          <View style={{ width: '100%' }}>
            <Text style={[styles.paragraph, styles.gray]}>2 mètres de distanciation</Text>
          </View>
        </View>
      )}
      {!isEnabled && (
        <View style={styles.row}>
          <MaterialCommunityIcons
            name={Globals.ICONS.ABC}
            color={Globals.COLORS.GRAY}
            size={Globals.SIZES.ICON_BUTTON}
            style={styles.icon}
          />
          <View style={{ width: '100%' }}>
            <Text style={[styles.paragraph, styles.gray]}>
              Le matériel de la salle doit être désinfecté lorsque vous quittez celle-ci.
            </Text>
          </View>
        </View>
      )}
      {isEnabled && (
        <Button
          icon={Globals.ICONS.SEND}
          mode="contained"
          color={Globals.COLORS.PRIMARY}
          labelStyle={{ color: Globals.COLORS.WHITE }}
          onPress={handleSubmit}
          style={styles.button}>
          Enregistrer
        </Button>
      )}
    </View>
  );
};

export default CovidData;
