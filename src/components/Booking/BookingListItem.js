import React, { useState } from "react";

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

function BookingListItem({ room }) {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell>{room.roomName} </TableCell>
      <TableCell>{room.roomNumber} </TableCell>
      <TableCell>{room.roomCapacity} </TableCell>
      <TableCell className={classes.cell}>
        <Button
          color="secondary"
          variant="contained"
          type="button"
          //   onClick={}
          size="small"
        >
          Select
        </Button>
      </TableCell>
    </TableRow>
  );
}
export default BookingListItem;
