import Api from './Api';

export const doLogin = async (data) => {
  return await Api.post('users/login', data);
};

export const pendingApplicants = async (data) => {
  return await Api.get('applicant/pending-list', data);
};

export const completedApplicants = async (data) => {
  return await Api.get('applicant/complete-list', data);
};

export const unVerifiedApplicants = async (data) => {
  return await Api.get('applicant/unverified-list', data);
};

export const saveComparisionDetails = async (data) => {
  return await Api.post('applicant/match-json', data);
};
