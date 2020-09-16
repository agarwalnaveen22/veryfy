import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Header = (props) => {
  return (
    <View style={[styles.header, props.headerStyle]}>
      {props.headerStyle ? (
        <StatusBar backgroundColor={props.headerStyle.backgroundColor} />
      ) : null}
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  header: {
    width: '100%',
    height: '50rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$primaryColor',
  },
  headerText: {
    fontSize: '25rem',
    color: '$secondaryColor',
  },
});

export default Header;
