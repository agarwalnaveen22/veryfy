import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../Components/Header';
import CommonStyleSheets from '../Utilities/CommonStyleSheets';

class Home extends Component {
  showUserList = (type) => {
    Actions.push('user-list', {type: type});
  };
  render() {
    return (
      <SafeAreaView style={CommonStyleSheets.container}>
        <Header title="Dashboard" />
        <View style={CommonStyleSheets.body}>
          <View style={[styles.boxContainer, styles.firstContainer]}>
            <TouchableOpacity
              onPress={() => this.showUserList(1)}
              style={styles.headerContainer}>
              <Text style={styles.headerText}>Total Applicants</Text>
            </TouchableOpacity>
            <View style={styles.bodyContainer}>
              <View style={styles.numberContainer}>
                <Text style={styles.numberText}>100</Text>
              </View>
              <View style={styles.refreshContainer}>
                <Icon name="sync" size={styles.refreshBtn.fontSize} />
              </View>
            </View>
          </View>
          <View style={[styles.boxContainer, styles.middleContainer]}>
            <TouchableOpacity
              onPress={() => this.showUserList(2)}
              style={[styles.headerContainer, styles.middleContainerHeader]}>
              <Text style={styles.headerText}>Verified Applicants</Text>
            </TouchableOpacity>
            <View style={styles.bodyContainer}>
              <View style={styles.numberContainer}>
                <Text style={[styles.numberText, styles.middleNumberText]}>
                  80
                </Text>
              </View>
              <View style={styles.refreshContainer}>
                <Icon name="sync" size={styles.refreshBtn.fontSize} />
              </View>
            </View>
          </View>
          <View style={[styles.boxContainer, styles.lastContainer]}>
            <TouchableOpacity
              onPress={() => this.showUserList(3)}
              style={[styles.headerContainer, styles.lastContainerHeader]}>
              <Text style={styles.headerText}>Pending Applicants</Text>
            </TouchableOpacity>
            <View style={styles.bodyContainer}>
              <View style={styles.numberContainer}>
                <Text style={[styles.numberText, styles.lastNumberText]}>
                  20
                </Text>
              </View>
              <View style={styles.refreshContainer}>
                <Icon name="sync" size={styles.refreshBtn.fontSize} />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = EStyleSheet.create({
  boxContainer: {
    width: '70%',
    height: '25%',
    marginTop: '10rem',
    marginBottom: '10rem',
    borderWidth: '1rem',
    borderRadius: '10rem',
    borderColor: '$primaryColor',
  },
  firstContainer: {
    marginTop: 0,
  },
  middleContainer: {
    borderColor: '$successColor',
  },
  lastContainer: {
    marginBottom: 0,
    borderColor: '$warningColor',
  },
  headerContainer: {
    width: '100%',
    height: '50rem',
    borderRadius: '8rem',
    backgroundColor: '$primaryColor',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainerHeader: {
    backgroundColor: '$successColor',
  },
  lastContainerHeader: {
    backgroundColor: '$warningColor',
  },
  headerText: {
    fontSize: '18rem',
    color: '$secondaryColor',
  },
  bodyContainer: {
    width: '100%',
    height: '100%',
  },
  numberContainer: {
    width: '100%',
    height: '70rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: '28rem',
    color: '$primaryColor',
  },
  middleNumberText: {
    color: '$successColor',
  },
  lastNumberText: {
    color: '$warningColor',
  },
  refreshContainer: {
    width: '100%',
    height: '30rem',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingEnd: '10rem',
  },
  refreshBtn: {
    fontSize: '20rem',
  },
});

export default Home;
