import {Actions} from 'react-native-router-flux';
import NetInfo from '@react-native-community/netinfo';
import {Alert, AsyncStorage} from 'react-native';

class commonMethods {
  navigateToPage = (pageName) => {
    Actions[pageName]();
  };
  navigateToBack = () => {
    Actions.pop();
  };
  replaceToPage = (pageName) => {
    Actions.replace(pageName);
  };
  resetToPage = (pageName) => {
    Actions.reset(pageName);
  };
  refreshPage = () => {
    Actions.refresh({key: Math.random()});
  };
  isInternetConnection = async () => {
    return await (await NetInfo.fetch()).isConnected;
  };
  showSuccessMessage = (message) => {
    Alert.alert(
      'Success',
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  };
  showErrorMessage = (message) => {
    Alert.alert(
      'Error',
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  };
  setLocalStorage = (key, value) => {
    return new Promise(async (resolve) => {
      try {
        await AsyncStorage.setItem(key, value);
        resolve(true);
      } catch (error) {
        this.showErrorMessage(error);
        resolve(false);
      }
    });
  };
  getLocalStorage = async (key) => {
    return new Promise(async (resolve) => {
      try {
        let resp = await AsyncStorage.getItem(key);
        resolve(resp);
      } catch (error) {
        this.showErrorMessage(error);
        resolve(false);
      }
    });
  };
  clearLocalStorage = () => {
    return new Promise(async (resolve) => {
      try {
        await AsyncStorage.clear();
        resolve(true);
      } catch (error) {
        this.showErrorMessage(error);
        resolve(false);
      }
    });
  };
  logout = async (msg = '') => {
    if (msg !== '') {
      this.showErrorMessage(msg);
    }
    await this.clearLocalStorage();
    this.resetToPage('auth');
  };
}
const CommonMethods = new commonMethods();
export default CommonMethods;
