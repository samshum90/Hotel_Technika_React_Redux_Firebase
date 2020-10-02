import React from "react";

import AccessibleIcon from "@material-ui/icons/Accessible";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import LocalParkingIcon from "@material-ui/icons/LocalParking";
import WifiIcon from "@material-ui/icons/Wifi";

function RoomIcons({ amenities }) {
  return (
    <>
      {amenities.accessibility && <AccessibleIcon fontSize="large" />}
      {amenities.breakfast && <FreeBreakfastIcon fontSize="large" />}
      {amenities.parking && <LocalParkingIcon fontSize="large" />}
      {amenities.wifi && <WifiIcon fontSize="large" />}
    </>
  );
}

export default RoomIcons;
