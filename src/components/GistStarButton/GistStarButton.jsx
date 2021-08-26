import StarButton from '../Toolbar/StarButton';
import { useStar } from './gistStarButton';
import { starOrUnstarGistAPI } from './utils/api';

export function GistStarButton(props) {
  const { gistId, color, label, unStar, username, showStarsCount } = props;
  const { starsCount, setStarsCount, isStarred, setAsStarred } = useStar(
    gistId,
    username,
    showStarsCount
  );

  const starClicked = () => {
    starOrUnstarGistAPI(gistId, isStarred)
      .then(() => {
        if (isStarred) {
          setStarsCount((count) => parseInt(count) - 1);
          unStar && unStar();
        } else {
          setStarsCount((count) => parseInt(count) + 1);
        }
        setAsStarred((isStarred) => !isStarred);
      })
      .catch(() => setAsStarred(false));
  };

  return (
    <StarButton
      label={label ? 'Star' : null}
      color={color}
      gistId={gistId}
      username={username}
      starsCount={starsCount}
      starClicked={starClicked}
      isStarred={isStarred}
      showStarsCount={showStarsCount}
    />
  );
}

export default StarButton;
