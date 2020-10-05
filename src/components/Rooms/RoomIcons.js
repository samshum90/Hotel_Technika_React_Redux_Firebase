import React from "react";

import AccessibleIcon from "@material-ui/icons/Accessible";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import WifiIcon from "@material-ui/icons/Wifi";
import Tooltip from "@material-ui/core/Tooltip";
function RoomIcons({ amenities }) {
  return (
    <>
      {amenities.accessibility && (
        <Tooltip title="Wheelchair accessible">
          <AccessibleIcon fontSize="large" />
        </Tooltip>
      )}
      {amenities.breakfast && (
        <Tooltip title="Free Breakfast included">
          <FreeBreakfastIcon fontSize="large" />
        </Tooltip>
      )}
      {amenities.parking && (
        <Tooltip title="Includes Parking">
          <LocalParkingIcon fontSize="large" />
        </Tooltip>
      )}
      {amenities.wifi && (
        <Tooltip title="Free Wi-fi">
          <WifiIcon fontSize="large" />
        </Tooltip>
      )}
    </>
  );
}

export default RoomIcons;
