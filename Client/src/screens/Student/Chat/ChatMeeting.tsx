/**
 * @file    Profile.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    04.03.2021
 * @brief   Student profile page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import styles from './styles';
import { observer } from 'mobx-react-lite';
import GlobalStore from '../../../app/stores/GlobalStore';
import { Chat, Meeting, Message, User } from '../../../app/models/ApplicationTypes';
import LoadingComponent from '../../../components/Loading/LoadingComponent';
import { formatDistance } from 'date-fns';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import Globals from '../../../app/context/Globals';

const ChatMeeting: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [chat, setChat] = React.useState<Chat>();
  const [meeting, setMeeting] = React.useState<Meeting | undefined>();
  const [authenticedUser, setAuthenticedUser] = React.useState<User | null>();
  const [message, setMessage] = React.useState<string>('');
  const store = React.useContext(GlobalStore);
  let currentChat = store.loadMyChat();

  React.useEffect(() => {
    setIsLoading(true);
    setChat(currentChat);
    setMeeting(store.loadMyMeetings()[0]);
    setAuthenticedUser(store.getAuthenticatedUser());
    setIsLoading(false);
  }, []);

  const handleSubmit = () => {
    const newMessage: Message = {
      id: currentChat['messages'][currentChat['messages'].length - 1].id + 1,
      message: message,
      username: store.getAuthenticatedUser()?.name,
      date: new Date(),
    };
    currentChat['messages'].push(newMessage);
    setChat(currentChat);
    setMessage('');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <View style={styles.container}>
            <MeetingComponent
              meeting={meeting}
              isOwner={false}
              isChatable={false}></MeetingComponent>
            <View style={styles.messages}>
              {chat?.messages.map((message: Message) => {
                return (
                  <View key={message.id}>
                    {message.username === authenticedUser?.name ? (
                      <View style={styles.authenticedUserContainer}>
                        <View style={styles.authenticedUserMessage}>
                          <Text style={styles.authenticedUserMessageText}>{message.message}</Text>
                        </View>
                        <View style={styles.authenticedUserDate}>
                          <Text style={styles.dateText}>
                            {formatDistance(message.date, new Date(), { addSuffix: true })}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.userContainer}>
                        <View style={styles.userMessage}>
                          <Text style={styles.userMessageText}>{message.message}</Text>
                        </View>
                        <View style={styles.userDate}>
                          <Text style={styles.dateText}>
                            {formatDistance(message.date, new Date(), { addSuffix: true })} -{' '}
                            {message.username}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
            <View style={styles.message}>
              <TextInput
                label="Tapez votre texte ici ..."
                value={message}
                onChangeText={(message) => setMessage(message)}
                style={styles.fields}
              />
              <View style={styles.private}>
                <IconButton
                  icon={Globals.ICONS.SEND}
                  size={Globals.SIZES.ICON_MENU}
                  color={Globals.COLORS.PRIMARY}
                  onPress={() => handleSubmit()}
                />
                <Text style={{ color: 'gray', marginTop: -5 }}>{'Envovez'}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(ChatMeeting);
