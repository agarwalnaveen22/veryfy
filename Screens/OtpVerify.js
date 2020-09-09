import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CommonStyleSheets from '../Utilities/CommonStyleSheets';
import Header from '../Components/Header';
import Button from '../Components/Button';
import {Actions} from 'react-native-router-flux';

class OtpVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPhoneNumber: false,
      phoneNumber: '',
      timer: 59,
    };
  }
  checkVerification = () => {
    if (this.state.phoneNumber === '') {
      this.setState({isPhoneNumber: true});
    } else {
      Actions.replace('otp-verify');
    }
  };
  focusOnNext = (id, prevId, txt) => {
    if (txt === '') {
      if (prevId !== '') {
        this.refs[prevId].focus();
      }
    } else {
      if (id !== '') {
        this.refs[id].focus();
      }
    }
  };
  resendOtp = async () => {
    await this.setState({timer: 59});
    this.runTimer();
  };
  runTimer = () => {
    if (this.state.timer > 0) {
      setTimeout(async () => {
        let newTimer = parseInt(this.state.timer) - 1;
        newTimer = newTimer > 9 ? newTimer : '0' + newTimer;
        await this.setState({timer: newTimer});
        this.runTimer();
      }, 1000);
    } else {
      this.setState({timer: '00'});
    }
  };
  componentDidMount() {
    this.runTimer();
  }
  render() {
    return (
      <SafeAreaView style={CommonStyleSheets.container}>
        <Header title="Verify Mobile Number" />
        <View style={CommonStyleSheets.body}>
          <View style={styles.textBoxContainer}>
            <TextInput
              ref="pin1"
              onChangeText={(txt) => this.focusOnNext('pin2', '', txt)}
              keyboardType="number-pad"
              maxLength={1}
              style={[styles.textBox]}
            />
            <TextInput
              ref="pin2"
              onChangeText={(txt) => this.focusOnNext('pin3', 'pin1', txt)}
              keyboardType="number-pad"
              maxLength={1}
              style={[styles.textBox]}
            />
            <TextInput
              ref="pin3"
              onChangeText={(txt) => this.focusOnNext('pin4', 'pin2', txt)}
              keyboardType="number-pad"
              maxLength={1}
              style={[styles.textBox]}
            />
            <TextInput
              ref="pin4"
              onChangeText={(txt) => this.focusOnNext('', 'pin3', txt)}
              keyboardType="number-pad"
              maxLength={1}
              style={[styles.textBox, styles.lastTextBox]}
            />
          </View>
          <View style={styles.resendOtpContainer}>
            {this.state.timer > 0 ? (
              <Text style={styles.timerText}>00:{this.state.timer}</Text>
            ) : (
              <>
                <Text style={styles.receiveText}>Did not receive OTP?</Text>
                <TouchableOpacity onPress={() => this.resendOtp()}>
                  <Text style={styles.resendText}>Click to resend</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onButtonPress={() => this.checkVerification()}
              buttonCaption="Verify"
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
  textBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textBox: {
    width: '50rem',
    height: '50rem',
    marginRight: '10rem',
    borderWidth: '1rem',
    paddingStart: '10rem',
    fontSize: '20rem',
    borderRadius: '10rem',
    borderColor: '$primaryColor',
    textAlign: 'center',
  },
  lastTextBox: {
    marginRight: 0,
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
  resendOtpContainer: {
    marginTop: '50rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiveText: {
    fontSize: '15rem',
    color: '$primaryColor',
  },
  resendText: {
    fontSize: '13rem',
    borderBottomWidth: '1rem',
    borderBottomColor: '#0000FF',
    color: '#0000FF',
  },
  timerText: {
    color: '$primaryColor',
    fontSize: '15rem',
  },
});

export default OtpVerify;
