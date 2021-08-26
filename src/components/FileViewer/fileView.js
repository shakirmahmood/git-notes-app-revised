import { useEffect, useState } from 'react';
import api from '../../utils/api';

export const useFilesData = (fileUrl) => {
  const [fileData, setFileData] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    api.get(fileUrl, undefined, 'text').then((fileContent) => {
      setFileData(fileContent);
      setLoading(false);
    });
  }, [fileUrl]);

  return { fileData, loading };
};
