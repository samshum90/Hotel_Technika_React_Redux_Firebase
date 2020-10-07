import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { withFirebase } from "../Firebase";
import CreateBookingEdit from "./CreateBookingEdit";
import CreateBookingNew from "./CreateBookingNew";
import { makeStyles } from "@material-ui/core/styles";

import { Container, Paper } from "@material-ui/core";

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
  const [selectedGuests, setSelectedGuests] = useState([
    { firstName: "guest 1" },
  ]);
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

  useEffect(() => {
    if (!booking) {
      setLoading(true);
    }
    if (!!booking) {
      settingState();
    }
  }, [booking]);

  useEffect(() => {}, []);

  function settingState() {
    if (!checkInDate) {
      setCheckInDate(booking.checkInDate);
      setCheckOutDate(booking.checkOutDate);
      setRoom(booking.room);
      setNumberOfGuests(booking.numberOfGuests);
      setLoading(false);
      setStatus(booking.status);
    }
  }
  function onToggleEditMode() {
    setEditMode(!editMode);
  }

  function handleGuest(i, selectedGuest) {
    let selectedGuests = [...selectedGuests];
    selectedGuests[i] = selectedGuest;
    setSelectedGuests({
      ...selectedGuests,
    });
  }

  const handleDeleteGuest = (i) => (e) => {
    e.preventDefault();
    let selectedGuests = [
      ...selectedGuests.slice(0, i),
      ...selectedGuests.slice(i + 1),
    ];
    setSelectedGuests({
      ...selectedGuests,
    });
  };

  const addGuest = (e) => {
    e.preventDefault();
    let guestNumber = selectedGuests.length + 1;
    let newInput = { firstName: `guest ${guestNumber}` };
    let selectedGuests = selectedGuests.concat([newInput]);
    setSelectedGuests({
      selectedGuests,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("Booked");
    const guests = selectedGuests;
    const editedBooking = {
      guests,
      checkInDate,
      checkOutDate,
      room,
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
        setError({ error });
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
export default withFirebase(CreateBooking);
