import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import { useSelector, useDispatch } from "react-redux";

import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

import StaffListItem from "./StaffListItem";
import TableLoading from "../Loading/TableLoading";
import * as ROLES from "../../constants/roles";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

function Staff(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { users } = useSelector((state) => ({
    users: Object.keys(state.userState.users || {}).map((key) => ({
      ...state.userState.users[key],
      uid: key,
    })),
  }));

  useEffect(() => {
    if (!users.length) {
      setLoading(true);
    }
    onListenForUsers();
    return () => {
      props.firebase.fetch("users").off();
    };
  }, [users]);

  function onListenForUsers() {
    props.firebase.fetch("users").on("value", (snapshot) => {
      onSetUsers(snapshot.val());
    });

    setLoading(false);
  }

  function onSetUsers(users) {
    dispatch({ type: "USERS_SET", users });
  }

  return (
    <Container maxWidth="xl">
      <Paper className={classes.container}>
        <h2>Staff</h2>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Role</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && <TableLoading />}
              {users &&
                users.map((user) => (
                  <StaffListItem key={user.uid} user={user} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withFirebase, withAuthorization(condition))(Staff);
