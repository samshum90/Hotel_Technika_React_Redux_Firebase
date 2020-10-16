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
  const [status] = useState("Started");
  const [numberOfGuests, setNumberOfGuests] = useState("");

  function createBooking(room) {
    const roomId = room.uid;
    const booking = {
      checkInDate,
      checkOutDate,
      roomId,
      status,
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
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
      />
      {filteredRooms && (
        <BookingList
          filteredRooms={filteredRooms}
          createBooking={createBooking}
        />
      )}
    </Container>
  );
}

const condition = (authUser) =>
  (authUser && !!authUser.roles[ROLES.ADMIN]) ||
  (authUser && !!authUser.roles[ROLES.STAFF]);

export default compose(withFirebase, withAuthorization(condition))(Bookings);
