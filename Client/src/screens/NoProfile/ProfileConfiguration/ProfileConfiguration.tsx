/**
 * @file    ProfileConfiguration.tsx
 * @author  Alexis Allemann
 * @date    27.03.2021
 * @brief   Profile configuration page
 */

import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Chip, Title } from 'react-native-paper';
import Globals from '../../../app/context/Globals';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../ProfileConfiguration/styles';

const ProfileConfiguration: React.FC = () => {
  const [isStudent, setIsStudent] = React.useState(true);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Chip
            icon={() => (
              <MaterialCommunityIcons
                name={Globals.ICONS.ADD_PROFILE}
                color={Globals.COLORS.WHITE}
                size={Globals.SIZES.ICON_HEADER}
                style={styles.icon}
              />
            )}
            disabled={isStudent}
            onPress={() => setIsStudent(true)}
            style={!isStudent ? styles.chip : [styles.chip, styles.activate]}>
            Etudiant
          </Chip>
          <Chip
            icon={() => (
              <MaterialCommunityIcons
                name={Globals.ICONS.ADD_PROFILE}
                color={Globals.COLORS.WHITE}
                size={Globals.SIZES.ICON_HEADER}
                style={styles.icon}
              />
            )}
            disabled={!isStudent}
            onPress={() => setIsStudent(false)}
            style={!isStudent ? styles.chip : [styles.chip, styles.activate]}>
            Hebergeur
          </Chip>
        </View>
        {isStudent && (
          <View>
            <Title>Je suis étudiant</Title>
          </View>
        )}
        {!isStudent && (
          <View>
            <Title>Je suis hébergeur</Title>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileConfiguration;
