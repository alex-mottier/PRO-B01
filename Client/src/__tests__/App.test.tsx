/**
 * @file    App.test.tsx
 * @author  Alexis Allemann
 * @date    22.03.2021
 * @brief   Test class of the main application component
 */

import * as React from 'react';
import * as renderer from 'react-test-renderer';

import App from '../App';

describe('App', () => {
  it('snapshot test', async () => {
    const tree = await renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
