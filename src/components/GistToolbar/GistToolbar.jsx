import GistEditButton from '../GistEditButton/GistEditButton';
import { GistForkButton } from '../GistForkButton/GistForkButton';
import { GistStarButton } from '../GistStarButton/GistStarButton.jsx';
import DeleteButton from '../Toolbar/DeleteButton';
import useStyles from '../Toolbar/styles';

export default function GistToolbar(props) {
  const {
    gistId,
    showLabel,
    color,
    isEditable,
    username,
    type,
    removeGist,
    forksCount,
    showStarsCount,
  } = props;
  const { toolbar } = useStyles();

  return (
    <div className={toolbar}>
      {isEditable && (
        <>
          <GistEditButton
            label={showLabel ? 'Edit' : null}
            color={color}
            gistId={gistId}
          />
          <DeleteButton
            label={showLabel ? 'Delete' : null}
            color={color}
            gistId={gistId}
            username={username}
            type={type}
            removeGist={removeGist}
          />
        </>
      )}
      <GistStarButton
        gistId={gistId}
        color={color}
        label={showLabel ? 'Star' : null}
        unStar={removeGist}
        username={username}
        showStarsCount={showStarsCount}
      />

      <GistForkButton
        label={showLabel ? 'Fork' : null}
        color={color}
        gistId={gistId}
        forksCount={forksCount}
      />
    </div>
  );
}
