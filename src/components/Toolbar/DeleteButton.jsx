import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";

export default function DeleteButton(props) {
  const { label, color, removeGist } = props;
  const classes = useStyles();

  return (
    <span className={`${classes.btn} ${classes[color]}`} onClick={removeGist}>
      <DeleteIcon className={classes.icon} />
      {label && <span>{label}</span>}
    </span>
  );
}
