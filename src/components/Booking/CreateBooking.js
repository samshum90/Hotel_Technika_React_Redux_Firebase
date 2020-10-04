import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { withFirebase } from "../Firebase";
import CreateBookingEdit from "./CreateBookingEdit";
import CreateBookingNew from "./CreateBookingNew";

function CreateBooking(props) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState({
    selectedGuests: [""],
  });
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
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
    if (booking === null) {
      setLoading(true);
    }
  }, []);

  function onToggleEditMode() {
    setEditMode(!editMode);
  }

  function handleGuest(i, selectedGuest) {
    console.log(i, selectedGuest);
    let selectedGuests = [...state.selectedGuests];
    selectedGuests[i] = selectedGuest;
    setState({
      selectedGuests,
    });
  }

  const handleDeleteGuest = (i) => (e) => {
    console.log(i);
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
    let selectedGuests = state.selectedGuests.concat([""]);
    setState({
      selectedGuests,
    });
  };

  function handleSubmit() {}

  return editMode ? (
    <CreateBookingEdit
      booking={booking}
      guests={guests}
      onToggleEditMode={onToggleEditMode}
      error={error}
      loading={loading}
      setCheckInDate={setCheckInDate}
      setCheckOutDate={setCheckOutDate}
      handleSubmit={handleSubmit}
    />
  ) : (
    <CreateBookingNew
      booking={booking}
      guests={guests}
      onToggleEditMode={onToggleEditMode}
      error={error}
      loading={loading}
      handleSubmit={handleSubmit}
      addGuest={addGuest}
      handleGuest={handleGuest}
      handleDeleteGuest={handleDeleteGuest}
      state={state}
    />
  );
}
export default withFirebase(CreateBooking);
