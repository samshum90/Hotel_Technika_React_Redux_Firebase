import React from "react";
import { withFirebase } from "../Firebase";

import { Button } from "@material-ui/core";

const SignOutButton = ({ firebase }) => (
  <Button
    color="secondary"
    variant="contained"
    type="button"
    onClick={firebase.doSignOut}
    size="small"
  >
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);
