import configurations from '../../../configurations';
import api, { getOptions } from '../../../utils/api';

export const loggedInUserAPI = () => {
  return api.get('https://api.github.com/user', getOptions(true), 'json');
};

export const logInAPI = (code) => {
  const { client_id, client_secret, redirect_uri } = configurations;
  const body = `code=${encodeURIComponent(
    code
  )}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`;
  const contentType = 'application/x-www-form-urlencoded';

  return api.post(
    'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
    getOptions(undefined, body, contentType),
    'json'
  );
};
