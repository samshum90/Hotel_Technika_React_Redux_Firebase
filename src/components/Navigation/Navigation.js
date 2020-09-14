import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SignOutButton from "../SignOut";
import "./Navigation.css";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

const Navigation = ({ authUser }) =>
  authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />;

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const NavigationAuth = ({ authUser }) => (
  <ul className="navigation">
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className="navigation">
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>SignIn</Link>
    </li>
  </ul>
);

export default connect(mapStateToProps)(Navigation);
