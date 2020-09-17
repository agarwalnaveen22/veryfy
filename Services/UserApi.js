import Api from './Api';

export const doLogin = async (data) => {
  return await Api.post('users/login', data);
};
