import { useEffect, useState } from 'react';
import { checkIfStarred, getStarsCount } from './utils/api';

export const useStar = (gistId, username, showStarsCount) => {
  const [starsCount, setStarsCount] = useState(undefined);
  const [isStarred, setAsStarred] = useState();

  useEffect(() => {
    checkIfStarred(gistId)
      .then((response) => {
        setAsStarred(response);
      })
      .catch(() => {
        setAsStarred(false);
      });
    if (showStarsCount) {
      getStarsCount(username, gistId).then((starsCount) =>
        setStarsCount(starsCount)
      );
    }
  }, [gistId, showStarsCount]);

  return { starsCount, setStarsCount, isStarred, setAsStarred };
};
