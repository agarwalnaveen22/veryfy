import React from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = (props) => {
  return (
    <View style={[styles.header, props.headerStyle]}>
      {props.headerStyle ? (
        <StatusBar backgroundColor={props.headerStyle.backgroundColor} />
      ) : null}
      <View style={styles.leftIconContainer} />
      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>{props.title}</Text>
      </View>
      {props.isShowLogout ? (
        <TouchableOpacity
          onPress={() => props.logout()}
          style={styles.rightIconContainer}>
          <Icon style={styles.logoutBtn} name="sign-out-alt" />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightIconContainer} />
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  header: {
    width: '100%',
    height: '50rem',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$primaryColor',
  },
  titleContainer: {
    width: '70%',
    height: '50rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    width: '15%',
    height: '50rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconContainer: {
    width: '15%',
    height: '50rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: '25rem',
    color: '$secondaryColor',
  },
  logoutBtn: {
    fontSize: '25rem',
    color: '$secondaryColor',
  },
});

export default Header;
