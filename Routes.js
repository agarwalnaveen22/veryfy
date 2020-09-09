import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from './Screens/Login';
import OtpVerify from './Screens/OtpVerify';

const AppRouter = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar={true}>
        <Scene key="login" component={Login} />
        <Scene key="otp-verify" component={OtpVerify} />
      </Stack>
    </Router>
  );
};

export default AppRouter;
