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
} from "@material-ui/core";
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
}));

function CreateBookingEdit({
  booking,
  guests,
  onToggleEditMode,
  loading,
  error,
  setCheckInDate,
  setCheckOutDate,
  setSelectedGuests,
  handleSubmit,
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
        <Grid container spacing={0} component={Paper} className={classes.grid}>
          <Grid item xs={12}>
            <h2>Confirm details</h2>
          </Grid>
          <Grid item xs={6}>
            <div>
              <TextField
                name="checkInDate"
                id="date"
                label="Check In Date"
                className={classes.textField}
                variant="filled"
                type="date"
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
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>

            <Typography>Select Guests:</Typography>
            <Autocomplete
              id="combo-box-demo"
              options={guests}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Combo box" variant="outlined" />
              )}
            />
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
    </Container>
  );
}

export default CreateBookingEdit;
