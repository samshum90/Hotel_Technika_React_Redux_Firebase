import React, { useEffect } from "react";
import { RoomIcons } from "../Rooms";

import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Box,
  CardActions,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.grid,
  },
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    paddingRight: theme.spacing(2),
  },
  grid: {
    padding: theme.spacing(2),
  },
  box: {
    width: "40wv",
    display: "flex",
  },
  card: {
    marginTop: theme.spacing(2),
  },
}));

function CreateBookingEdit({
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
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
}) {
  const classes = useStyles();

  function inputValues(guest) {
    return (
      guest.firstName +
      " " +
      guest.lastName +
      " " +
      guest.dateOfBirth +
      " " +
      guest.email
    );
  }

  return (
    <>
      {loading && (
        <Paper className={classes.paper}>
          <p>Loading...</p>
        </Paper>
      )}
      {booking && (
        <Grid container spacing={3} component={Paper} className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="h4">Confirm details</Typography>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <TextField
                  name="checkInDate"
                  id="date"
                  label="Check In Date"
                  className={classes.textField}
                  variant="filled"
                  type="date"
                  value={checkInDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
                <TextField
                  name="checkOutDate"
                  id="date"
                  label="Check Out Date"
                  type="date"
                  className={classes.textField}
                  variant="filled"
                  value={checkOutDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Typography>Select Guests:</Typography>
                {state.selectedGuests.map((selectedGuest, index) => (
                  <Grid key={index} item xs={12}>
                    <Autocomplete
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
                      value={selectedGuest}
                      getOptionSelected={(option, value) =>
                        option.firstName === value.firstName
                      }
                      rend
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
              </CardContent>
              <CardActions>
                <Button
                  color="secondary"
                  variant="contained"
                  type="button"
                  size="small"
                  onClick={addGuest}
                >
                  Add Guest
                </Button>
              </CardActions>
            </Card>
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
    </>
  );
}

export default CreateBookingEdit;
