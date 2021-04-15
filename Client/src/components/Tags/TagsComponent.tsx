/**
 * @file    Meeting.tsx
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
  Provider,
  Title,
} from 'react-native-paper';
import Globals from '../../app/context/Globals';
import { Tag } from '../../app/models/ApplicationTypes';
import styles from './styles';

interface IProps {
  tags: Tag[];
  addTag(tag: Tag): void;
  removeTag(tag: Tag): void;
}

const TagsComponent: React.FC<IProps> = ({ tags, addTag, removeTag }) => {
  let nbColors = 0;
  const colors = [
    Globals.COLORS.YELLOW,
    Globals.COLORS.BLUE,
    Globals.COLORS.PINK,
    Globals.COLORS.ORANGE,
    Globals.COLORS.GREEN,
  ];

  const [tagName, setTagName] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleRemoveTag = (tag: Tag) => {
    removeTag(tag);
  };

  const handleAddTag = () => {
    if (tagName !== '') {
      hideModal();
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
          onPress={showModal}
        />
      </View>
      <View style={styles.chips}>
        {tags.map((tag: Tag) => {
          return (
            <Chip
              key={tag.name}
              onClose={() => handleRemoveTag(tag)}
              style={[styles.chip, { backgroundColor: colors[nbColors++ % colors.length] }]}>
              {tag.name}
            </Chip>
          );
        })}
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
          <View style={styles.modal}>
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
