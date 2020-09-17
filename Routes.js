import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Home from './Screens/Home';
import Login from './Screens/Login';
import UsersList from './Screens/UsersList';

const AppRouter = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar={true}>
        <Scene key="login" component={Login} />
        <Scene key="home" component={Home} />
        <Scene key="user-list" component={UsersList} />
      </Stack>
    </Router>
  );
};

export default AppRouter;
