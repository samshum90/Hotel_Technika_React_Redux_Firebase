import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import { useSelector } from "react-redux";

import { withAuthorization } from "../Session";

import GuestList from "./GuestList";
import * as ROLES from "../../constants/roles";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

function Guests(props) {
  const [loading, setLoading] = useState(false);
  const { guests } = useSelector((state) => ({
    guests: Object.keys(state.guestState.guests || {}).map((key) => ({
      ...state.guestState.guests[key],
      uid: key,
    })),
  }));
  const classes = useStyles();

  useEffect(() => {
    if (!guests.length) {
      setLoading(true);
    }
    setLoading(false);
  }, [guests]);

  return (
    <Container maxWidth="xl">
      <Paper className={classes.container}>
        <h2>Guests</h2>
        <GuestList guests={guests} loading={loading} />
      </Paper>
    </Container>
  );
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withAuthorization(condition))(Guests);
