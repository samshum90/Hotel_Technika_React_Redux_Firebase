import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withFirebase } from "../Firebase";
import { CreateBookingEdit } from "../Booking";

import {
  makeStyles,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: 300,
    },
    " & .MuiFormControl-root": {
      margin: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  row: {
    cursor: "pointer",
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

function ReservationListItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const { reservation, error, setError } = props;
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [room, setRoom] = useState("");
  const [status, setStatus] = useState("");
  const [selectedGuests, setSelectedGuests] = useState([
    { firstName: "guest 1" },
  ]);
  const [reservationMode] = useState(true);
  const { guests } = useSelector((state) => ({
    guests: Object.keys(state.guestState.guests || {}).map((key) => ({
      ...state.guestState.guests[key],
      uid: key,
    })),
  }));

  useEffect(() => {
    if (!reservation.length) {
      settingState();
    }
  }, [reservation, reservation.status]);

  function settingState() {
    if (!checkInDate) {
      setCheckInDate(reservation.checkInDate);
      setCheckOutDate(reservation.checkOutDate);
      setRoom(reservation.room);
      setNumberOfGuests(reservation.numberOfGuests);
      setNumberOfGuests(reservation.numberOfGuests);
      setStatus(reservation.status);
      if (!!reservation.guests) {
        setSelectedGuests(reservation.guests);
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const guests = selectedGuests;
    const editedReservation = {
      guests,
      checkInDate,
      checkOutDate,
      room,
      status,
      numberOfGuests,
    };

    props.firebase
      .fetchId("bookings", reservation.uid)
      .set({ ...editedReservation })
      .then(() => {
        alert(
          `Booking edited for the ${checkInDate} to the ${checkOutDate} in the ${room.roomName} room for ${selectedGuests.length} guests.
          Booking confirmation number ${reservation.uid}`
        );
        handleClose();
      })
      .catch((error) => {
        setError(error);
      });
  };

  function onRemoveReservation() {
    props.firebase.fetchId("bookings", reservation.uid).remove();
  }

  const openConfirmation = () => {
    setOpenDeleteConfirmation(true);
  };
  const closeConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleGuest(i, selectedGuest) {
    let newSelectedGuests = [...selectedGuests];
    newSelectedGuests[i] = selectedGuest;

    setSelectedGuests(newSelectedGuests);
  }

  const handleDeleteGuest = (i) => (e) => {
    e.preventDefault();
    let newSelectedGuests = [
      ...selectedGuests.slice(0, i),
      ...selectedGuests.slice(i + 1),
    ];
    console.log(newSelectedGuests);
    setSelectedGuests(newSelectedGuests);
  };

  const addGuest = (e) => {
    e.preventDefault();
    let guestNumber = selectedGuests.length + 1;
    let newInput = { firstName: `guest ${guestNumber}` };
    let newSelectedGuests = selectedGuests.concat([newInput]);
    setSelectedGuests(newSelectedGuests);
  };

  const checkIn = () => {
    setStatus("Checked In");
    props.firebase
      .fetchId("bookings", reservation.uid)
      .update({ status })
      .catch((error) => {
        setError({ error });
      });
  };

  const checkOut = () => {
    setStatus("Completed");
    props.firebase
      .fetchId("bookings", reservation.uid)
      .update({ status })
      .catch((error) => {
        setError({ error });
      });
  };
  function ConditionalButtons() {
    if (reservation.status === "Checked In") {
      return (
        <Button
          color="secondary"
          variant="contained"
          type="button"
          onClick={checkOut}
          size="small"
          className={classes.button}
        >
          Check Out
        </Button>
      );
    } else if (reservation.status === "Completed") {
      return null;
    } else {
      return (
        <Button
          color="secondary"
          variant="contained"
          type="button"
          onClick={checkIn}
          size="small"
          className={classes.button}
        >
          Check In
        </Button>
      );
    }
  }

  return (
    <>
      <TableRow hover className={classes.row}>
        <TableCell>{reservation.uid}</TableCell>
        <TableCell>{checkInDate}</TableCell>
        <TableCell>{checkOutDate}</TableCell>
        <TableCell>{numberOfGuests}</TableCell>
        <TableCell>{room.roomName}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>
          {ConditionalButtons()}

          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={() => handleClickOpen()}
            size="small"
            className={classes.button}
          >
            Edit
          </Button>
          <Button
            onClick={openConfirmation}
            color="secondary"
            variant="contained"
            type="button"
            size="small"
            className={classes.button}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xl"
      >
        <DialogTitle id="form-dialog-title">
          Booking {reservation.uid}
        </DialogTitle>
        <DialogContent>
          <CreateBookingEdit
            booking={reservation}
            guests={guests}
            onToggleEditMode={handleClose}
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
            reservationMode={reservationMode}
            status={status}
            setStatus={setStatus}
          />
        </DialogContent>
        <DialogActions>
          {error && <p>{error.message}</p>}
          <Button
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Save
          </Button>
          <Button
            onClick={openConfirmation}
            color="secondary"
            variant="contained"
            type="button"
          >
            Delete
          </Button>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="contained"
            type="button"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteConfirmation}
        onClose={closeConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to Delete booking:{reservation.uid}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={onRemoveReservation} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withFirebase(ReservationListItem);
