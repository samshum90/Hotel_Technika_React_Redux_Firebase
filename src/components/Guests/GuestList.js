import React from "react";
import TableLoading from "../Loading/TableLoading";

import { makeStyles } from "@material-ui/core/styles";
import GuestListItem from "./GuestListItem";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

function GuestList({ guests, loading }) {
  const classes = useStyles();

  return (
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
  );
}

export default GuestList;
