import React, { useState } from "react";

import { useInput } from "../hooks/input-hook";

import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  cell: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

function RoomListItem({ room, onRemoveRoom, onEditRoom }) {
  const classes = useStyles();

  const [editMode, setEditMode] = useState(false);
  const { value: roomNumber, bind: bindRoomNumber } = useInput(
    `${room.roomNumber}`
  );

  const { value: roomName, bind: bindRoomName } = useInput(`${room.roomName}`);

  const { value: roomCapacity, bind: bindRoomCapacity } = useInput(
    `${room.roomCapacity}`
  );

  function onToggleEditMode() {
    setEditMode(!editMode);
  }

  function onSaveEditRoom() {
    const editedRoom = {
      roomName,
      roomNumber,
      roomCapacity,
    };
    onEditRoom(room, editedRoom);

    setEditMode(false);
  }

  return !editMode ? (
    <TableRow>
      <TableCell>{room.roomName} </TableCell>
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
  ) : (
    <TableRow>
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
  );
}
export default RoomListItem;
