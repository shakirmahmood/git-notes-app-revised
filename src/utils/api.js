import { filter } from 'ramda';
import gistTransformer from './gist-transformer';

const api = {
  get: (...args) => fetchAPIData('get', ...args),
  post: (...args) => fetchAPIData('post', ...args),
  put: (...args) => fetchAPIData('put', ...args),
  patch: (...args) => fetchAPIData('patch', ...args),
  delete: (...args) => fetchAPIData('delete', ...args),
};

export default api;

const fetchAPIData = async (method, url, options, responseType) => {
  const response = await fetch(url, { method, ...options });
  try {
    if (responseType === 'text') return await response.text();
    else if (responseType === 'json') return await response.json();
    else return response;
  } catch (error) {
    return new Error('Looks like there was a problem. Error details: ' + error);
  }
};

export const getOptions = (isAuthorized, body, contentType, contentLength) => {
  const requestBody = {
    headers: { accept: 'application/vnd.github.v3+json' },
  };
  const accessToken = localStorage.getItem('accessToken');
  requestBody.headers.Authorization =
    isAuthorized && accessToken ? `token ${accessToken}` : undefined;

  requestBody.headers['Content-Length'] = contentLength;
  requestBody.headers['Content-Type'] = contentType;
  requestBody.body = body;
  return requestBody;
};

export const fetchGist = async (id, isFileDataRequired) => {
  if (id) {
    const gist = await api.get(
      `https://api.github.com/gists/${id}`,
      getOptions(true),
      'json'
    );
    const transformedGist = gistTransformer([gist])[0];
    let filesContent = [];
    if (isFileDataRequired) {
      const fileURLs = transformedGist.files.map((file) => file.fileUrl);
      filesContent = await fetchFilesData(fileURLs);
    }
    return { transformedGist, filesContent };
  }
};

export const fetchGists = async (url, searchedText) => {
  const gists = await api.get(url, getOptions(true), 'json');
  const transformedGists = gistTransformer(gists);
  const filteredGists = searchedText
    ? filter((gist) => gist.username === searchedText, transformedGists)
    : transformedGists;
  return filteredGists;
};

const fetchFilesData = async (URLs) => {
  try {
    const responses = await Promise.all(URLs.map((URL) => fetch(URL)));
    const filesData = await responses.map((response) => response.text());
    const filesContent = await Promise.all(filesData);
    return filesContent;
  } catch (error) {
    return new Error(error);
  }
};
