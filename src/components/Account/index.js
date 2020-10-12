import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { Container, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { withAuthorization } from "../Session";
import PasswordChangeForm from "../PasswordChange";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

function Account({ authUser }) {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Paper className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Account: {authUser.email}
        </Typography>
        <PasswordChangeForm />
      </Paper>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const condition = (authUser) => !!authUser;

export default compose(
  connect(mapStateToProps),
  withAuthorization(condition)
)(Account);
