import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Login from './Screens/Login';
import OtpVerify from './Screens/OtpVerify';
import Password from './Screens/Password';
import Icon from 'react-native-vector-icons/FontAwesome5';
import UsersList from './Screens/UsersList';

const AppRouter = () => {
  const TabIcon = ({iconDefault, title, focused}) => {
    let size = 28;
    let source = '';
    let color = 'gray';
    switch (title) {
      case 'Home':
        source = 'home';
        color = focused ? 'black' : 'gray';
        size = 32;
        break;
      case 'Result':
        source = 'users';
        color = focused ? 'black' : 'gray';
        size = 28;
        break;
    }
    return <Icon name={source} size={size} color={color} solid={false} />;
  };
  return (
    <Router>
      <Stack key="root" hideNavBar={true}>
        <Scene key="login" component={Login} />
        <Scene key="otp-verify" component={OtpVerify} />
        <Scene key="password" component={Password} />
        <Scene
          tabs={true}
          initial
          key="tabs"
          hideNavBar={true}
          showLabel={false}>
          <Scene
            icon={TabIcon}
            key="home"
            title="Home"
            component={UsersList}
            hideNavBar={true}
          />
          <Scene
            icon={TabIcon}
            key="result"
            title="Result"
            component={OtpVerify}
            hideNavBar={true}
          />
        </Scene>
      </Stack>
    </Router>
  );
};

export default AppRouter;
