import React from "react";
import { RoomIcons } from "../Rooms";
import { useSelector } from "react-redux";

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
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import KingBedIcon from "@material-ui/icons/KingBed";
import SingleBedIcon from "@material-ui/icons/SingleBed";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.grid,
    padding: theme.spacing(1),
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
  error,
  handleSubmit,
  addGuest,
  handleGuest,
  handleDeleteGuest,
  selectedGuests,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate,
  setRoom,
  room,
  numberOfGuests,
  setNumberOfGuests,
  reservationMode,
  status,
  setStatus,
}) {
  const classes = useStyles();
  const { rooms } = useSelector((state) => ({
    rooms: Object.keys(state.roomState.rooms || {}).map((key) => ({
      ...state.roomState.rooms[key],
      uid: key,
    })),
  }));

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
          {!reservationMode ? (
            <Grid item xs={12}>
              <Typography variant="h4">Confirm details</Typography>
            </Grid>
          ) : null}
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography>Booking Details</Typography>
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
                <TextField
                  disabled
                  name="numberOfPeople"
                  id="filled-margin-none"
                  label="Number Of People"
                  type="number"
                  variant="filled"
                  className={classes.textField}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                  value={numberOfGuests}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Typography>Select Guests:</Typography>
                {selectedGuests.map((selectedGuest, index) => (
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
              {room && (
                <CardContent>
                  <Typography>Room Details</Typography>
                  <Autocomplete
                    id="combo-box-demo"
                    options={rooms}
                    getOptionLabel={(room) =>
                      room.roomName + " Capacity:" + room.roomCapacity
                    }
                    size="small"
                    onChange={(event, room) => setRoom(room)}
                    value={room}
                    getOptionSelected={(option, value) =>
                      option.roomName === value.roomName
                    }
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                  <RoomIcons amenities={room.amenities} />
                  <List>
                    {room.beds.map((bed, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {bed === "Single" ? (
                            <SingleBedIcon />
                          ) : (
                            <KingBedIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText primary={bed} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              )}
            </Card>
            {reservationMode ? (
              <Card className={classes.card}>
                <CardContent>
                  <Typography>Status</Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    size="small"
                    fullWidth
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value={"Started"}>Started</MenuItem>
                      <MenuItem value={"Booked"}>Booked</MenuItem>
                      <MenuItem value={"Checked In"}>Checked In</MenuItem>
                      <MenuItem value={"Complete"}>Complete</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            ) : null}
          </Grid>
          {!reservationMode ? (
            <Grid item xs={12}>
              <Button
                color="secondary"
                variant="contained"
                type="button"
                onClick={() => onToggleEditMode()}
                size="small"
              >
                Cancel
              </Button>

              <Button
                color="secondary"
                variant="contained"
                type="button"
                size="small"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>

              {error && <p>{error.message}</p>}
            </Grid>
          ) : null}
        </Grid>
      )}
    </>
  );
}

export default CreateBookingEdit;
