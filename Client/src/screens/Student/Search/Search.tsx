/**
 * @file    Search.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student search page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, FAB, Modal, Portal, Provider, TextInput, Title } from 'react-native-paper';
import Globals from '../../../app/context/Globals';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import styles from './styles';
import { Location, Meeting, Tag } from '../../../app/models/ApplicationTypes';
import { mockMeetings } from '../../../mock/Meetings';
import TagsComponent from '../../../components/Tags/TagsComponent';
import SearchLocation from '../../../components/SearchLocation/SearchLocation';

const Search: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [tags, setTags] = React.useState([{ name: 'Android' }, { name: 'IOS' }]);
  const [location, setLocation] = React.useState<Location | null>(null);
  const meetings: Meeting[] = mockMeetings;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSubmit = () => {
    console.log('Filter');
  };

  const handleAddTag = (tag: Tag) => {
    tag.name = tag.name.toUpperCase();
    if (
      !tags.find((current: Tag) => {
        return current.name == tag.name;
      })
    )
      setTags([...tags, tag]);
  };

  const handleDeleteTag = (tag: Tag) => {
    const newTags = tags.filter((current: Tag) => {
      return current.name !== tag.name;
    });
    setTags(newTags);
  };

  return (
    <Provider>
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
              <FAB style={styles.fab} small icon={Globals.ICONS.FILTER} onPress={showModal} />
            </View>
            {meetings.map((meeting: Meeting) => (
              <MeetingComponent key={meeting.name} meeting={meeting} isOwner={false} />
            ))}
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.modalcontainer}>
                <View style={styles.modal}>
                  <Title style={styles.title}>Filtres</Title>
                  <View style={{ width: '100%' }}>
                    <TagsComponent
                      tags={tags}
                      addTag={(tag: Tag) => handleAddTag(tag)}
                      removeTag={(tag: Tag) => handleDeleteTag(tag)}
                    />
                  </View>
                  <View style={{ width: '100%' }}>
                    <SearchLocation
                      location={location}
                      chooseLocation={(location: Location | null) => setLocation(location)}
                    />
                  </View>
                  <Button
                    icon={Globals.ICONS.SEARCH}
                    mode="contained"
                    color={Globals.COLORS.PRIMARY}
                    labelStyle={{ color: Globals.COLORS.WHITE }}
                    onPress={handleSubmit}
                    style={styles.button}>
                    Rechercher
                  </Button>
                </View>
              </Modal>
            </Portal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default Search;
