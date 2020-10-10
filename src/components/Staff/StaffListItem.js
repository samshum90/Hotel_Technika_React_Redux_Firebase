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
  DialogTitle,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: 300,
    },
    " & .MuiFormControl-root": {
      margin: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  row: {
    cursor: "pointer",
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
    setCurrentRole(user.roles);
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

    console.log(editedUser);

    props.firebase
      .fetchId("users", user.uid)
      .set(editedUser)
      .then(() => {
        alert(`You have Edited 
    ${username} 
    `);
        setOpen(true);
      })
      .catch((error) => {
        setError({ error });
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
        <TableCell>{Object.keys(currentRole)}</TableCell>
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
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{username}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className={classes.root}>
            <TextField
              name="username"
              id="standard-basic"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              value={Object.keys(currentRole)}
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
          >
            Save
          </Button>

          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            variant="contained"
            type="button"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withFirebase(StaffListItem);
