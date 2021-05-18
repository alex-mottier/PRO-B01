/**
 * @file    ChatMeeting.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    17.03.2021
 * @brief   Meeting chat page
 */

import * as React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import styles from './styles';
import { observer } from 'mobx-react-lite';
import { Chat, Message } from '../../../app/models/ApplicationTypes';
import LoadingComponent from '../../../components/Loading/LoadingComponent';
import { formatDistance } from 'date-fns';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import Globals from '../../../app/context/Globals';
import { useStores } from '../../../app/stores/StoresContext';
import Strings from '../../../app/context/Strings';

const ChatMeeting: React.FC = () => {
  /* Usage of MobX global state store */
  const { studentStore, authenticationStore } = useStores();

  /* Component states */
  const [isLoading, setIsLoading] = React.useState(true);
  const [chat, setChat] = React.useState<Chat | null>(null);
  const meeting = studentStore.meetingToUpdate;
  const authenticatedUser = authenticationStore.authenticatedStudent;
  const [message, setMessage] = React.useState<string>('');
  const [refreshing, setRefreshing] = React.useState(false);

  /* Local variables */
  let cpt = 0;

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
    const user = authenticationStore.authenticatedStudent;
    if (user) {
      const newMessage: Message = {
        message: message,
        username: user.username,
        date: new Date().toISOString(),
      };
      if (chat) void studentStore.sendMessage(chat.id, newMessage);
      setMessage('');
    }
  };

  /**
   * Refresh action
   */
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    void studentStore.loadChat().then(() => {
      setChat(studentStore.chat);
      setRefreshing(false);
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
                  isChatView={true}
                />
              </View>
            )}
            <View>
              <SafeAreaView>
                <ScrollView>
                  {chat &&
                    chat.messages.map((message: Message) => {
                      cpt++;
                      return (
                        <View key={cpt}>
                          {message.username === authenticatedUser?.username ? (
                            <View style={styles.authenticedUserContainer}>
                              <View style={styles.authenticedUserMessage}>
                                <Text style={styles.authenticedUserMessageText}>
                                  {message.message}
                                </Text>
                              </View>
                              <View>
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
                                <Text>{message.message}</Text>
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
            <View>
              <View style={styles.row}>
                <TextInput
                  label={Strings.MESSAGE_TYPE}
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
                  <Text style={{ color: Globals.COLORS.TEXT, marginTop: -5 }}>{Strings.SEND}</Text>
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
