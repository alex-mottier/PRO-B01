/**
 * @file    ChatMeeting.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    17.03.2021
 * @brief   Meeting chat page
 */

import * as React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { IconButton, Text, TextInput, useTheme } from 'react-native-paper';
import styles from './styles';
import { observer } from 'mobx-react-lite';
import { Chat, Message } from '../../../app/models/ApplicationTypes';
import LoadingComponent from '../../../components/Loading/LoadingComponent';
import { formatDistance } from 'date-fns';
import MeetingComponent from '../../../components/Meeting/MeetingComponent';
import Globals from '../../../app/context/Globals';
import { useStores } from '../../../app/stores/StoresContext';
import Strings from '../../../app/context/Strings';
import { useKeyboard } from '../../../components/Keyboard/Keyboard';
import { useHeaderHeight } from '@react-navigation/stack';

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
  const scrollViewRef = React.useRef();
  const [keyboardHeight] = useKeyboard();
  const headerHeight = useHeaderHeight();

  /* Local variables */
  let cpt = 0;

  /**
   * Action done on component loading
   */
  React.useEffect(() => {
    setIsLoading(true);
    const interval = setInterval(() => {
      void studentStore.loadChat().then(() => {
        setChat(studentStore.chat);
      });
    }, 5000);
    void studentStore.loadChat().then(() => {
      setChat(studentStore.chat);
      setIsLoading(false);
    });
    return () => {
      clearInterval(interval);
    };
  }, []);

  /**
   * Action done when submit button is pressed
   */
  const handleSubmit = () => {
    const user = authenticationStore.authenticatedStudent;
    if (user && message !== '') {
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
      <View style={{ maxHeight: Dimensions.get('window').height - keyboardHeight - headerHeight }}>
        <View>
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
        </View>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          {isLoading && <LoadingComponent />}
          {!isLoading && (
            <View style={styles.container}>
              {chat &&
                chat.messages.map((message: Message) => {
                  cpt++;
                  return (
                    <View key={cpt}>
                      {message.username === authenticatedUser?.username ? (
                        <View style={styles.authenticedUserContainer}>
                          <View style={styles.authenticedUserMessage}>
                            <Text style={styles.authenticedUserMessageText}>{message.message}</Text>
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
            </View>
          )}
        </ScrollView>
        <TextInput
          label={Strings.MESSAGE_TYPE}
          value={message}
          onChangeText={(message) => setMessage(message)}
          style={styles.fields}
          onSubmitEditing={handleSubmit}
          autoFocus={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default observer(ChatMeeting);
