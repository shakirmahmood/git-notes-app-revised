import { useEffect, useState } from 'react';
import { fetchGist } from '../../utils/api';

export const useGist = (id) => {
  const [gist, setGist] = useState(gistTemplate);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchGist(id).then(({ transformedGist }) => {
      const { id } = transformedGist;
      if (id) {
        setGist(transformedGist);
      }
      setLoading(false);
    });
  }, [id]);
  return { gist, setGist, loading };
};

const gistTemplate = {
  id: '',
  username: '',
  mainFile: {
    filename: '',
  },
  profilePic: '',
  createdSince: '',
  gistUrl: '',
  profileUrl: '',
};

export const selectUsername = (state) => state.username;
