import React, { useState } from "react";
import { withFirebase } from "../Firebase";

import {
  Paper,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
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
    width: "64vw",
  },
  textField: {
    marginRight: theme.spacing(1),
    width: "20vw",
  },
  paper: {
    padding: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(1),
    display: "flex",
    // flexWrap: "wrap",
    flexDirection: "row",
  },
  select: {
    marginBottom: theme.spacing(0.5),
    width: "20vw",
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
    value: pricePerNight,
    bind: bindPricePerNight,
    reset: resetPricePerNight,
  } = useInput("");

  const [beds, setBeds] = useState(["Bed 1"]);

  const [amenities, setAmenities] = useState({
    accessibility: false,
    breakfast: false,
    parking: false,
    wifi: false,
  });

  const calculateCapacity = () => {
    let capacity = 0;
    console.log("initial", capacity);
    for (let i = 0; i < beds.length; i++) {
      if (beds[i] === "Single") {
        capacity += 1;
      }
      console.log("first", capacity);
      if (beds[i] === "Double" || beds[i] === "Queen" || beds[i] === "King") {
        capacity += 2;
      }
      console.log("second", capacity);
    }
    console.log("final", capacity);
    return capacity;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const roomCapacity = calculateCapacity();
    const room = {
      roomName,
      roomNumber,
      roomCapacity,
      amenities,
      pricePerNight,
      beds,
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
        resetPricePerNight();
        setBeds([]);
        setAmenities({
          accessibility: false,
          breakfast: false,
          parking: false,
          wifi: false,
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleCheckboxChange = (event) => {
    setAmenities({ ...amenities, [event.target.name]: event.target.checked });
  };

  function handleBed(e, i) {
    let newBedsArray = [...beds];
    newBedsArray[i] = e.target.value;
    setBeds(newBedsArray);
  }

  const handleDeleteBed = (i) => (e) => {
    e.preventDefault();
    let newBedsArray = [...beds.slice(0, i), ...beds.slice(i + 1)];
    setBeds(newBedsArray);
  };

  const addBed = (e) => {
    e.preventDefault();
    let newInput = `Bed ${beds.length + 1}`;
    let newBedsArray = beds.concat([newInput]);
    setBeds(newBedsArray);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" gutterBottom className={classes.title}>
        Add a Room
      </Typography>

      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          id="filled-margin-none"
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
            name="pricePerNight"
            id="filled-margin-none"
            label="Price Per Night"
            type="number"
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">£</InputAdornment>
              ),
            }}
            className={classes.textField}
            {...bindPricePerNight}
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
          {beds.map((bed, i) => (
            <FormControl
              key={i}
              variant="filled"
              className={classes.formControl}
              size="small"
            >
              <InputLabel id="simple-select-label">Beds</InputLabel>
              <Select
                labelId="simple-select-label"
                id="demo-simple-select"
                value={bed}
                className={classes.select}
                onChange={(e) => handleBed(e, i)}
              >
                <option value={"Single"}>Single</option>
                <option value={"Double"}>Double</option>
                <option value={"Queen"}>Queen</option>
                <option value={"King"}>King</option>
              </Select>
              <IconButton
                color="primary"
                aria-label="remove guest"
                onClick={handleDeleteBed(i)}
              >
                <ClearIcon />
              </IconButton>
            </FormControl>
          ))}
          <Button
            color="secondary"
            variant="contained"
            type="button"
            size="small"
            onClick={addBed}
          >
            Add a Bed
          </Button>
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
