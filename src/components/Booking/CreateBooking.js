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
  const [state, setState] = useState({
    selectedGuests: [{ firstName: "guest 1" }],
  });
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [reserved, setReserved] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [room, setRoom] = useState("");
  const { id } = useParams();
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
    }
  }
  function onToggleEditMode() {
    setEditMode(!editMode);
  }

  function handleGuest(i, selectedGuest) {
    let selectedGuests = [...state.selectedGuests];
    selectedGuests[i] = selectedGuest;
    setState({
      selectedGuests,
    });
  }

  const handleDeleteGuest = (i) => (e) => {
    e.preventDefault();
    let selectedGuests = [
      ...state.selectedGuests.slice(0, i),
      ...state.selectedGuests.slice(i + 1),
    ];
    setState({
      selectedGuests,
    });
  };

  const addGuest = (e) => {
    e.preventDefault();
    let guestNumber = state.selectedGuests.length + 1;
    let newInput = { firstName: `guest ${guestNumber}` };
    let selectedGuests = state.selectedGuests.concat([newInput]);
    setState({
      selectedGuests,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    setReserved(true);
    const guests = state.selectedGuests;
    const editedBooking = {
      guests,
      checkInDate,
      checkOutDate,
      room,
      reserved,
      numberOfGuests,
    };

    props.firebase
      .fetchId("bookings", booking.uid)
      .set({ ...editedBooking })
      .then(() => {
        alert(
          `Booking made for the ${checkInDate} to the ${checkOutDate} in the ${room.roomName} room for ${state.selectedGuests.length} guests.
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
          state={state}
          setRoom={setRoom}
          room={room}
          numberOfGuests={numberOfGuests}
          setNumberOfGuests={setNumberOfGuests}
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
          state={state}
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
