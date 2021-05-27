/**
 * @file    Profile.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student profile page
 */

import * as React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { Avatar, Text, Title } from 'react-native-paper';
import styles from './styles';
import { observer } from 'mobx-react-lite';
import { Meeting } from '../../../app/models/ApplicationTypes';
import NoMeeting from '../../../components/NoMeeting/NoMeeting';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import { useStores } from '../../../app/stores/StoresContext';
import Strings from '../../../app/context/Strings';

const Profile: React.FC = () => {
  /* Usage of MobX global state store */
  const { studentStore, authenticationStore } = useStores();

  /* Component states */
  const [refreshing, setRefreshing] = React.useState(false);

  /* Local variables */
  const meetings = studentStore.meetingsCreatedByUser;

  /**
   * Refresh action
   */
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await studentStore.loadMeetingsCreatedByUser();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Avatar.Image size={80} source={require('../../../../assets/Logo.png')} />
            <Title style={styles.title}>{authenticationStore.authenticatedStudent?.username}</Title>
          </View>
          <Text style={styles.text}>{Strings.MEETINGS_TO_COME} :</Text>
          {meetings && meetings.length === 0 ? (
            <NoMeeting />
          ) : (
            meetings.map((meeting: Meeting) => (
              <MeetingComponent
                key={meeting.id}
                meeting={meeting}
                isSearchView={false}
                isChatable={true}
                isInCalendar={false}
                isChatView={false}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(Profile);
