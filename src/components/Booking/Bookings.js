import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { compose } from "recompose";
import { Container } from "@material-ui/core";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";

import * as ROLES from "../../constants/roles";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";

function Bookings(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { bookings, rooms } = useSelector((state) => ({
    bookings: Object.keys(state.bookingState.bookings || {}).map((key) => ({
      ...state.bookingState.bookings[key],
      uid: key,
    })),
    rooms: Object.keys(state.roomState.rooms || {}).map((key) => ({
      ...state.roomState.rooms[key],
      uid: key,
    })),
  }));
  const [filteredRooms, setFilteredRooms] = useState("");

  useEffect(() => {
    if (!bookings.length) {
      setLoading(true);
    }
    onListenForBookingsAndRooms();
    return () => {
      props.firebase.fetch("bookings").off();
      props.firebase.fetch("rooms").off();
    };
  }, []);

  function onListenForBookingsAndRooms() {
    setLoading(true);

    props.firebase.fetch("bookings").on("value", (snapshot) => {
      onSetBookings(snapshot.val());
    });
    props.firebase.fetch("rooms").on("value", (snapshot) => {
      onSetRooms(snapshot.val());
    });
    setLoading(false);
  }

  function onSetBookings(bookings) {
    dispatch({ type: "BOOKINGS_SET", bookings });
  }
  function onSetRooms(rooms) {
    dispatch({ type: "ROOMS_SET", rooms });
  }

  return (
    <Container maxWidth="xl">
      <BookingForm setFilteredRooms={setFilteredRooms} rooms={rooms} />
      <BookingList loading={loading} filteredRooms={filteredRooms} />
    </Container>
  );
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withFirebase, withAuthorization(condition))(Bookings);
