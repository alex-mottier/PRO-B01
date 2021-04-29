/**
 * @file    Profile.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    29.04.2021
 * @brief   Host profile page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import {
  Avatar,
  Card,
  Chip,
  IconButton,
  Paragraph,
  Provider,
  Text,
  Title,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import styles from './styles';
import { useStores } from '../../../app/context/storesContext';
import Globals from '../../../app/context/Globals';
import TagsComponent from '../../../components/Tags/TagsComponent';
import { Tag } from '../../../app/models/ApplicationTypes';
import { colors } from '../../../app/context/Theme';

const Profile: React.FC = () => {
  /* Usage of MobX global state store */
  const { authenticationStore } = useStores();

  /* Local variables */
  const host = authenticationStore.authenticatedHost;
  let nbColors = 0;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <Avatar.Image size={80} source={require('../../../../assets/HEIG-VD.png')} />
            <Title style={styles.title}>{host?.name}</Title>
          </View>
          <Card style={styles.card} elevation={10}>
            <Card.Content>
              <View style={styles.cardTitle}>
                <Text style={styles.gray}>Informations générales :</Text>
                <IconButton
                  icon={Globals.ICONS.EDIT}
                  size={Globals.SIZES.ICON_MENU}
                  color={Globals.COLORS.PRIMARY}
                  onPress={() => {}}
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
                <Text style={[styles.paragraph, styles.gray]}>Tags : </Text>
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
          <Card style={styles.card} elevation={10}>
            <Card.Content>
              <View style={styles.cardTitle}>
                <Text style={styles.gray}>Politique Covid :</Text>
                <IconButton
                  icon={Globals.ICONS.EDIT}
                  size={Globals.SIZES.ICON_MENU}
                  color={Globals.COLORS.PRIMARY}
                  onPress={() => {}}
                />
              </View>
              <Text style={styles.gray}>TODO</Text>
            </Card.Content>
          </Card>
          <Card style={styles.card} elevation={10}>
            <Card.Content>
              <View style={styles.cardTitle}>
                <Text style={styles.gray}>Avantages :</Text>
                <IconButton
                  icon={Globals.ICONS.CREATE}
                  size={Globals.SIZES.ICON_MENU}
                  color={Globals.COLORS.PRIMARY}
                  onPress={() => {}}
                />
              </View>
              <Text style={styles.gray}>TODO</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Profile);
