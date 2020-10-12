import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useInput } from "../hooks/input-hook";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    width: "20vw",
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
  button: {
    width: theme.spacing(35),
  },
}));

function PasswordChangeForm(props) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const {
    value: passwordOne,
    bind: bindPasswordOne,
    reset: resetPasswordOne,
  } = useInput("");

  const {
    value: passwordTwo,
    bind: bindPasswordTwo,
    reset: resetPasswordTwo,
  } = useInput("");

  const onSubmit = (event) => {
    props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        resetPasswordOne();
        resetPasswordTwo();
      })
      .catch((error) => {
        setError(error);
      });
    event.preventDefault();
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
  return (
    <form onSubmit={onSubmit} className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Change Password
      </Typography>
      <TextField
        id="filled-margin-none"
        className={classes.textField}
        name="passwordOne"
        type="password"
        variant="filled"
        size="small"
        placeholder="New password"
        {...bindPasswordOne}
      />
      <TextField
        id="filled-margin-none"
        className={classes.textField}
        name="passwordTwo"
        type="password"
        variant="filled"
        size="small"
        placeholder="Confirm New Password"
        {...bindPasswordTwo}
      />
      <Button
        className={classes.button}
        disabled={isInvalid}
        color="secondary"
        variant="contained"
        type="submit"
      >
        Reset My Password
      </Button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

export default withFirebase(PasswordChangeForm);
