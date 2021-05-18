/**
 * @file    Profile.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    29.04.2021
 * @brief   Host profile page
 */

import * as React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar, Card, Chip, IconButton, Text, Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import styles from './styles';
import { useStores } from '../../../app/stores/StoresContext';
import Globals from '../../../app/context/Globals';
import { Tag } from '../../../app/models/ApplicationTypes';
import { colors } from '../../../app/context/Theme';
import { useNavigation } from '@react-navigation/core';
import CovidDataDisplay from '../../../components/CovidDataDisplay/CovidDataDisplay';
import Strings from '../../../app/context/Strings';

const Profile: React.FC = () => {
  /* Usage of MobX global state store */
  const { authenticationStore } = useStores();

  /** Component states */
  const [refreshing] = React.useState(false);

  /* Local variables */
  const host = authenticationStore.authenticatedHost;
  let nbColors = 0;
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {}} />}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Avatar.Image size={80} source={require('../../../../assets/HEIG-VD.png')} />
            <Title style={styles.title}>{host?.name}</Title>
          </View>
          <Card style={styles.card} elevation={10}>
            <Card.Content>
              <View style={styles.cardTitle}>
                <Text style={styles.gray}>{Strings.HOST_DATA} :</Text>
                <IconButton
                  icon={Globals.ICONS.EDIT}
                  size={Globals.SIZES.ICON_MENU}
                  color={Globals.COLORS.PRIMARY}
                  onPress={() => {
                    navigation.navigate(Globals.NAVIGATION.HOST_EDIT_HOST);
                  }}
                />
              </View>
              <View style={styles.infoWithIcon}>
                <MaterialCommunityIcons
                  name={Globals.ICONS.LOCATION}
                  color={Globals.COLORS.GRAY}
                  size={Globals.SIZES.ICON_BUTTON}
                  style={styles.icon}
                />
                <View style={{ width: '100%' }}>
                  <Text style={[styles.paragraph, styles.gray]}>
                    {host?.address.street} {host?.address.streetNb}
                  </Text>
                  <Text style={[styles.paragraph, styles.gray]}>
                    {host?.address.npa} {host?.address.cityName}
                  </Text>
                </View>
              </View>
              <View style={styles.infoWithIcon}>
                <MaterialCommunityIcons
                  name={Globals.ICONS.ABC}
                  color={Globals.COLORS.GRAY}
                  size={Globals.SIZES.ICON_BUTTON}
                  style={styles.icon}
                />
                <Text style={[styles.paragraph, styles.gray]}>{host?.description}</Text>
              </View>
              <View style={styles.cardTitle}>
                <Text style={[styles.paragraph, styles.gray]}>{Strings.TAGS} :</Text>
                <View style={styles.chips}>
                  {host?.tags.map((tag: Tag) => {
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
            </Card.Content>
          </Card>
          {host && <CovidDataDisplay host={host} editButtonDisplayed={true} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Profile);
