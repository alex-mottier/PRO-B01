/**
 * @file    TagComponent.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    10.04.2021
 * @brief   Tags component
 */

import * as React from 'react';
import { Alert, View } from 'react-native';
import {
  IconButton,
  Chip,
  TextInput,
  Text,
  Portal,
  Modal,
  Button,
  Title,
} from 'react-native-paper';
import Globals from '../../app/context/Globals';
import { colors } from '../../app/context/Theme';
import { Tag } from '../../app/models/ApplicationTypes';
import styles from './styles';

interface IProps {
  tags: Tag[];
  addTag(tag: Tag): void;
  removeTag(tag: Tag): void;
}

const TagsComponent: React.FC<IProps> = ({ tags, addTag, removeTag }) => {
  const [tagName, setTagName] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  let nbColors = 0;

  /**
   * Action when adding a tag
   */
  const handleAddTag = () => {
    if (tagName !== '') {
      setModalVisible(false);
      addTag({ name: tagName });
      setTagName('');
    } else {
      Alert.alert('Tag nul', 'Veuillez saisir un tag non nul');
    }
  };

  return (
    <View>
      <View style={styles.tags}>
        <Text style={{ color: 'gray' }}>Tags</Text>
        <IconButton
          icon={Globals.ICONS.ADD_TAG}
          size={Globals.SIZES.ICON_MENU}
          color={Globals.COLORS.PRIMARY}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.chips}>
        {tags.map((tag: Tag) => {
          return (
            <Chip
              key={tag.name}
              onClose={() => removeTag(tag)}
              style={[styles.chip, { backgroundColor: colors[nbColors++ % colors.length] }]}>
              {tag.name}
            </Chip>
          );
        })}
      </View>
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.container}>
          <View style={styles.modal}>
            <View style={styles.close}>
              <IconButton
                icon={Globals.ICONS.CLOSE_LOCATION}
                size={Globals.SIZES.ICON_BUTTON}
                color={Globals.COLORS.GRAY}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <Title style={styles.title}>Ajout de tags</Title>
            <TextInput
              label="Nom du tag"
              value={tagName}
              onChangeText={(tag) => setTagName(tag)}
              style={styles.field}
            />
            <Button
              icon={Globals.ICONS.ADD_TAG}
              mode="contained"
              color={Globals.COLORS.PRIMARY}
              labelStyle={{ color: Globals.COLORS.WHITE }}
              onPress={handleAddTag}
              style={styles.button}>
              Ajouter
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default TagsComponent;