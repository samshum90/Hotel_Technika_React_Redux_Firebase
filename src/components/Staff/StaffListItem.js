import React, { useState, useEffect } from "react";

import { withFirebase } from "../Firebase";
import * as ROLES from "../../constants/roles";

import {
  makeStyles,
  TableRow,
  TableCell,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  InputLabel,
  Select,
  MenuItem,
  DialogTitle,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  row: {
    cursor: "pointer",
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

function StaffListItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { user } = props;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("");

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setCurrentRole(Object.keys(user.roles));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const roles = {};
    roles[currentRole] = currentRole;
    const editedUser = {
      username,
      email,
      roles,
    };

    props.firebase
      .fetchId("users", user.uid)
      .set(editedUser)
      .then(() => {
        alert(`You have Edited ${username}`);
        setOpen(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  function onRemoveUser(uid) {
    props.firebase.fetchId("users", uid).remove();
  }

  const handleSelectorChange = (e) => {
    setCurrentRole(e.target.value);
  };

  return (
    <>
      <TableRow hover className={classes.row}>
        <TableCell>{username}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{currentRole}</TableCell>
        <TableCell>
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={() => setOpen(true)}
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={() => onRemoveUser(user.uid)}
            color="secondary"
            variant="contained"
            type="button"
            size="small"
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog"
      >
        <DialogTitle id="alert-dialog-title">{user.uid}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className={classes.root}>
            <TextField
              name="username"
              id="standard-basic"
              label="Username"
              type="text"
              className={classes.textField}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Status
            </InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              value={currentRole}
              onChange={handleSelectorChange}
            >
              <MenuItem value={ROLES.ADMIN}>ADMIN</MenuItem>
              <MenuItem value={ROLES.STAFF}>STAFF</MenuItem>
              <MenuItem value={ROLES.GUEST}>GUEST</MenuItem>
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          {error && <p>{error.message}</p>}
          <Button
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
            type="submit"
            className={classes.button}
          >
            Save
          </Button>

          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            variant="contained"
            type="button"
            className={classes.button}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withFirebase(StaffListItem);
