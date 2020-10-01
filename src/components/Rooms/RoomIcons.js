import React from "react";

import AccessibleIcon from "@material-ui/icons/Accessible";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import WifiIcon from "@material-ui/icons/Wifi";
import TableCell from "@material-ui/core/TableCell";

function RoomIcons({ amenities }) {
  return (
    <TableCell>
      {amenities.accessibility && <AccessibleIcon fontSize="large" />}
      {amenities.breakfast && <FreeBreakfastIcon fontSize="large" />}
      {amenities.parking && <LocalParkingIcon fontSize="large" />}
      {amenities.wifi && <WifiIcon fontSize="large" />}
    </TableCell>
  );
}

export default RoomIcons;
