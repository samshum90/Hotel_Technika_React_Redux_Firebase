import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import * as ROUTES from "../../constants/routes";
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

const SignIn = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Paper className={classes.container}>
        <h1>SignIn</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
      </Paper>
    </Container>
  );
};

function SignInFormBase(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event) => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error);
      });
    event.preventDefault();
  };

  const classes = useStyles();
  const isInvalid = password === "" || email === "";

  return (
    <form onSubmit={onSubmit}>
      <div className={classes.TextField}>
        <TextField
          name="email"
          id="standard-basic"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          defaultValue="hotel_technika@tecknika.com"
        />
      </div>
      <div className={classes.TextField}>
        <TextField
          name="password"
          id="standard-basic"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          defaultValue="Technika"
        />
      </div>
      <Button
        disabled={isInvalid}
        type="submit"
        color="secondary"
        variant="contained"
      >
        Sign In
      </Button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignInForm = compose(withRouter(withFirebase(SignInFormBase)));

export default SignIn;
export { SignInForm };
