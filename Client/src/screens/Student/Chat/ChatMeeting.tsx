/**
 * @file    ChatMeeting.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    17.03.2021
 * @brief   Meeting chat page
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
  /* Usage of MobX global state store */
  const store = React.useContext(GlobalStore);

  /* Component states */
  const [isLoading, setIsLoading] = React.useState(true);
  const [chat, setChat] = React.useState<Chat | null>(null);
  const [meeting, setMeeting] = React.useState<Meeting | null>();
  const [authenticedUser, setAuthenticedUser] = React.useState<User | null>();
  const [message, setMessage] = React.useState<string>('');

  /**
   * Action done on component loading
   */
  React.useEffect(() => {
    setIsLoading(true);
    void store.loadChat().then(() => {
      setChat(store.chat);
      setMeeting(store.meetingToUpdate);
      setAuthenticedUser(store.getAuthenticatedUser());
      setIsLoading(false);
    });
  }, []);

  /**
   * Action done when submit button is pressed
   */
  const handleSubmit = () => {
    const user = store.getAuthenticatedUser();
    if (user) {
      const newMessage: Message = {
        id: '',
        message: message,
        username: user.username,
        date: new Date().toISOString(),
      };
      // currentChat['messages'].push(newMessage);
      // setChat(currentChat);
      setMessage('');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <View style={styles.container}>
            {meeting && (
              <View style={styles.meeting}>
                <MeetingComponent
                  meeting={meeting}
                  isOwner={false}
                  isChatable={false}
                  isInCalendar={false}
                />
              </View>
            )}
            <View style={styles.messages}>
              <SafeAreaView>
                <ScrollView>
                  {chat &&
                    chat?.messages.map((message: Message) => {
                      return (
                        <View key={message.id}>
                          {message.username === authenticedUser?.username ? (
                            <View style={styles.authenticedUserContainer}>
                              <View style={styles.authenticedUserMessage}>
                                <Text style={styles.authenticedUserMessageText}>
                                  {message.message}
                                </Text>
                              </View>
                              <View style={styles.authenticedUserDate}>
                                <Text style={styles.dateText}>
                                  {formatDistance(new Date(message.date), new Date(), {
                                    addSuffix: true,
                                  })}
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
                                  {formatDistance(new Date(message.date), new Date(), {
                                    addSuffix: true,
                                  })}{' '}
                                  - {message.username}
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                      );
                    })}
                </ScrollView>
              </SafeAreaView>
            </View>
            <View style={styles.message}>
              <View style={styles.row}>
                <TextInput
                  label="Tapez votre texte ici ..."
                  value={message}
                  onChangeText={(message) => setMessage(message)}
                  style={styles.fields}
                />
                <View style={styles.send}>
                  <IconButton
                    icon={Globals.ICONS.SEND}
                    size={Globals.SIZES.ICON_MENU}
                    color={Globals.COLORS.PRIMARY}
                    onPress={() => handleSubmit()}
                  />
                  <Text style={{ color: Globals.COLORS.TEXT, marginTop: -5 }}>{'Envovez'}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(ChatMeeting);
