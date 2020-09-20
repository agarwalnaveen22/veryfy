import React, {Component} from 'react';
import {View, SafeAreaView, TextInput, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CommonStyleSheets from '../Utilities/CommonStyleSheets';
import Header from '../Components/Header';
import Button from '../Components/Button';
import {doLogin} from '../Services/UserApi';
import CommonMethods from '../Utilities/CommonMethods';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPhoneNumber: false,
      phoneNumber: '9887908259',
      isPassword: false,
      password: 'Admin@123',
    };
  }
  checkVerification = async () => {
    if (this.state.phoneNumber === '') {
      this.setState({isPhoneNumber: true});
    } else if (this.state.password === '') {
      this.setState({isPassword: true, isPhoneNumber: false});
    } else {
      this.setState({isPassword: false});
      let data = {email: this.state.phoneNumber, password: this.state.password};
      let resp = await doLogin(data);
      await CommonMethods.setLocalStorage('token', resp.user.token);
      CommonMethods.resetToPage('home');
    }
  };
  render() {
    return (
      <SafeAreaView style={CommonStyleSheets.container}>
        <Header title="Login" />
        <View style={CommonStyleSheets.body}>
          <Image style={styles.logo} source={require('../Assets/Images/logo.png')} />
          <TextInput
            onChangeText={(text) => this.setState({phoneNumber: text})}
            value={this.state.phoneNumber}
            placeholder="Please enter email"
            keyboardType="email-address"
            style={[
              styles.textBox,
              this.state.isPhoneNumber ? styles.errorMessage : null,
            ]}
          />
          <TextInput
            onChangeText={(text) => this.setState({password: text})}
            secureTextEntry={true}
            value={this.state.password}
            placeholder="Please enter password"
            style={[
              styles.textBox,
              styles.passwordBox,
              this.state.isPassword ? styles.errorMessage : null,
            ]}
          />
          <View style={styles.buttonContainer}>
            <Button
              onButtonPress={() => this.checkVerification()}
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
  logo: {
    width: '100rem',
    height: '100rem',
    marginBottom: '70rem',
  },
  passwordBox: {
    marginTop: '10rem',
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
