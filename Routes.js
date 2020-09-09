import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from './Screens/Login';
import OtpVerify from './Screens/OtpVerify';
import Password from './Screens/Password';

const AppRouter = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar={true}>
        <Scene key="login" component={Login} />
        <Scene key="otp-verify" component={OtpVerify} />
        <Scene key="password" component={Password} />
      </Stack>
    </Router>
  );
};

export default AppRouter;
