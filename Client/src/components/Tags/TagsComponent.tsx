/**
 * @file    Meeting.tsx
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    10.04.2021
 * @brief   Tags component
 */

import * as React from 'react';
import { View } from 'react-native';
import { IconButton, Chip, TextInput } from 'react-native-paper';
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

  const handleRemoveTag = (tag: Tag) => {
    console.log('Deleting tag');
    removeTag(tag);
  };

  const handleAddTag = () => {
    console.log('add tag');
    addTag({ name: tagName });
    setTagName('');
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          label="Ajouter un tag..."
          value={tagName}
          onChangeText={(tag) => setTagName(tag)}
          style={styles.field}
        />
        <IconButton
          icon={Globals.ICONS.ADD_TAG}
          size={Globals.SIZES.ICON_BUTTON}
          color={Globals.COLORS.PRIMARY}
          onPress={() => handleAddTag()}
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
    </View>
  );
};

export default TagsComponent;
