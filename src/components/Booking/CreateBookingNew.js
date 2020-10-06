import React from "react";
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
    // marginTop: "10px",
    backgroundColor: theme.palette.background.grid,
  },
  paper: {
    padding: theme.spacing(2),
  },
  grid: {
    padding: theme.spacing(2),
  },
  box: {
    width: "40wv",
    display: "flex",
    // "align-items": "baseline",
  },
  card: {
    marginTop: theme.spacing(2),
  },
}));

function CreateBookingNew({
  booking,
  guests,
  onToggleEditMode,
  error,
  handleSubmit,
  addGuest,
  handleGuest,
  handleDeleteGuest,
  state,
  checkInDate,
  checkOutDate,
  room,
  numberOfGuests,
}) {
  const classes = useStyles();

  function selectorOptions(guest) {
    if (!!guest.lastName) {
      return (
        guest.firstName +
        " " +
        guest.lastName +
        " " +
        guest.dateOfBirth +
        " " +
        guest.email
      );
    } else {
      return guest.firstName;
    }
  }

  return (
    <>
      {booking && (
        <Grid container spacing={3} component={Paper} className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="h4">Confirm details</Typography>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography>Check In Date: {checkInDate}</Typography>
                <Typography>Check Out Date: {checkOutDate}</Typography>
                <Typography> Number of Guests: {numberOfGuests}</Typography>
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
                      getOptionLabel={(guest) => selectorOptions(guest)}
                      size="small"
                      onChange={(event, guest) => handleGuest(index, guest)}
                      value={selectedGuest}
                      getOptionSelected={(option, value) =>
                        option.firstName === value.firstName
                      }
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
              {room && (
                <CardContent>
                  <Typography>Room Name: {room.roomName}</Typography>
                  <RoomIcons amenities={room.amenities} />
                </CardContent>
              )}
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
              onClick={(event) => handleSubmit(event)}
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

export default CreateBookingNew;
