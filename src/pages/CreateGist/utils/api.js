import api, { getOptions } from '../../../utils/api';

export const createGistAPI = (description, filesData) => {
  const body = createBody(description, filesData, true);
  return api.post(
    `https://api.github.com/gists`,
    getOptions(true, body),
    'json'
  );
};

export const updateGistAPI = (id, description, filesData) => {
  const body = createBody(description, filesData);
  return api.patch(
    `https://api.github.com/gists/${id}`,
    getOptions(true, body),
    'json'
  );
};

const createBody = (description, filesData, isPublic) => {
  const body = { description, files: createFilesDataforApi(filesData) };
  if (isPublic) body.public = isPublic;
  return JSON.stringify(body);
};

const createFilesDataforApi = (filesData) => {
  const files = {};
  filesData.forEach((fileData) => {
    const { filename, content } = fileData;
    files[filename] = { filename, content };
  });
  return files;
};
