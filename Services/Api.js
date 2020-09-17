import apisauce from 'apisauce';
import CommonMethods from '../Utilities/CommonMethods';
import {Constant} from '../Utilities/Constant';

class _Api {
  api = null;
  constructor() {
    let baseURL = Constant.API_URL;
    this.api = apisauce.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 90000,
    });
  }

  sendResponse = async (response, resolve) => {
    if (response.ok) {
      resolve(response.data);
    } else if (response.status === 401) {
      CommonMethods.showErrorMessage(response.data.error.message);
      CommonMethods.logout();
      resolve(false);
    } else if (response.data !== null) {
      CommonMethods.showErrorMessage(response.data.replyMsg);
      resolve(false);
    } else {
      CommonMethods.showErrorMessage(response.originalError.message);
      resolve(false);
    }
  };

  get = async (url, data) => {
    if (await CommonMethods.isInternetConnection()) {
      await this.setToken();
      return new Promise(async (resolve) => {
        this.api.get(url, data).then((response) => {
          this.sendResponse(response, resolve);
        });
      });
    } else {
      CommonMethods.showErrorMessage('No Internet');
    }
  };

  post = async (url, data) => {
    if (await CommonMethods.isInternetConnection()) {
      await this.setToken();
      return new Promise(async (resolve) => {
        this.api.post(url, data).then((response) => {
          this.sendResponse(response, resolve);
        });
      });
    } else {
      CommonMethods.showErrorMessage('No Internet');
    }
  };

  put = async (url, data) => {
    if (await CommonMethods.isInternetConnection()) {
      await this.setToken();
      return new Promise(async (resolve) => {
        this.api.put(url, data).then((response) => {
          this.sendResponse(response, resolve);
        });
      });
    } else {
      CommonMethods.showErrorMessage('No Internet');
    }
  };

  delete = (url, data) => {
    return new Promise(async (resolve) => {
      await this.setToken();
      this.api.delete(url, data).then((response) => {
        this.sendResponse(response, resolve);
      });
    });
  };

  setToken = async () => {
    let resp = await CommonMethods.getLocalStorage('token');
    if (resp && resp !== null) {
      this.api.headers.authorization = resp;
    }
  };
}

let Api = new _Api();
export default Api;
