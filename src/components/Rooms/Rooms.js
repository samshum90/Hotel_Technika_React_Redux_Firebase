import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Container } from "@material-ui/core";

import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";

import * as ROLES from "../../constants/roles";
import RoomForm from "./RoomForm";
import RoomList from "./RoomList";

function Rooms(props) {
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth="xl">
      <RoomForm />
      <RoomList />
    </Container>
  );
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withFirebase, withAuthorization(condition))(Rooms);
