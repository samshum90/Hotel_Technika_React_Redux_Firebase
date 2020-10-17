import React from "react";
import { withFirebase } from "../Firebase";

import { Paper, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexWrap: "wrap",
    "align-items": "baseline",
  },
  headTextField: {
    marginRight: theme.spacing(1),
    width: "90wv",
  },
  textField: {
    marginRight: theme.spacing(1),
    width: "15wv",
  },
  paper: {
    padding: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  // title: {
  //   padding: theme.spacing(2),
  // },
}));

function BookingForm({
  setFilteredRooms,
  rooms,
  setCheckInDate,
  setCheckOutDate,
  numberOfGuests,
  setNumberOfGuests,
  checkInDate,
  checkOutDate,
}) {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    let filteredRooms = rooms;
    if (numberOfGuests !== "") {
      filteredRooms = rooms.filter(
        (room) => room.roomCapacity.toString() === numberOfGuests
      );
    }
    if (filteredRooms.length === 0) {
      const emptyResults = [
        {
          roomName: "Sorry! We have no rooms available",
        },
      ];
      setFilteredRooms(emptyResults);
    } else {
      setFilteredRooms(filteredRooms);
    }
  };

  function dateGreaterThan() {
    let startDate = new Date(checkInDate);
    let endDate = new Date(checkOutDate);
    let result = false;

    if (startDate < endDate) {
      result = true;
    }
    return result;
  }

  function calculateNights() {
    let startDate = new Date(checkInDate);
    let endDate = new Date(checkOutDate);
    let output = 0;

    if (!!checkInDate && !!checkOutDate && startDate < endDate) {
      output = Math.round(Math.abs(+startDate - +endDate) / 8.64e7);
    }
    return output;
  }

  const isInvalid = !dateGreaterThan() || numberOfGuests === "";

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Find a Room
      </Typography>
      <Typography>
        Please enter your desired check in and check out dates including the
        number of your party
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
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
        <TextField
          name="numberOfPeople"
          id="filled-margin-none"
          label="Number Of People"
          type="number"
          variant="filled"
          className={classes.textField}
          onChange={(e) => setNumberOfGuests(e.target.value)}
        />
        <Typography className={classes.textField}>
          {calculateNights()} Nights
        </Typography>
        <Button
          disabled={isInvalid}
          className={classes.button}
          color="secondary"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
}

export default withFirebase(BookingForm);
