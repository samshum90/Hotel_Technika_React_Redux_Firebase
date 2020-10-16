import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "recompose";

import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import CreateBookingEdit from "./CreateBookingEdit";
import CreateBookingNew from "./CreateBookingNew";
import { makeStyles } from "@material-ui/core/styles";

import { Container, Paper } from "@material-ui/core";

import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
}));

function CreateBooking(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [room, setRoom] = useState("");
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const { booking, guests } = useSelector((state) => ({
    booking: Object.keys(state.bookingState.bookings || {})
      .map((key) => ({
        ...state.bookingState.bookings[key],
        uid: key,
      }))
      .find((booking) => booking.uid === id),
    guests: Object.keys(state.guestState.guests || {}).map((key) => ({
      ...state.guestState.guests[key],
      uid: key,
    })),
  }));

  const { bookedRoom } = useSelector((state) => ({
    bookedRoom: Object.keys(state.roomState.rooms || {})
      .map((key) => ({
        ...state.roomState.rooms[key],
        uid: key,
      }))
      .find((room) => room.uid === booking.roomId),
  }));

  useEffect(() => {
    if (!booking) {
      setLoading(true);
    }
    if (!!booking) {
      settingState();
    }
  }, [booking]);

  useEffect(() => {
    setNumberOfGuests(selectedGuests.length);
  }, [selectedGuests]);

  function settingState() {
    if (!checkInDate || !room) {
      setCheckInDate(booking.checkInDate);
      setCheckOutDate(booking.checkOutDate);
      setRoom(bookedRoom);
      setNumberOfGuests(booking.numberOfGuests);
      setLoading(false);
      setStatus("Booked");
      initialGuests();
    }
  }

  function initialGuests() {
    let newGuestsArray = [...selectedGuests];
    if (selectedGuests.length < booking.numberOfGuests) {
      for (let i = 0; i < booking.numberOfGuests; i++) {
        let newInput = { firstName: `guest ${i + 1}` };
        newGuestsArray.push(newInput);
      }
    }
    setSelectedGuests(newGuestsArray);
  }

  function onToggleEditMode() {
    setEditMode(!editMode);
  }

  function handleGuest(i, newGuest) {
    let newGuestsArray = [...selectedGuests];
    newGuestsArray[i] = newGuest;
    setSelectedGuests(newGuestsArray);
  }

  const handleDeleteGuest = (i) => (e) => {
    e.preventDefault();
    let newGuestsArray = [
      ...selectedGuests.slice(0, i),
      ...selectedGuests.slice(i + 1),
    ];
    setSelectedGuests(newGuestsArray);
  };

  const addGuest = (e) => {
    e.preventDefault();
    let newInput = { firstName: `guest ${selectedGuests.length + 1}` };
    let newGuestsArray = selectedGuests.concat([newInput]);
    setSelectedGuests(newGuestsArray);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const roomId = room.uid;
    const guests = selectedGuests;
    const editedBooking = {
      guests,
      checkInDate,
      checkOutDate,
      roomId,
      status,
      numberOfGuests,
    };

    props.firebase
      .fetchId("bookings", booking.uid)
      .set({ ...editedBooking })
      .then(() => {
        alert(
          `Booking made for the ${checkInDate} to the ${checkOutDate} in the ${room.roomName} room for ${selectedGuests.length} guests.
          Booking confirmation number ${booking.uid}`
        );
        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <Container maxWidth="xl">
      {loading && (
        <Paper className={classes.paper}>
          <p>Loading...</p>
        </Paper>
      )}
      {editMode ? (
        <CreateBookingEdit
          booking={booking}
          guests={guests}
          onToggleEditMode={onToggleEditMode}
          error={error}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          setCheckInDate={setCheckInDate}
          setCheckOutDate={setCheckOutDate}
          handleSubmit={handleSubmit}
          addGuest={addGuest}
          handleGuest={handleGuest}
          handleDeleteGuest={handleDeleteGuest}
          selectedGuests={selectedGuests}
          setRoom={setRoom}
          room={room}
          numberOfGuests={numberOfGuests}
          setNumberOfGuests={setNumberOfGuests}
          status={status}
        />
      ) : (
        <CreateBookingNew
          booking={booking}
          guests={guests}
          onToggleEditMode={onToggleEditMode}
          error={error}
          handleSubmit={handleSubmit}
          addGuest={addGuest}
          handleGuest={handleGuest}
          handleDeleteGuest={handleDeleteGuest}
          selectedGuests={selectedGuests}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          room={room}
          numberOfGuests={numberOfGuests}
        />
      )}
    </Container>
  );
}

const condition = (authUser) =>
  (authUser && !!authUser.roles[ROLES.ADMIN]) ||
  (authUser && !!authUser.roles[ROLES.STAFF]);

export default compose(
  withFirebase,
  withAuthorization(condition)
)(CreateBooking);
