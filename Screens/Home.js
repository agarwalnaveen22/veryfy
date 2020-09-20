import React, {Component} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../Components/Header';
import CommonMethods from '../Utilities/CommonMethods';
import CommonStyleSheets from '../Utilities/CommonStyleSheets';
import {pendingApplicants, completedApplicants} from '../Services/UserApi';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifiedApplicants: 0,
      pendingApplicants: 0,
    };
  }
  showUserList = async (type) => {
    if (type === 2) {
      let resp = await CommonMethods.getLocalStorage('totalVerifiedList');
      if (resp) {
        if (parseInt(resp) <= 0) {
          return false;
        }
      }
    } else {
      let resp = await CommonMethods.getLocalStorage('totalPendingList');
      if (resp) {
        if (parseInt(resp) <= 0) {
          return false;
        }
      }
    }
    Actions.push('user-list', {type: type});
  };
  logout = async () => {
    await CommonMethods.clearLocalStorage();
    CommonMethods.resetToPage('login');
  };
  getPendingApplicants = async () => {
    let resp = await pendingApplicants({});
    await CommonMethods.setLocalStorage(
      'pendingList',
      JSON.stringify(resp.data),
    );
    await CommonMethods.setLocalStorage(
      'totalPendingList',
      resp.data.length.toString(),
    );
    this.setState({pendingApplicants: resp.data.length});
  };
  getVerifiedApplicants = async () => {
    let resp = await completedApplicants({});
    await CommonMethods.setLocalStorage(
      'verifiedList',
      JSON.stringify(resp.data),
    );
    await CommonMethods.setLocalStorage(
      'totalVerifiedList',
      resp.data.length.toString(),
    );
    this.setState({verifiedApplicants: resp.data.length});
  };
  setApplicants = async () => {
    let resp = await CommonMethods.getLocalStorage('totalVerifiedList');
    if (resp) {
      this.setState({verifiedApplicants: resp});
    }
    let resp1 = await CommonMethods.getLocalStorage('totalPendingList');
    if (resp1) {
      this.setState({pendingApplicants: resp1});
    }
  };
  componentDidMount() {
    this.setApplicants();
  }
  render() {
    return (
      <SafeAreaView style={CommonStyleSheets.container}>
        <Header title="Dashboard" isShowLogout={true} logout={this.logout} />
        <View style={CommonStyleSheets.body}>
          <View style={[styles.boxContainer, styles.middleContainer]}>
            <TouchableOpacity
              onPress={() => this.showUserList(2)}
              style={[styles.headerContainer, styles.middleContainerHeader]}>
              <Text style={styles.headerText}>Verified Applicants</Text>
            </TouchableOpacity>
            <View style={styles.bodyContainer}>
              <View style={styles.numberContainer}>
                <Text style={[styles.numberText, styles.middleNumberText]}>
                  {this.state.verifiedApplicants}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.getVerifiedApplicants()}
                style={styles.refreshContainer}>
                <Icon name="sync" size={styles.refreshBtn.fontSize} />
              </TouchableOpacity>
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
                  {this.state.pendingApplicants}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.getPendingApplicants()}
                style={styles.refreshContainer}>
                <Icon name="sync" size={styles.refreshBtn.fontSize} />
              </TouchableOpacity>
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
    height: '140rem',
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
    height: '90rem',
  },
  numberContainer: {
    width: '100%',
    height: '60rem',
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
