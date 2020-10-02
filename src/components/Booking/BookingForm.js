import React, { useState } from "react";
import { withFirebase } from "../Firebase";

import { Paper, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
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
}));

function BookingForm({
  setFilteredRooms,
  rooms,
  setCheckInDate,
  setCheckOutDate,
}) {
  const classes = useStyles();

  const [numberOfPeople, setNumberOfPeople] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let filteredRooms = rooms;
    if (numberOfPeople !== "") {
      filteredRooms = rooms.filter(
        (room) => room.roomCapacity === numberOfPeople
      );
    }
    setFilteredRooms(filteredRooms);
  };

  return (
    <Paper className={classes.paper}>
      <h2>Find a Room</h2>
      <form className={classes.root} onSubmit={handleSubmit}>
        <div>
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
            onChange={(e) => setNumberOfPeople(e.target.value)}
          />
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

export default withFirebase(BookingForm);
