import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { PasswordForgetForm } from "../PasswordForget";
import { AuthUserContext, withAuthorization } from "../Session";
import PasswordChangeForm from "../PasswordChange";

const Account = ({ authUser }) => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const condition = (authUser) => !!authUser;

export default compose(
  connect(mapStateToProps),
  withAuthorization(condition)
)(Account);
