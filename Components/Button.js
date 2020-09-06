import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onButtonPress}
      style={[styles.button, props.buttonStyle]}>
      <Text style={[styles.buttonText, props.buttonTextStyle]}>
        {props.buttonCaption}
      </Text>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10rem',
  },
  buttonText: {
    fontSize: '20rem',
  },
});

export default Button;
