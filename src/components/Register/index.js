import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { useInput } from "../hooks/input-hook";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import * as ROUTES from "../../constants/routes";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
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

function Register(props) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const {
    value: firstName,
    bind: bindFirstName,
    reset: resetFirstName,
  } = useInput("");

  const {
    value: lastName,
    bind: bindLastName,
    reset: resetLastName,
  } = useInput("");

  const [gender, setGender] = useState("");

  const {
    value: dateOfBirth,
    bind: bindDateOfBirth,
    reset: resetDateOfBirth,
  } = useInput("");

  const {
    value: contactNumber,
    bind: bindContactNumber,
    reset: resetContactNumber,
  } = useInput("");

  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");

  const { value: address, bind: bindAddress, reset: resetAddress } = useInput(
    ""
  );

  const {
    value: postcode,
    bind: bindPostcode,
    reset: resetPostcode,
  } = useInput("");

  const handleRadioChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const person = {
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
      .saveData(person, "guests")
      .then(() => {
        alert(`Submitting Name 
    ${firstName} 
    ${lastName} 
    ${gender} 
    ${dateOfBirth} 
    ${contactNumber} 
    ${email} 
    ${address} 
    ${postcode} 
    `);
        resetFirstName();
        resetLastName();
        setGender("");
        resetDateOfBirth();
        resetContactNumber();
        resetEmail();
        resetAddress();
        resetPostcode();
        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <h2>Registration</h2>

        <form onSubmit={handleSubmit} className={classes.root}>
          <div>
            <TextField
              name="firstName"
              id="standard-basic"
              label="First Name"
              type="text"
              {...bindFirstName}
            />

            <TextField
              name="lastName"
              id="standard-basic"
              label="Last Name"
              type="text"
              {...bindLastName}
            />
          </div>
          <TextField
            name="dateOfBirth"
            id="date"
            label="Date Of Birth"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            {...bindDateOfBirth}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <div>
            <TextField
              name="contactNumber"
              id="standard-basic"
              label="Contact Number"
              type="tel"
              {...bindContactNumber}
            />
            <TextField
              name="email"
              id="standard-basic"
              label="Email"
              type="email"
              {...bindEmail}
            />
          </div>
          <div>
            <TextField
              name="address"
              id="standard-basic"
              label="Address"
              multiline
              rows={4}
              type="text"
              {...bindAddress}
            />
            <TextField
              name="postCode"
              id="standard-basic"
              label="Postcode"
              type="text"
              {...bindPostcode}
            />
          </div>
          <Button color="secondary" variant="contained" type="submit">
            Submit
          </Button>

          {error && <p>{error.message}</p>}
        </form>
      </Paper>
    </Container>
  );
}

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(Register);
