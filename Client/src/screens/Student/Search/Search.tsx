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

const Search: React.FC = () => {
  const [search, setSearch] = React.useState('');

  const meetings: Meeting[] = [
    {
      name: 'PRO - Coordination',
      description: "Réunion pour coordiner l'avancement du projet",
      tags: [{ name: 'PRO' }, { name: 'Coordination' }],
      location: { name: 'Salle G02', nbPeople: 5 },
      nbPeople: 2,
      start: new Date(),
      end: new Date(),
    },
    {
      name: 'RES - Préparation TE1',
      description: 'Java IO et programmation TCP',
      tags: [{ name: 'RES' }, { name: 'Java IO' }, { name: 'TCP' }],
      location: { name: 'Bibliothèque', nbPeople: 3 },
      nbPeople: 1,
      start: new Date(),
      end: new Date(),
    },
    {
      name: 'PCO - Labo train',
      description: 'Laboratoire train PCO',
      tags: [{ name: 'PCO' }, { name: 'Laboratoire' }],
      location: { name: 'salle G04', nbPeople: 5 },
      nbPeople: 4,
      start: new Date(),
      end: new Date(),
    },
  ];

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
            <MeetingComponent key={meeting.name} meeting={meeting} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
