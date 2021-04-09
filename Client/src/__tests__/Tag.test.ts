/**
 * @file    Tag.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Test class of tags
 */

import { Tag } from '../app/models/ApplicationTypes';

describe('Tag', () => {
  const tag: Tag = { name: 'test' };
  it('should create a new tag instance', () => {
    expect(tag).not.toBeNull();
    expect(tag).not.toBeUndefined();
  });

  it('should return its name', () => {
    expect(tag.name).toBe('test');
  });
});
