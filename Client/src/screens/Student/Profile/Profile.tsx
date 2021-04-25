/**
 * @file    Profile.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student profile page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar, Text, Title } from 'react-native-paper';
import styles from './styles';
import { observer } from 'mobx-react-lite';
import GlobalStore from '../../../app/stores/GlobalStore';
import { Meeting } from '../../../app/models/ApplicationTypes';
import NoMeeting from '../../../components/NoMeeting/NoMeeting';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';

const Profile: React.FC = () => {
  /* Usage of MobX global state store */
  const store = React.useContext(GlobalStore);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <Avatar.Image size={80} source={require('../../../../assets/Logo.png')} />
            <Title style={styles.title}>{store.authenticatedUser?.username}</Title>
          </View>
          <Text style={styles.text}>Réunions que j&apos;ai crées :</Text>
          {store.meetingsCreatedByUser && store.meetingsCreatedByUser.length === 0 ? (
            <NoMeeting />
          ) : (
            store.meetingsCreatedByUser.map((meeting: Meeting) => (
              <MeetingComponent
                key={meeting.id}
                meeting={meeting}
                isSearchView={false}
                isChatable={true}
                isInCalendar={false}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Profile);
