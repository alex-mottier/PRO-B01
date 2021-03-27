/**
 * @file    SignUp.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Sign up page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Title } from 'react-native-paper';

const SignUp: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Title>SignUp</Title>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
