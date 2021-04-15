/**
 * @file    Search.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student search page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import Globals from '../../../app/context/Globals';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import styles from './styles';
import { Meeting } from '../../../app/models/ApplicationTypes';
import { mockMeetings } from '../../../mock/Meetings';

const Search: React.FC = () => {
  const [search, setSearch] = React.useState('');

  const meetings: Meeting[] = mockMeetings;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.search}>
            <TextInput
              label="Rechercher..."
              value={search}
              onChangeText={(username) => setSearch(username)}
              style={styles.fields}
            />
            <FAB
              style={styles.fab}
              small
              icon={Globals.ICONS.FILTER}
              onPress={() => console.log('Pressed')}
            />
          </View>
          {meetings.map((meeting: Meeting) => (
            <MeetingComponent key={meeting.name} meeting={meeting} isOwner={false} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
