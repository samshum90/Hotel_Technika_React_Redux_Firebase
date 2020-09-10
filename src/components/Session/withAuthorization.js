import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import AuthUserContext from "./context";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";

const withAuthorization = (condition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          if (authUser) {
            this.props.firebase
              .user(authUser.id)
              .once("value")
              .then((snapshot) => {
                const dbUser = snapshot.val();

                if (!dbUser.roles) {
                  dbUser.roles = {};
                }

                authUser = {
                  uid: authUser.id,
                  email: authUser.email,
                  ...dbUser,
                };

                if (!condition(authUser)) {
                  this.props.history.push(ROUTES.SIGN_IN);
                }
              });
          } else {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
