import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { withFirebase } from "../Firebase";

import { Button, TextField, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  TextField: {
    marginBottom: theme.spacing(2),
  },
}));

const SignUp = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Paper className={classes.container}>
        <h1>Sign Up</h1>
        <SignUpForm />
      </Paper>
    </Container>
  );
};

function SignUpFormBase(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (event) => {
    const roles = { GUEST: ROLES.GUEST };

    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        return props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then(() => {
        setUsername("");
        setEmail("");
        setPasswordOne("");
        setPasswordTwo("");
        setIsAdmin(false);
        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error);
      });
    event.preventDefault();
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  return (
    <form onSubmit={onSubmit}>
      <div className={classes.TextField}>
        <TextField
          name="username"
          value={username}
          id="standard-basic"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
      </div>
      <div className={classes.TextField}>
        <TextField
          name="email"
          value={email}
          id="standard-basic"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
      </div>
      <div className={classes.TextField}>
        <TextField
          name="passwordOne"
          value={passwordOne}
          id="standard-basic"
          label="Password"
          onChange={(e) => setPasswordOne(e.target.value)}
          type="password"
        />
      </div>
      <div className={classes.TextField}>
        <TextField
          name="passwordTwo"
          value={passwordTwo}
          id="standard-basic"
          label="Confirm Password"
          onChange={(e) => setPasswordTwo(e.target.value)}
          type="password"
        />
      </div>
      <Button
        disabled={isInvalid}
        type="submit"
        color="secondary"
        variant="contained"
      >
        Sign Up
      </Button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignUpLink = () => {
  return (
    <p>
      Don't have an account <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
};

const SignUpForm = compose(withRouter(withFirebase(SignUpFormBase)));

export default SignUp;
export { SignUpForm, SignUpLink };
