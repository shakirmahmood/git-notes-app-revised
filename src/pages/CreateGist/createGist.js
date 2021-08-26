import { useEffect, useState } from 'react';
import { fetchGist } from '../../utils/api';
import { createGistAPI, updateGistAPI } from './utils/api';

export const fileDataTemplate = {
  description: '',
  filesData: [{ filename: '', content: '' }],
};

export const useFilesData = (id) => {
  const [files, setFilesData] = useState(fileDataTemplate);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchGist(id, true).then((data) => {
      if (data) {
        const { transformedGist, filesContent } = data;
        const filesData = addFilesDataToGist(filesContent, transformedGist);
        setFilesData({
          filesData,
          description: transformedGist.description,
        });
      }
      setLoading(false);
    });
  }, [id]);
  return { files, setFilesData, loading, setLoading };
};

export const createGist = (filesData, description, history) => {
  createGistAPI(description, filesData).then((data) => {
    history.push(`/gist-details/${data.id}`);
  });
};

export const updateGist = (id, filesData, description, history) => {
  updateGistAPI(id, description, filesData).then(() => {
    history.push(`/gist-details/${id}`);
  });
};

const addFilesDataToGist = (filesContent, transformedGist) => {
  return filesContent.map((fileContent, index) => ({
    ...transformedGist.files[index],
    content: fileContent,
  }));
};
