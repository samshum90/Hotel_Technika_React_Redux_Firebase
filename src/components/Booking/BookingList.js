import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import BookingListItem from "./BookingListItem";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2),
  },
}));

function BookingList({ filteredRooms, createBooking }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Available Rooms
      </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Room Name</TableCell>
            <TableCell>Room Number</TableCell>
            <TableCell>Room Capacity</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRooms &&
            filteredRooms.map((room) => (
              <BookingListItem
                key={room.uid}
                room={room}
                createBooking={createBooking}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BookingList;
