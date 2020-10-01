import React, { useState } from "react";
import { withFirebase } from "../Firebase";

import { Paper, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { useInput } from "../hooks/input-hook";

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

  const [amenities, setAmenities] = React.useState({
    accessibility: false,
    breakfast: false,
    parking: false,
    wifi: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const room = {
      roomName,
      roomNumber,
      roomCapacity,
      amenities,
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
        setAmenities({
          accessibility: false,
          breakfast: false,
          parking: false,
          wifi: false,
        });
      })
      .catch((error) => {
        setError({ error });
      });
  };

  const handleCheckboxChange = (event) => {
    setAmenities({ ...amenities, [event.target.name]: event.target.checked });
  };

  return (
    <Paper className={classes.paper}>
      <h2>Add a Room</h2>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          id="filled-full-width"
          label="Room Name"
          className={classes.headTextField}
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
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.accessibility}
                onChange={handleCheckboxChange}
                name="accessibility"
              />
            }
            label="Accessibility"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.breakfast}
                onChange={handleCheckboxChange}
                name="breakfast"
              />
            }
            label="Breakfast"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.parking}
                onChange={handleCheckboxChange}
                name="parking"
              />
            }
            label="Parking"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.wifi}
                onChange={handleCheckboxChange}
                name="wifi"
              />
            }
            label="Wifi"
          />
        </FormGroup>
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
