import React from "react";

import ReservationListItem from "./ReservationListItem";
import TableLoading from "../Loading/TableLoading";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

function ReservationList({ classes, error, setError, loading, bookings }) {
  return (
    <Paper className={classes.container}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Reservations
      </Typography>
      {error && <p>{error.message}</p>}
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Booking Ref</TableCell>
              <TableCell>Check In Date</TableCell>
              <TableCell>Check Out Date</TableCell>
              <TableCell>Number of Guests</TableCell>
              <TableCell>Room Name</TableCell>
              <TableCell>Booking Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <TableLoading />}
            {bookings &&
              bookings.map((reservation) => (
                <ReservationListItem
                  key={reservation.uid}
                  reservation={reservation}
                  setError={setError}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ReservationList;
