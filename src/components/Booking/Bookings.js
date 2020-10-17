import React from "react";
import { useSelector } from "react-redux";

import * as ROLES from "../../constants/roles";
import GuestBooking from "./GuestBooking";
import StaffBooking from "./StaffBooking";

const Bookings = () => {
  const { authUser } = useSelector((state) => ({
    authUser: state.sessionState.authUser,
  }));

  return !!authUser.roles[ROLES.GUEST] ? <GuestBooking /> : <StaffBooking />;
};

export default Bookings;
