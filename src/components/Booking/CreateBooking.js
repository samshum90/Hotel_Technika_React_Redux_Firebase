import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { RoomIcons } from "../Rooms";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Collapse,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    // flexDirection: "column",
  },
  paper: {
    padding: theme.spacing(2),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function CreateBooking(props) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [room, setRoom] = useState("");
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { booking, guests } = useSelector((state) => ({
    booking: Object.keys(state.bookingState.bookings || {})
      .map((key) => ({
        ...state.bookingState.bookings[key],
        uid: key,
      }))
      .find((booking) => booking.uid === id),
    guests: Object.keys(state.guestState.guests || {}).map((key) => ({
      ...state.guestState.guests[key],
      uid: key,
    })),
  }));

  useEffect(() => {
    if (!booking) {
      setLoading(true);
    }
    onListenForBooking();
    return () => {
      props.firebase.fetch("bookings").off();
    };
  }, []);

  function onListenForBooking() {
    setLoading(true);

    props.firebase.fetch("bookings").on("value", (snapshot) => {
      onSetBookings(snapshot.val());
    });

    setLoading(false);
  }

  function onSetBookings(bookings) {
    dispatch({ type: "BOOKINGS_SET", bookings });
  }

  function onToggleEditMode() {
    setEditMode(!editMode);
  }

  function handleSubmit() {}

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return editMode ? (
    <Container maxWidth="xl">
      <Paper className={classes.paper}>
        {loading && <p>Loading...</p>}
        <h2>Confirm details</h2>

        <form onSubmit={handleSubmit} className={classes.root}>
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
            type="submit"
            size="small"
          >
            Submit
          </Button>

          {error && <p>{error.message}</p>}
        </form>
      </Paper>
    </Container>
  ) : (
    <Container maxWidth="xl">
      <Paper className={classes.paper}>
        {loading && <p>Loading...</p>}
        {booking && (
          <>
            <h2>Confirm details</h2>

            <form onSubmit={handleSubmit} className={classes.root}>
              <div>
                <Typography>Check In Date: {booking.checkInDate}</Typography>
                <Typography>Check Out Date: {booking.checkOutDate}</Typography>
              </div>

              <Card>
                <CardContent>
                  <Typography>Room Name: {booking.room.roomName}</Typography>
                  <Typography>
                    Room Number: {booking.room.roomNumber}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Typography>Amenities</Typography>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <RoomIcons amenities={booking.room.amenities} />
                </Collapse>
              </Card>
              <Typography>Select Guests</Typography>

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
                type="submit"
                size="small"
              >
                Submit
              </Button>

              {error && <p>{error.message}</p>}
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
}
export default withFirebase(CreateBooking);
