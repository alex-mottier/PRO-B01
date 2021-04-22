/**
 * @file    HostDetails.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Host details page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar, Text, Title, Chip } from 'react-native-paper';
import styles from './styles';
import { observer } from 'mobx-react-lite';
import GlobalStore from '../../../app/stores/GlobalStore';
import { Host, Tag } from '../../../app/models/ApplicationTypes';
import { colors } from '../../../app/context/Theme';
import LoadingComponent from '../../../components/Loading/LoadingComponent';

const HostDetails: React.FC = () => {
  /* Usage of MobX global state store */
  const store = React.useContext(GlobalStore);

  /* Component states */
  const [isLoading, setIsLoading] = React.useState(true);
  const [host, setHost] = React.useState<Host | null>();

  /* Local variables */
  let nbColors = 0;

  /**
   * Action when component is loaded
   */
  React.useEffect(() => {
    setIsLoading(true);
    void store.loadHost().then(() => {
      setHost(store.hostToDisplay);
      setIsLoading(false);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.room}>
                <Avatar.Image size={80} source={require('../../../../assets/HEIG-VD.png')} />
                <Title style={styles.title}>{host?.name}</Title>
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.gray}>{host?.description}</Text>
              <View>
                <Text>
                  {host?.address.street} {host?.address.streetNb}, {host?.address.npa}{' '}
                  {host?.address.cityName}
                </Text>
              </View>
              <View style={styles.chips}>
                {host?.tags?.map((tag: Tag) => {
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
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(HostDetails);
