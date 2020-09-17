import React, { useState } from "react";
import { withFirebase } from "../Firebase";
import { useInput } from "../hooks/input-hook";
import { compose } from "recompose";
import { withAuthorization } from "../Session";
import * as ROUTES from "../../constants/routes";
import {
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  TextField,
} from "@material-ui/core";

function Register() {
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

    this.props.firebase
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
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError({ error });
        alert(`${error} `);
      });
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
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
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
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
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
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
        <TextField
          name="address"
          id="standard-basic"
          label="Address"
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(Register);
