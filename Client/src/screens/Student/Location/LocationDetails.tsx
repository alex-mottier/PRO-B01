/**
 * @file    LocationDetails.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Location details page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar, Text, Title, IconButton, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { observer } from 'mobx-react-lite';
import GlobalStore from '../../../app/stores/GlobalStore';
import { Location, OpeningHour, Tag } from '../../../app/models/ApplicationTypes';
import Globals from '../../../app/context/Globals';
import { colors } from '../../../app/context/Theme';
import OpeninHourComponent from '../../../components/OpeningHour/OpeningHourComponent';
import { useNavigation } from '@react-navigation/core';
import LoadingComponent from '../../../components/Loading/LoadingComponent';

const LocationDetails: React.FC = () => {
  /* Usage of React Navigation */
  const navigation = useNavigation();

  /* Usage of MobX global state store */
  const store = React.useContext(GlobalStore);

  /* Component states */
  const [isLoading, setIsLoading] = React.useState(true);
  const [location, setLocation] = React.useState<Location>();

  /* Local variables */
  let nbColors = 0;

  /**
   * Action when component is loaded
   */
  React.useEffect(() => {
    setIsLoading(true);
    setLocation(store.loadLocations());
    setIsLoading(false);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <View style={styles.container}>
            <View style={styles.host}>
              <Text style={styles.text}>{location?.host.name}</Text>
              <IconButton
                icon={Globals.ICONS.INFO}
                size={Globals.SIZES.ICON_HEADER}
                color={Globals.COLORS.GRAY}
                onPress={() => navigation.navigate('HostDetails')}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.room}>
                <Avatar.Image size={80} source={require('../../../../assets/Classroom.jpg')} />
                <Title style={styles.title}>{location?.name}</Title>
              </View>
              <View style={styles.nbPeople}>
                <Text style={styles.gray}>{location?.nbPeople}</Text>
                <MaterialCommunityIcons
                  name={Globals.ICONS.PROFILE}
                  color={Globals.COLORS.GRAY}
                  size={Globals.SIZES.ICON_BUTTON}
                />
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.gray}>{location?.description}</Text>
              <View style={styles.chips}>
                {location?.tags?.map((tag: Tag) => {
                  return (
                    <Chip
                      key={tag.name}
                      style={[
                        styles.chip,
                        { backgroundColor: colors[nbColors++ % colors.length] },
                      ]}>
                      {tag.name}
                    </Chip>
                  );
                })}
              </View>
              <View>
                {location?.openingHours?.map((openingHour: OpeningHour) => {
                  return (
                    <OpeninHourComponent
                      key={openingHour.id}
                      openingHour={openingHour}></OpeninHourComponent>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(LocationDetails);
