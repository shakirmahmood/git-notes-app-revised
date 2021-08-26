import { useEffect } from 'react';
import GitHubLogin from 'react-github-login';
import { useDispatch, useSelector } from 'react-redux';
import properties from '../../configurations';
import { userLogIn } from '../../redux/actionCreator';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { useStyles } from './styles';
import { loggedInUserAPI, logInAPI } from './utils/api';

const selectLoggedInUser = (state) => ({
  username: state.username,
});

function Login() {
  const classes = useStyles();
  const { client_id, redirect_uri } = properties;
  const dispatch = useDispatch();

  const { username } = useSelector(selectLoggedInUser);

  useEffect(() => {
    getLoggedInUser();
  }, [username]);

  function getLoggedInUser() {
    if (!username) {
      loggedInUserAPI().then((userData) => {
        const { avatar_url, login, html_url } = userData;
        dispatch(userLogIn(login, avatar_url, html_url));
      });
    }
  }

  const onSuccessGithub = (response) => {
    logInAPI(response.code).then((data) => {
      const accessToken = data.access_token;
      localStorage.setItem('accessToken', accessToken);
      getLoggedInUser();
    });
  };

  return (
    <div className="App" align="center">
      {!localStorage.getItem('accessToken') ? (
        <GitHubLogin
          clientId={client_id}
          onSuccess={onSuccessGithub}
          buttonText="LOGIN"
          className={`git-login ${classes.loginBtn}`}
          valid={true}
          redirectUri={redirect_uri}
          scope="gist"
        />
      ) : (
        <ProfileMenu />
      )}
    </div>
  );
}

export default Login;
