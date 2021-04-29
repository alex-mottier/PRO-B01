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
import { Chat, Message } from '../../../app/models/ApplicationTypes';
import LoadingComponent from '../../../components/Loading/LoadingComponent';
import { formatDistance } from 'date-fns';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import Globals from '../../../app/context/Globals';
import { useStores } from '../../../app/context/storesContext';

const ChatMeeting: React.FC = () => {
  /* Usage of MobX global state store */
  const { studentStore, authenticationStore } = useStores();

  /* Component states */
  const [isLoading, setIsLoading] = React.useState(true);
  const [chat, setChat] = React.useState<Chat | null>(null);
  const meeting = studentStore.meetingToUpdate;
  const authenticatedUser = authenticationStore.getAuthenticatedUser();
  const [message, setMessage] = React.useState<string>('');

  /**
   * Action done on component loading
   */
  React.useEffect(() => {
    setIsLoading(true);
    void studentStore.loadChat().then(() => {
      setChat(studentStore.chat);
      setIsLoading(false);
    });
  }, []);

  /**
   * Action done when submit button is pressed
   */
  const handleSubmit = () => {
    const user = authenticationStore.getAuthenticatedUser();
    if (user) {
      const newMessage: Message = {
        id: '',
        message: message,
        username: user.username,
        date: new Date().toISOString(),
      };
      if (chat) void studentStore.sendMessage(chat.id, newMessage);
      setMessage('');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading && <LoadingComponent />}
        {!isLoading && (
          <View style={styles.container}>
            {meeting && (
              <View style={styles.meeting}>
                <MeetingComponent
                  meeting={meeting}
                  isSearchView={false}
                  isChatable={false}
                  isInCalendar={false}
                />
              </View>
            )}
            <View style={styles.messages}>
              <SafeAreaView>
                <ScrollView>
                  {chat &&
                    chat.messages.map((message: Message) => {
                      return (
                        <View key={message.id}>
                          {message.username === authenticatedUser?.username ? (
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
