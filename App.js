/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, Dimensions} from 'react-native';
import AppRouter from './Routes';
import SplashScreen from 'react-native-splash-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import CommonStyleSheets from './Utilities/CommonStyleSheets';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaView style={[CommonStyleSheets.container, styles.container]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={styles.container.backgroundColor}
      />
      <AppRouter />
    </SafeAreaView>
  );
};

let {width} = Dimensions.get('window');
EStyleSheet.build({
  $rem: width / 380,
  $primaryColor: '#2e62bc',
  $secondaryColor: '#ffffff',
  $successColor: '#008000',
  $warningColor: '#CCCC00',
  $errorColor: '#ff0000',
});

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$primaryColor',
  },
});

export default App;
