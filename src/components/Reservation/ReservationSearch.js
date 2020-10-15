import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import { Typography, TextField, Button } from "@material-ui/core/";

function ReservationSearch({ classes, bookings, setFilteredBookings }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [roomName, setRoomName] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let query = [
      bookingRef,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      roomName,
      bookingStatus,
    ];
    const filteredBookings = bookings.filter((booking) => {
      if (
        query[0] &&
        !booking.uid.toLowerCase().includes(query[0].toLowerCase())
      ) {
        return false;
      }
      if (query[1] && !booking.checkInDate.includes(query[1])) {
        return false;
      }
      if (query[2] && !booking.checkOutDate.includes(query[2])) {
        return false;
      }
      if (query[3] && !booking.numberOfGuests.includes(query[3])) {
        return false;
      }
      if (
        query[4] &&
        !booking.room.roomName.toLowerCase().includes(query[4].toLowerCase())
      ) {
        return false;
      }
      if (
        query[5] &&
        !booking.status.toLowerCase().includes(query[5].toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredBookings(filteredBookings);
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Search Reservations
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className={classes.divider}>
          <TextField
            name="bookingRef"
            id="filled-basic"
            label="Booking Reference"
            className={classes.textField}
            variant="filled"
            type="text"
            onChange={(e) => setBookingRef(e.target.value)}
          />
          <TextField
            name="checkInDate"
            id="date"
            label="Check In Date"
            className={classes.textField}
            variant="filled"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
          <TextField
            name="checkOutDate"
            id="date"
            label="Check Out Date"
            type="date"
            className={classes.textField}
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        <div className={classes.divider}>
          <TextField
            name="roomName"
            id="filled-basic"
            label="Room Name"
            className={classes.textField}
            variant="filled"
            type="text"
            onChange={(e) => setRoomName(e.target.value)}
          />
          <TextField
            name="numberOfPeople"
            id="filled-margin-none"
            label="Number Of Guests"
            className={classes.textField}
            type="number"
            variant="filled"
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
          <TextField
            name="bookingStatus"
            id="filled-basic"
            label="Booking Status"
            className={classes.textField}
            variant="filled"
            type="text"
            onChange={(e) => setBookingStatus(e.target.value)}
          />
        </div>
        <div className={classes.divider}>
          <Button
            className={classes.button}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default ReservationSearch;
