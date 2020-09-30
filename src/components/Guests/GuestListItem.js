import React from "react";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function GuestListItem({ guest }) {
  return (
    <TableRow>
      <TableCell>{guest.firstName + " " + guest.lastName}</TableCell>
      <TableCell>{guest.dateOfBirth}</TableCell>
      <TableCell>{guest.contactNumber}</TableCell>
      <TableCell>{guest.email}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}

export default GuestListItem;
