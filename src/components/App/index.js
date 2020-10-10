import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

import Navbar from "../Navigation";
import Landing from "../Landing";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import PasswordForget from "../PasswordForget";
import Home from "../Home";
import Register from "../Register";
import Bookings from "../Booking";
import Activities from "../Activities";
import Staff from "../Staff";
import Account from "../Account";
import Admin from "../Admin";
import Room from "../Rooms";
import Guests from "../Guests";
import Reservations from "../Reservation";
import { CreateBooking } from "../Booking";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
}));

function App(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    onListenForState();
    return () => {
      props.firebase.fetch("bookings").off();
      props.firebase.fetch("rooms").off();
      props.firebase.fetch("guests").off();
    };
  }, []);

  function onListenForState() {
    props.firebase.fetch("bookings").on("value", (snapshot) => {
      onSetBookings(snapshot.val());
    });
    props.firebase.fetch("rooms").on("value", (snapshot) => {
      onSetRooms(snapshot.val());
    });
    props.firebase.fetch("guests").on("value", (snapshot) => {
      onSetGuests(snapshot.val());
    });
  }

  function onSetBookings(bookings) {
    dispatch({ type: "BOOKINGS_SET", bookings });
  }
  function onSetRooms(rooms) {
    dispatch({ type: "ROOMS_SET", rooms });
  }
  function onSetGuests(guests) {
    dispatch({ type: "GUESTS_SET", guests });
  }

  return (
    <Container className={classes.root} maxWidth="xl">
      <Router>
        <Navbar />

        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.REGISTER} component={Register} />
        <Route exact path={ROUTES.BOOKINGS} component={Bookings} />
        <Route exact path={ROUTES.CREATE_BOOKING} component={CreateBooking} />
        <Route path={ROUTES.RESERVATIONS} component={Reservations} />
        <Route path={ROUTES.ACTIVITIES} component={Activities} />
        <Route path={ROUTES.STAFF} component={Staff} />
        <Route path={ROUTES.ROOM} component={Room} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.ADMIN} component={Admin} />
        <Route path={ROUTES.GUESTS} component={Guests} />
      </Router>
    </Container>
  );
}

export default compose(withFirebase, withAuthentication)(App);
