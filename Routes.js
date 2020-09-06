import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from './Screens/Login';

const AppRouter = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar={true}>
        <Scene key="login" component={Login} />
      </Stack>
    </Router>
  );
};

export default AppRouter;
