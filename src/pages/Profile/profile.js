import { useEffect, useState } from 'react';
import { fetchGists } from '../../utils/api';

export const useGist = (type, username, loggedInUser, accessToken, page) => {
  const [userGists, setGists] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchGistsData(type, loggedInUser, username, page).then((gists) => {
      setGists(gists);
      setLoading(false);

      if (gists.length > 0)
        if (username === loggedInUser.username) {
          setUserData(loggedInUser);
        } else {
          const { username, profilePic, profileUrl } = gists[0];
          setUserData({ username, profilePic, profileUrl });
        }
    });
  }, [
    type,
    username,
    loggedInUser.username,
    accessToken,
    page,
    userGists.length,
  ]);

  return { userGists, setGists, userData, loading };
};

export const getState = (state) => ({
  username: state.username,
  profilePic: state.profilePic,
  profileUrl: state.profileUrl,
});

const fetchGistsData = async (type, loggedInUser, username, page) => {
  const accessToken = localStorage.getItem('accessToken');
  if ((accessToken && loggedInUser.username) || !accessToken) {
    const url =
      type === 'starred' && username === loggedInUser.username
        ? `https://api.github.com/gists/starred?per_page=2&page=${page}`
        : username !== loggedInUser.username
        ? `https://api.github.com/users/${username}/gists?per_page=2&page=${page}`
        : `https://api.github.com/gists?per_page=2&page=${page}`;
    const transformedGists = await fetchGists(url);
    return transformedGists;
  }
  return [];
};
