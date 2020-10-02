import React, { useState } from "react";

import { useInput } from "../hooks/input-hook";
import RoomIcons from "./RoomIcons";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  cell: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

function RoomListItem({ room, onRemoveRoom, onEditRoom }) {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  const { value: roomNumber, bind: bindRoomNumber } = useInput(
    `${room.roomNumber}`
  );

  const { value: roomName, bind: bindRoomName } = useInput(`${room.roomName}`);

  const { value: roomCapacity, bind: bindRoomCapacity } = useInput(
    `${room.roomCapacity}`
  );

  const [amenities, setAmenities] = React.useState({
    accessibility: false,
    breakfast: false,
    parking: false,
    wifi: false,
  });

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
            onClick={() => onRemoveRoom(room.uid)}
            size="small"
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography gutterBottom component="div">
                Amenities
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <RoomIcons amenities={room.amenities} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
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
            {...bindRoomCapacity}
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
            onClick={() => onRemoveRoom(room.uid)}
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
    </>
  );
}
export default RoomListItem;
