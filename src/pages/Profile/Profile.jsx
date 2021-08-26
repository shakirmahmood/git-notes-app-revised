import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FileViewer from '../../components/FileViewer/FileViewer';
import GistHeader from '../../components/GistHeader/GistHeader';
import { starOrUnstarGistAPI } from '../../components/GistStarButton/utils/api';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/Spinner/Spinner';
import GistToolbar from '../../components/GistToolbar/GistToolbar';
import api, { getOptions } from '../../utils/api';
import { getState, useGist } from './profile';
import useStyles from './styles';

export default function Profile() {
  const loggedInUser = useSelector(getState);
  const accessToken = localStorage.getItem('accessToken');
  const history = useHistory();
  const classes = useStyles();
  const { type, username, page } = useParams();
  const { userGists, setGists, userData, loading } = useGist(
    type,
    username,
    loggedInUser,
    accessToken,
    page
  );

  function removeGist(id) {
    return () => {
      api
        .delete(`https://api.github.com/gists/${id}`, getOptions(true))
        .then(() => {
          const gists = userGists.filter((gist) => gist.id !== id);
          setGists(gists);
        });
    };
  }

  const isEditable = (username) => {
    return loggedInUser.username === username;
  };

  const changePage = (page) => {
    history.push(`/profile/${username}${type ? `/${type}` : ''}/${page}`);
  };

  const listFilesData = () => {
    return userGists.map((userGist, index) => {
      const {
        id,
        username,
        mainFile: { filename, fileUrl },
        profilePic,
        createdSince,
        gistUrl,
        profileUrl,
      } = userGist;
      return (
        <div key={`${index}`}>
          <GistHeader
            username={username}
            filename={filename}
            profilePic={profilePic}
            createdSince={createdSince}
            server="Broadcast Server"
            fileUrl={gistUrl}
            profileUrl={profileUrl}
            gistId={id}
          >
            {accessToken && (
              <GistToolbar
                gistId={id}
                color="secondary"
                showLabel={true}
                isEditable={isEditable(username)}
                removeGist={removeGist(id)}
                unStar={removeGist(id)}
              />
            )}
          </GistHeader>
          <FileViewer
            filename={filename}
            fileUrl={fileUrl}
            fileViewerClass={classes.fileViewerClass}
          />
        </div>
      );
    });
  };

  const { profilePic, profileUrl } = userData;

  if (loading) return <Spinner />;

  return (
    <div className={classes.userProfileCont}>
      <div className={classes.profile}>
        <img className={classes.profilePic} src={profilePic} alt="A person" />
        <h3 className={classes.username}>{username}</h3>
        <a
          className={classes.link}
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
        >
          View GitHub Profile
        </a>
      </div>
      <div className={classes.gistCont}>
        {listFilesData()}
        <Pagination
          pageNo={parseInt(page)}
          changePage={changePage}
          pageSize={2}
        />
      </div>
    </div>
  );
}
