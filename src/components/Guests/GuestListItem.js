import React, { useState, useEffect } from "react";

import { withFirebase } from "../Firebase";

import {
  makeStyles,
  Radio,
  TableRow,
  TableCell,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
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
}));

function GuestListItem(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");
  const { guest } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  useEffect(() => {
    setFirstName(`${guest.firstName}`);
    setLastName(`${guest.lastName}`);
    setGender(`${guest.gender}`);
    setDateOfBirth(`${guest.dateOfBirth}`);
    setContactNumber(`${guest.contactNumber}`);
    setEmail(`${guest.email}`);
    setAddress(`${guest.address}`);
    setPostcode(`${guest.postcode}`);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const editedGuest = {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      contactNumber,
      email,
      address,
      postcode,
    };

    props.firebase
      .fetchId("guests", guest.uid)
      .set({
        ...editedGuest,
      })
      .then(() => {
        alert(`You have Edited 
    ${firstName} 
    ${lastName} 
    ${gender} 
    ${dateOfBirth} 
    ${contactNumber} 
    ${email} 
    ${address} 
    ${postcode} 
    `);
        handleClose();
      })
      .catch((error) => {
        setError({ error });
      });
  };

  function onRemoveGuest(uid) {
    props.firebase.fetchId("guests", uid).remove();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableRow hover onClick={handleClickOpen}>
        <TableCell>{firstName + " " + lastName}</TableCell>
        <TableCell>{dateOfBirth}</TableCell>
        <TableCell>{contactNumber}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell></TableCell>
      </TableRow>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {firstName + " " + lastName}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className={classes.root}>
            <TextField
              name="firstName"
              id="standard-basic"
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              name="lastName"
              id="standard-basic"
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              name="dateOfBirth"
              id="date"
              label="Date Of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              name="contactNumber"
              id="standard-basic"
              label="Contact Number"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <TextField
              name="email"
              id="standard-basic"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              name="address"
              id="standard-basic"
              label="Address"
              multiline
              rows={4}
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              name="postcode"
              id="standard-basic"
              label="Postcode"
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
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
            onClick={() => onRemoveGuest(guest.uid)}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Delete
          </Button>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default withFirebase(GuestListItem);
