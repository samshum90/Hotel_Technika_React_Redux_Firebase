import React, { useState, useEffect } from "react";

import { useInput } from "../hooks/input-hook";
import RoomIcons from "./RoomIcons";
import RoomDeleteConfirmation from "./RoomDeleteConfirmation";

import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  cell: {
    display: "flex",
    justifyContent: "space-around",
  },
  grid: {
    marginTop: theme.spacing(2),
  },
  card: {
    backgroundColor: theme.palette.background.default,
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

function RoomListItem({ room, onRemoveRoom, onEditRoom }) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const { value: roomNumber, bind: bindRoomNumber } = useInput(
    `${room.roomNumber}`
  );

  const { value: roomName, bind: bindRoomName } = useInput(`${room.roomName}`);

  const [roomCapacity, setRoomCapacity] = useState("");

  const [amenities, setAmenities] = React.useState({
    accessibility: false,
    breakfast: false,
    parking: false,
    wifi: false,
  });

  const [beds, setBeds] = useState("");

  useEffect(() => {
    setState();
  }, []);

  useEffect(() => {
    calculateCapacity();
  }, [beds]);

  function setState() {
    setRoomCapacity(room.roomCapacity);
    setAmenities({ ...room.amenities });
    setBeds(room.beds);
  }
  function onToggleEditMode() {
    setEditMode(!editMode);
  }

  function onSaveEditRoom() {
    const editedRoom = {
      roomName,
      roomNumber,
      roomCapacity,
      amenities,
    };
    onEditRoom(room, editedRoom);

    setEditMode(false);
  }

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

  const calculateCapacity = () => {
    let capacity = 0;
    for (let i = 0; i < beds.length; i++) {
      if (beds[i] === "Single") {
        capacity += 1;
      }
      if (beds[i] === "Double" || beds[i] === "Queen" || beds[i] === "King") {
        capacity += 2;
      }
    }

    setRoomCapacity(capacity);
  };

  return !editMode ? (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography>{room.roomName}</Typography>
        </TableCell>
        <TableCell>{room.roomNumber} </TableCell>
        <TableCell>{room.roomCapacity} </TableCell>
        <TableCell>£{room.pricePerNight} </TableCell>
        <TableCell className={classes.cell}>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={() => onToggleEditMode()}
            size="small"
          >
            Edit
          </Button>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={() => {
              setOpenDeleteConfirmation(true);
            }}
            size="small"
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container component={Box} className={classes.grid}>
              <Grid item xs={6}>
                <Typography gutterBottom component="div">
                  Amenities
                </Typography>

                <RoomIcons amenities={room.amenities} />
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="div">
                  Beds
                </Typography>
                <List>
                  {room.beds.map((bed, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={bed} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
      <RoomDeleteConfirmation
        room={room}
        setOpenDeleteConfirmation={setOpenDeleteConfirmation}
        onRemoveRoom={onRemoveRoom}
        openDeleteConfirmation={openDeleteConfirmation}
      />
    </>
  ) : (
    <>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>
          <TextField
            name="roomName"
            id="filled"
            label="Room Name"
            type="text"
            variant="filled"
            {...bindRoomName}
          />
        </TableCell>
        <TableCell>
          <TextField
            name="roomNumber"
            id="filled"
            label="Room Number"
            type="number"
            variant="filled"
            {...bindRoomNumber}
          />
        </TableCell>
        <TableCell>
          <TextField
            name="roomCapacity"
            id="filled"
            label="Room Capacity"
            type="number"
            variant="filled"
            value={roomCapacity}
            disabled
          />
        </TableCell>
        <TableCell className={classes.cell}>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={() => onSaveEditRoom()}
            size="small"
          >
            Save
          </Button>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={() => onToggleEditMode()}
            size="small"
          >
            Reset
          </Button>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={() => {
              setOpenDeleteConfirmation(true);
            }}
            size="small"
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell></TableCell>
        <TableCell colSpan={6}>
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
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell></TableCell>
        <TableCell colSpan={6}>
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
        </TableCell>
      </TableRow>
      <RoomDeleteConfirmation
        room={room}
        setOpenDeleteConfirmation={setOpenDeleteConfirmation}
        onRemoveRoom={onRemoveRoom}
        openDeleteConfirmation={openDeleteConfirmation}
      />
    </>
  );
}
export default RoomListItem;
