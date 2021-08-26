import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';

export default function EditButton(props) {
  const { label, color, editClicked } = props;
  const classes = useStyles();

  return (
    <span className={`${classes.btn} ${classes[color]}`} onClick={editClicked}>
      <EditIcon className={classes.icon} />
      {label && <span>{label}</span>}
    </span>
  );
}
