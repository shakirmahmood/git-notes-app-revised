import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.dark,
    height: 400,
    fontSize: 20,
  },
}));

const Spinner = ({ showText = true }) => {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      {showText && <h1>Loading data ...</h1>}
      <i className="fa fa-refresh fa-spin" />
    </div>
  );
};

export default Spinner;
