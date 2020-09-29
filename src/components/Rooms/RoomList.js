import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import RoomListItem from "./RoomListItem";
import TableLoading from "../Loading/TableLoading";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function RoomList({ loading, rooms, onRemoveRoom, onEditRoom }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Room Name</TableCell>
            <TableCell>Room Number</TableCell>
            <TableCell>Room Capacity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && <TableLoading />}
          {rooms &&
            rooms.map((room) => (
              <RoomListItem
                key={room.uid}
                room={room}
                onRemoveRoom={onRemoveRoom}
                onEditRoom={onEditRoom}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RoomList;
