import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function RoomListItem({ room }) {
  return (
    <TableRow>
      <TableCell>{room.roomName} </TableCell>
      <TableCell>{room.roomNumber} </TableCell>
      <TableCell>{room.roomCapacity} </TableCell>
    </TableRow>
  );
}
export default RoomListItem;
