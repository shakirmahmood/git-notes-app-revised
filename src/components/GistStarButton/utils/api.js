import api, { getOptions } from '../../../utils/api';

export const getStarsCount = async (username, gistId) => {
  try {
    const url = `https://cors-anywhere.herokuapp.com/https://gist.github.com/${username}/${gistId}`;
    const gistPageHTML = await api.get(url, undefined, 'text');
    const indexOfCount = gistPageHTML.indexOf('social-count');
    const str = gistPageHTML.substring(indexOfCount + 26, indexOfCount + 40);
    const count = parseInt(str.substring(0, str.indexOf('users')).trim());
    return count ? count : 0;
  } catch (error) {
    console.log(`Something went wrong. Error details are: ${error}`);
    return '0';
  }
};

export const starOrUnstarGistAPI = async (gistId, isStarred) => {
  try {
    const url = `https://api.github.com/gists/${gistId}/star`;
    const requestBody = getOptions(true, undefined, undefined, 0);
    const response = !isStarred
      ? await api.put(url, requestBody)
      : await api.delete(url, requestBody);
    return response.status === 204;
  } catch (error) {
    throw new Error(`Something went wrong. Error details are: ${error}`);
  }
};

export const checkIfStarred = async (gistId) => {
  const url = `https://api.github.com/gists/${gistId}/star`;
  try {
    const response = await api.get(url, getOptions(true));
    return response.status === 204;
  } catch (error) {
    throw new Error(`Something went wrong. Error details are: ${error}`);
  }
};
