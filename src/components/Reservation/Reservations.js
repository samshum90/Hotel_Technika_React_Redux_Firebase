import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { withAuthorization } from "../Session";

import ReservationListItem from "./ReservationListItem";
import TableLoading from "../Loading/TableLoading";
import * as ROLES from "../../constants/roles";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

function Reservations() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { bookings } = useSelector((state) => ({
    bookings: Object.keys(state.bookingState.bookings || {}).map((key) => ({
      ...state.bookingState.bookings[key],
      uid: key,
    })),
  }));
  const classes = useStyles();

  useEffect(() => {
    if (!bookings.length) {
      setLoading(true);
    }
    setLoading(false);
  }, [bookings]);

  return (
    <Container maxWidth="xl">
      <Paper className={classes.container}>
        <h2>Reservations</h2>
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
    </Container>
  );
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(Reservations);
