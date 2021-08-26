import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FileViewer from '../../components/FileViewer/FileViewer';
import GistHeader from '../../components/GistHeader/GistHeader';
import { starOrUnstarGistAPI } from '../../components/GistStarButton/utils/api';
import { NoResultsFound } from '../../components/NoResultsFound/NoResultsFound';
import Spinner from '../../components/Spinner/Spinner';
import GistToolbar from '../../components/GistToolbar/GistToolbar';
import api, { getOptions } from '../../utils/api';
import { selectUsername, useGist } from './gistDetail';
import { useStyles } from './styles';

function GistDetail() {
  const accessToken = localStorage.getItem('accessToken');
  const classes = useStyles();
  const profileName = useSelector(selectUsername);
  const history = useHistory();
  const { id } = useParams();
  const { gist, setGist, loading } = useGist(id);

  const isEditable = () => {
    return profileName === gist.username;
  };

  const removeGist = (id) => {
    return () => {
      api
        .delete(`https://api.github.com/gists/${id}`, getOptions(true))
        .then(() => {
          history.push(`/profile/${profileName}/1`);
        });
    };
  };

  const starClicked = (gistId, isStarred) => {
    return () =>
      starOrUnstarGistAPI(gistId, isStarred).then((isSuccess) => {
        if (isSuccess) {
          const gistCopy = JSON.parse(JSON.stringify(gist));
          gistCopy.isStarred = !isStarred;
          setGist(gistCopy);
        }
      });
  };

  const {
    username,
    mainFile: { filename },
    profilePic,
    createdSince,
    gistUrl,
    profileUrl,
    forksCount,
    files,
    isStarred,
  } = gist;
  return (
    <div className={classes.container}>
      {!loading ? (
        <>
          {gist.id ? (
            <>
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
                    isEditable={isEditable()}
                    username={username}
                    removeGist={removeGist(id)}
                    forksCount={forksCount}
                    showStarsCount={true}
                    starClicked={starClicked(id, isStarred)}
                    isStarred={isStarred}
                  />
                )}
              </GistHeader>

              {files.map((fileData, index) => {
                const { filename, fileUrl } = fileData;
                return (
                  <>
                    <FileViewer
                      key={`fileviewer-${index}`}
                      filename={filename}
                      fileUrl={fileUrl}
                      isHeaderRequired={true}
                    />
                  </>
                );
              })}
            </>
          ) : (
            <NoResultsFound />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default GistDetail;
