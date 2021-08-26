import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Spinner from '../Spinner/Spinner';
import useStyles from './styles';

function StarButton(props) {
  const { color, label, showStarsCount, starsCount, isStarred, starClicked } =
    props;
  const classes = useStyles();
  return (
    <span onClick={starClicked} className={`${classes.btn} ${classes[color]}`}>
      {isStarred ? (
        <StarIcon className={classes.icon} />
      ) : (
        <StarBorderIcon className={classes.icon} />
      )}
      {label && <span>{label}</span>}
      {showStarsCount &&
        (starsCount !== undefined ? (
          <span className={classes.count}>{starsCount}</span>
        ) : (
          <Spinner showText={false} />
        ))}
    </span>
  );
}

export default StarButton;
