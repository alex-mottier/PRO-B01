/**
 * @file    Location.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    29.04.2021
 * @brief   Host's locations page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../app/context/storesContext';
import { Location } from '../../../app/models/ApplicationTypes';
import LocationComponent from '../../../components/Location/LocationComponent';
import NoLocation from '../../../components/NoLocation/NoLocation';
import styles from './styles';

const MyLocations: React.FC = () => {
  /* Usage of MobX global state store */
  const { hostStore } = useStores();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {hostStore.hostLocations && hostStore.hostLocations.length === 0 ? (
            <NoLocation />
          ) : (
            hostStore.hostLocations?.map((location: Location) => (
              <LocationComponent
                key={location.id}
                location={location}
                onChoose={() => {}}
                isAddView={false}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(MyLocations);
