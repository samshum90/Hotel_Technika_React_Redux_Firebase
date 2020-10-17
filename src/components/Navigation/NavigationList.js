import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RoomServiceIcon from "@material-ui/icons/RoomService";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import HomeIcon from "@material-ui/icons/Home";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const NavigationList = ({ authUser, setOpen }) =>
  authUser ? (
    <NavigationListAuth authUser={authUser} setOpen={setOpen} />
  ) : (
    <NavigationListNonAuth setOpen={setOpen} />
  );

const NavigationListAuth = ({ authUser, setOpen }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      {(!!authUser.roles[ROLES.ADMIN] || !!authUser.roles[ROLES.STAFF]) && (
        <List>
          <ListItem button>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText>
              <Link to={ROUTES.REGISTER}>Register</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText>
              <Link to={ROUTES.BOOKINGS}>Bookings</Link>
            </ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <EmojiPeopleIcon />
            </ListItemIcon>
            <ListItemText>
              <Link to={ROUTES.GUESTS}>Guests</Link>
            </ListItemText>
          </ListItem>
        </List>
      )}
      <Divider />
      {!!authUser.roles[ROLES.ADMIN] && (
        <List>
          <ListItem button>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText>
              <Link to={ROUTES.ROOM}>Rooms</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              <Link to={ROUTES.STAFF}>Staff</Link>
            </ListItemText>
          </ListItem>
        </List>
      )}
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <RoomServiceIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to={ROUTES.RESERVATIONS}>Reservations</Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <SignOutButton />
        </ListItem>
      </List>
    </div>
  );
};

const NavigationListNonAuth = ({ setOpen }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to={ROUTES.LANDING}>Landing</Link>
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(NavigationList);
