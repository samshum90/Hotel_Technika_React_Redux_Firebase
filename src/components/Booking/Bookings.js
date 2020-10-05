import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { compose } from "recompose";
import { Container } from "@material-ui/core";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";

import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";

function Bookings(props) {
  const [loading, setLoading] = useState(false);
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
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [reserved] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState("");

  useEffect(() => {
    if (!bookings.length) {
      setLoading(true);
    }
  }, []);

  function createBooking(room) {
    const booking = {
      checkInDate,
      checkOutDate,
      room,
      reserved,
      numberOfGuests,
    };
    props.firebase.saveData(booking, "bookings").then((booking) => {
      props.history.push(`${ROUTES.BOOKINGS}/${booking.key}`);
    });
  }

  return (
    <Container maxWidth="xl">
      <BookingForm
        setFilteredRooms={setFilteredRooms}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        rooms={rooms}
        numberOfGuests={numberOfGuests}
        setNumberOfGuests={setNumberOfGuests}
      />
      <BookingList
        loading={loading}
        filteredRooms={filteredRooms}
        createBooking={createBooking}
      />
    </Container>
  );
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withFirebase, withAuthorization(condition))(Bookings);
