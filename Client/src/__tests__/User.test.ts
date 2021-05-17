/**
 * @file    Student.test.ts
 * @author  Alexis Allemann & Alexandre Mottier
 * @date    22.03.2021
 * @brief   Test class of student
 */

import { Student } from '../app/models/ApplicationTypes';

describe('Student', () => {
  it('should create a new user instance', () => {
    const user: Student = { id: '1', username: 'Username' };
    expect(user).not.toBeNull();
    expect(user).not.toBeUndefined();
  });

  it('should return its name', () => {
    const user = { name: 'Username' };
    expect(user.name).toBe('Username');
  });
});
