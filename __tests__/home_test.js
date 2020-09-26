import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../Screens/Home';

it('match snapshot', () => {
  const snap = renderer.create(<Home />).toJSON();
  expect(snap).toMatchSnapshot();
});
