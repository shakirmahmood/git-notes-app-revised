import GridCard from './GridCard';
import { useStyles } from './styles';
import FileViewer from '../FileViewer/FileViewer';
import GistHeader from '../GistHeader/GistHeader';

export default function Grid({ gists, cardClicked }) {
  const classes = useStyles();

  return (
    <div className={classes.gridView}>
      {gists.map((userGist, index) => {
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
          <GridCard key={`${index}`} cardClicked={cardClicked} id={id} className={classes.card}>
            <FileViewer fileUrl={fileUrl} fileViewerClass={classes.fileViewer} />
            <GistHeader
              username={username}
              filename={filename}
              profilePic={profilePic}
              createdSince={createdSince}
              server="Broadcast Server"
              fileUrl={gistUrl}
              profileUrl={profileUrl}
              gistId={id}
            />
          </GridCard>
        );
      })}
    </div>
  );
}
