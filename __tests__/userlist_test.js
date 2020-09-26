import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import UsersList from '../Screens/UsersList';

it('match snapshot', () => {
  const snap = renderer.create(<UsersList />).toJSON();
  expect(snap).toMatchSnapshot();
});
