import React from "react";
import { RoomIcons } from "../Rooms";

import {
  Grid,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Box,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    // flexDirection: "column",
  },
  paper: {
    padding: theme.spacing(2),
  },
  grid: {
    padding: theme.spacing(2),
  },
  box: {
    width: 900,
  },
  input: {
    width: 900,
  },
}));

function CreateBookingNew({
  booking,
  guests,
  onToggleEditMode,
  loading,
  error,
  handleSubmit,
  addGuest,
  handleGuest,
  handleDeleteGuest,
  state,
}) {
  const classes = useStyles;

  return (
    <Container className={classes.root} maxWidth="xl">
      {loading && (
        <Paper className={classes.paper}>
          <p>Loading...</p>
        </Paper>
      )}
      {booking && (
        <Grid container spacing={3} component={Paper}>
          <Grid item xs={12}>
            <h2>Confirm details</h2>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Typography>Check In Date: {booking.checkInDate}</Typography>
              <Typography>Check Out Date: {booking.checkOutDate}</Typography>
            </div>
            <Typography>Select Guests:</Typography>
            {state.selectedGuests.map((selectedGuest, index) => (
              <Grid key={index} item xs={12}>
                <Autocomplete
                  classes={{
                    option: classes.option,
                    input: classes.input,
                  }}
                  id="combo-box-demo"
                  options={guests}
                  getOptionLabel={(guest) =>
                    guest.firstName +
                    " " +
                    guest.lastName +
                    " " +
                    guest.dateOfBirth +
                    " " +
                    guest.email
                  }
                  size="small"
                  onChange={(event, guest) => handleGuest(index, guest)}
                  // value={guest}
                  renderInput={(params) => (
                    <Box component="div" className={classes.box}>
                      <TextField {...params} variant="outlined" />
                      <IconButton
                        color="primary"
                        aria-label="remove guest"
                        onClick={handleDeleteGuest(index)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Box>
                  )}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography>Room Name: {booking.room.roomName}</Typography>
                <RoomIcons amenities={booking.room.amenities} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              size="small"
              onClick={addGuest}
            >
              Add Guest
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={() => onToggleEditMode()}
              size="small"
            >
              edit
            </Button>

            <Button
              color="secondary"
              variant="contained"
              type="button"
              size="small"
              onClick={() => handleSubmit}
            >
              Submit
            </Button>

            {error && <p>{error.message}</p>}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CreateBookingNew;
