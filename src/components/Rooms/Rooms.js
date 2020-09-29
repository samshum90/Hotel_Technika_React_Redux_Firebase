import React, { useState, useEffect } from "react";
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
  const { rooms } = props;

  useEffect(() => {
    if (!rooms.length) {
      setLoading(true);
    }
    onListenForRooms();
    return () => {
      props.firebase.messages().off();
    };
  }, [rooms.length]);

  function onListenForRooms() {
    setLoading(true);

    props.firebase.fetch("rooms").on("value", (snapshot) => {
      props.onSetRooms(snapshot.val());

      setLoading(false);
    });
  }

  return (
    <Container maxWidth="xl">
      <RoomForm />
      <RoomList
        loading={loading}
        rooms={rooms.map((room) => ({
          ...room,
        }))}
      />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  rooms: Object.keys(state.roomState.rooms || {}).map((key) => ({
    ...state.roomState.rooms[key],
    uid: key,
  })),
});

const mapDispatchToProps = (dispatch) => ({
  onSetRooms: (rooms) => dispatch({ type: "ROOMS_SET", rooms }),
});

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withFirebase,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps)
)(Rooms);
