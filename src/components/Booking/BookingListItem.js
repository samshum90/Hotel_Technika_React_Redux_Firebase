import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Grid from "@material-ui/core/Grid";
import RoomIcons from "../Rooms/RoomIcons";
import KingBedIcon from "@material-ui/icons/KingBed";
import SingleBedIcon from "@material-ui/icons/SingleBed";

const useStyles = makeStyles((theme) => ({
  cell: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

function BookingListItem(props) {
  const [open, setOpen] = useState(false);
  const { room, createBooking } = props;
  const classes = useStyles();

  return (
    <>
      <TableRow>
        <TableCell>
          {room.roomNumber && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell>{room.roomName} </TableCell>
        <TableCell>{room.roomNumber} </TableCell>
        <TableCell>{room.roomCapacity} </TableCell>
        <TableCell className={classes.cell}>
          {room.roomNumber && (
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={() => createBooking(room)}
              size="small"
            >
              Select
            </Button>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container component={Box} className={classes.grid}>
              <Grid item xs={6}>
                <Typography gutterBottom component="div">
                  Amenities
                </Typography>

                <RoomIcons amenities={room.amenities} />
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="div">
                  Beds
                </Typography>
                <List>
                  {room.beds.map((bed, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {bed === "Single" ? <SingleBedIcon /> : <KingBedIcon />}
                      </ListItemIcon>
                      <ListItemText primary={bed} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
export default BookingListItem;
