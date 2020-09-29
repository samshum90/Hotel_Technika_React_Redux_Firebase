import React, { useState } from "react";
import { withFirebase } from "../Firebase";

import { Paper, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useInput } from "../hooks/input-hook";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  textField: {
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  paper: {
    padding: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function RoomForm(props) {
  // const [beds, setBeds] = useState([]);
  const [error, setError] = useState("");
  const classes = useStyles();

  const {
    value: roomNumber,
    bind: bindRoomNumber,
    reset: resetRoomNumber,
  } = useInput("");

  const {
    value: roomName,
    bind: bindRoomName,
    reset: resetRoomName,
  } = useInput("");

  const {
    value: roomCapacity,
    bind: bindRoomCapacity,
    reset: resetRoomCapacity,
  } = useInput("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const room = {
      roomName,
      roomNumber,
      roomCapacity,
    };

    props.firebase
      .saveData(room, "rooms")
      .then(() => {
        alert(`Submitting Room ${roomName}, 
    Room number: ${roomNumber},
    Number of People: ${roomCapacity} 
    `);
        resetRoomName();
        resetRoomNumber();
        resetRoomCapacity();
      })
      .catch((error) => {
        setError({ error });
      });
  };

  return (
    <Paper className={classes.paper}>
      <h2>Add a Room</h2>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          id="filled-full-width"
          label="Room Name"
          fullWidth
          margin="normal"
          variant="filled"
          {...bindRoomName}
        />
        <div>
          <TextField
            name="roomNumber"
            id="filled-margin-none"
            label="Room Number"
            type="number"
            className={classes.textField}
            variant="filled"
            {...bindRoomNumber}
          />
          <TextField
            name="roomCapacity"
            id="filled-margin-none"
            label="Room Capacity"
            type="number"
            variant="filled"
            className={classes.textField}
            {...bindRoomCapacity}
          />
        </div>
        <div>
          <Button
            className={classes.button}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>

          {error && <p>{error.message}</p>}
        </div>
      </form>
    </Paper>
  );
}

export default withFirebase(RoomForm);
