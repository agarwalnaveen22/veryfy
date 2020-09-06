import React, {Component} from 'react';
import {View, SafeAreaView, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CommonStyleSheets from '../Utilities/CommonStyleSheets';
import Header from '../Components/Header';
import Button from '../Components/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPhoneNumber: false,
      phoneNumber: '',
    };
  }
  render() {
    return (
      <SafeAreaView style={CommonStyleSheets.container}>
        <Header title="Login" />
        <View style={CommonStyleSheets.body}>
          <TextInput
            onChangeText={(text) => this.setState({phoneNumber: text})}
            value={this.state.phoneNumber}
            style={[
              styles.textBox,
              this.state.isPhoneNumber ? styles.errorMessage : null,
            ]}
          />
          <View style={styles.buttonContainer}>
            <Button
              onButtonPress={() => console.log('here')}
              buttonCaption="Login"
              buttonStyle={styles.button}
              buttonTextStyle={styles.buttonText}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = EStyleSheet.create({
  textBox: {
    width: '80%',
    height: '50rem',
    borderWidth: '1rem',
    paddingStart: '10rem',
    fontSize: '20rem',
    borderRadius: '10rem',
    borderColor: '$primaryColor',
  },
  buttonContainer: {
    marginTop: '50rem',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    height: '50rem',
    backgroundColor: '$primaryColor',
  },
  buttonText: {
    color: '$secondaryColor',
  },
  errorMessage: {
    borderColor: '$errorColor',
  },
});

export default Login;
