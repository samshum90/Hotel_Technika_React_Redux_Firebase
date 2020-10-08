import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignOutButton from "../SignOut";
import "./Navigation.css";
import { Typography } from "@material-ui/core";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const Navigation = ({ authUser }) =>
  authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />;

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const NavigationAuth = ({ authUser }) => (
  <Typography className="navigation">
    {(!!authUser.roles[ROLES.ADMIN] || !!authUser.roles[ROLES.STAFF]) && (
      <Link to={ROUTES.REGISTER}>Register</Link>
    )}
    {(!!authUser.roles[ROLES.ADMIN] || !!authUser.roles[ROLES.STAFF]) && (
      <Link to={ROUTES.BOOKINGS}>Bookings</Link>
    )}
    {(!!authUser.roles[ROLES.ADMIN] || !!authUser.roles[ROLES.STAFF]) && (
      <Link to={ROUTES.RESERVATIONS}>Reservations</Link>
    )}
    {!!authUser.roles[ROLES.ADMIN] && <Link to={ROUTES.ROOM}>Rooms</Link>}
    {!!authUser.roles[ROLES.ADMIN] && <Link to={ROUTES.GUESTS}>Guests</Link>}
    {!!authUser.roles[ROLES.ADMIN] && <Link to={ROUTES.STAFF}>Staff</Link>}
    {!!authUser.roles[ROLES.ADMIN] && <Link to={ROUTES.ADMIN}>Admin</Link>}
    <Link to={ROUTES.ACCOUNT}>Account</Link>
    <SignOutButton />
  </Typography>
);

const NavigationNonAuth = () => (
  <Typography className="navigation">
    <Link to={ROUTES.LANDING}>Landing</Link>
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </Typography>
);

export default connect(mapStateToProps)(Navigation);
