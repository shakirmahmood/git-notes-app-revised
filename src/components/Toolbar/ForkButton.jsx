import 'font-awesome/css/font-awesome.min.css';
import useStyles from './styles';

function ForkButton(props) {
  const { color, label, forksCount, fork } = props;
  const classes = useStyles();
  return (
    <span onClick={fork} className={`${classes.btn} ${classes[color]}`}>
      <i className={`fa fa-code-fork ${classes.icon}`} aria-hidden="true"></i>{' '}
      {label && <span>{label}</span>}
      {forksCount !== undefined && <span className={classes.count}>{forksCount}</span>}
    </span>
  );
}

export default ForkButton;
