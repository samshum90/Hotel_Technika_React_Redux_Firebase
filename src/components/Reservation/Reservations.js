import React from "react";
import { useSelector } from "react-redux";

import * as ROLES from "../../constants/roles";
import GuestReservations from "./GuestReservations";
import StaffReservations from "./StaffReservations";

const Reservations = () => {
  const { authUser } = useSelector((state) => ({
    authUser: state.sessionState.authUser,
  }));

  return !!authUser.roles[ROLES.GUEST] ? (
    <GuestReservations />
  ) : (
    <StaffReservations />
  );
};

export default Reservations;
