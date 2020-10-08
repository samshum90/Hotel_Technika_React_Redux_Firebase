import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import { useSelector, useDispatch } from "react-redux";

import { withAuthorization } from "../Session";

import GuestListItem from "./GuestListItem";
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

function Guests(props) {
  const [loading, setLoading] = useState(false);
  const { guests } = useSelector((state) => ({
    guests: Object.keys(state.guestState.guests || {}).map((key) => ({
      ...state.guestState.guests[key],
      uid: key,
    })),
  }));
  const classes = useStyles();

  useEffect(() => {
    if (!guests.length) {
      setLoading(true);
    }
    setLoading(false);
  }, [guests]);

  return (
    <Container maxWidth="xl">
      <Paper className={classes.container}>
        <h2>Guests</h2>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Date Of Birth</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && <TableLoading />}
              {guests &&
                guests.map((guest) => (
                  <GuestListItem key={guest.uid} guest={guest} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withAuthorization(condition))(Guests);
