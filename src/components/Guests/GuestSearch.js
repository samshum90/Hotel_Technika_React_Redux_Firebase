import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import { Typography, TextField, Button } from "@material-ui/core/";

function GuestSearch({ classes, guests, setFilteredGuests }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let query = [
      firstName,
      lastName,
      dateOfBirth,
      contactNumber,
      email,
      address,
      postcode,
    ];
    const filteredGuests = guests.filter((guest) => {
      if (
        query[0] &&
        !guest.firstName.toLowerCase().includes(query[0].toLowerCase())
      ) {
        return false;
      }
      if (
        query[1] &&
        !guest.lastName.toLowerCase().includes(query[0].toLowerCase())
      ) {
        return false;
      }
      if (query[2] && !guest.dateOfBirth.includes(query[2])) {
        return false;
      }
      if (query[3] && !guest.contactNumber.includes(query[3])) {
        return false;
      }
      if (
        query[4] &&
        !guest.email.toLowerCase().includes(query[4].toLowerCase())
      ) {
        return false;
      }
      if (
        query[5] &&
        !guest.address.toLowerCase().includes(query[5].toLowerCase())
      ) {
        return false;
      }
      if (
        query[6] &&
        !guest.postcode.toLowerCase().includes(query[6].toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredGuests(filteredGuests);
  };

  return (
    <Paper className={classes.container}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        Search Guests
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className={classes.divider}>
          <TextField
            name="firstName"
            id="filled-basic"
            label="First Name"
            className={classes.textField}
            variant="filled"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            name="lastName"
            id="filled-basic"
            label="Last Name"
            className={classes.textField}
            variant="filled"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            name="dateOfBirth"
            id="date"
            label="Date Of Birth"
            className={classes.textField}
            variant="filled"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <TextField
            name="contactNumber"
            id="filled-basic"
            label="Contact Number"
            type="number"
            className={classes.textField}
            variant="filled"
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
        <div className={classes.divider}>
          <TextField
            name="email"
            id="filled-basic"
            label="Email"
            className={classes.textField}
            variant="filled"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            name="address"
            id="filled-margin-none"
            label="Address"
            className={classes.textField}
            type="text"
            variant="filled"
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            name="postcode"
            id="filled-basic"
            label="Postcode"
            className={classes.textField}
            variant="filled"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.divider}>
          <Button
            className={classes.button}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default GuestSearch;
