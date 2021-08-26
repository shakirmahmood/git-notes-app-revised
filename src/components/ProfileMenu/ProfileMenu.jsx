import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSignOut } from "../../redux/actionCreator";
import useStyles from "./styles";

const getLoggedInUser = (state) => ({
  username: state.username,
  profilePic: state.profilePic,
  profileUrl: state.profileUrl,
});

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { username, profilePic, profileUrl } = useSelector(getLoggedInUser);
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signout() {
    localStorage.removeItem("accessToken");
    dispatch(userSignOut());
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img className="profile-pic" src={profilePic} alt="A person"></img>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem className={classes.username}>
          Logged in as <br />
          {username}
        </MenuItem>
        <Link
          to={`/profile/${username}/1`}
          className={classes.removeDecoration}
        >
          <MenuItem onClick={handleClose}>Your gists</MenuItem>
        </Link>
        <Link
          to={`/profile/${username}/starred/1`}
          className={classes.removeDecoration}
        >
          <MenuItem onClick={handleClose}>Starred</MenuItem>
        </Link>
        <Link to={`/create-gist`} className={classes.removeDecoration}>
          <MenuItem onClick={handleClose}>Create gist</MenuItem>
        </Link>
        <MenuItem>
          <a
            className={classes.removeDecoration}
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
          >
            Your GitHub profile
          </a>
        </MenuItem>
        <MenuItem onClick={signout}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}
