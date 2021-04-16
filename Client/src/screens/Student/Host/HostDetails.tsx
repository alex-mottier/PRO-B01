/**
 * @file    Profile.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student profile page
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
  const [isLoading, setIsLoading] = React.useState(true);
  const [host, setHost] = React.useState<Host>();
  const store = React.useContext(GlobalStore);

  React.useEffect(() => {
    setIsLoading(true);
    setHost(store.loadMyHost());
    setIsLoading(false);
  }, []);

  let nbColors = 0;

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
                  {host?.address.streetName}, {host?.address.npa} {host?.address.city}
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
