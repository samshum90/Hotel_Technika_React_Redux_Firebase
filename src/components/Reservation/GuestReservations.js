import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { withAuthorization } from "../Session";

import ReservationList from "./ReservationList";
import ReservationSearch from "./ReservationSearch";
import * as ROLES from "../../constants/roles";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  textField: {
    marginRight: theme.spacing(1),
    width: "20vw",
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    marginRight: theme.spacing(1),
    width: "20vw",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function GuestReservations() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { bookings } = useSelector((state) => ({
    bookings: Object.keys(state.bookingState.bookings || {}).map((key) => ({
      ...state.bookingState.bookings[key],
      uid: key,
    })),
  }));
  const classes = useStyles();

  useEffect(() => {
    if (!bookings.length) {
      setLoading(true);
    }
    if (!bookings.length) {
      const setBookings = () => {
        setBookings(bookings);
        setLoading(false);
      };
      setBookings();
    }
  }, [bookings]);

  return (
    <Container maxWidth="xl">
      <ReservationList
        classes={classes}
        bookings={bookings}
        error={error}
        setError={setError}
        loading={loading}
      />
    </Container>
  );
}

export default GuestReservations;
