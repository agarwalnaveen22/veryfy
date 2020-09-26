import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../Screens/Login';

it('match snapshot', () => {
  const snap = renderer.create(<Login />).toJSON();
  expect(snap).toMatchSnapshot();
});
