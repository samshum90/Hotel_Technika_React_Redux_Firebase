import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import { useSelector } from "react-redux";

import { withAuthorization } from "../Session";

import GuestSearch from "./GuestSearch";
import GuestList from "./GuestList";
import TableToolbar from "./TableToolbar";
import * as ROLES from "../../constants/roles";

import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  textField: {
    marginRight: theme.spacing(1),
    width: "15wv",
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
}));

function Guests(props) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [filteredGuests, setFilteredGuests] = useState("");
  const { guests } = useSelector((state) => ({
    guests: Object.keys(state.guestState.guests || {}).map((key) => ({
      ...state.guestState.guests[key],
      uid: key,
    })),
  }));
  const classes = useStyles();

  useEffect(() => {
    if (!guests.length) {
      setLoading(true);
    }
    setFilteredGuests(guests);
    setLoading(false);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function loopDelete() {
    for (let i = 0; i < selected.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
      props.firebase.fetchId("guests", selected[i]).remove();
    }
  }

  function handleDeleteAllSelected() {
    if (selected.length > 1) {
      loopDelete();
      setOpenDeleteConfirmation(false);
      setSelected([]);
    } else {
      props.firebase.fetchId("guests", selected).remove();
    }
  }

  return (
    <Container maxWidth="xl">
      <GuestSearch
        classes={classes}
        guests={guests}
        setFilteredGuests={setFilteredGuests}
      />

      <Paper className={classes.container}>
        <TableToolbar
          numSelected={selected.length}
          deleteAllSelected={() => setOpenDeleteConfirmation(true)}
        />
        <GuestList
          guests={filteredGuests}
          loading={loading}
          selected={selected}
          setSelected={setSelected}
          page={page}
          rowsPerPage={rowsPerPage}
        />
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={guests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Dialog
          open={openDeleteConfirmation}
          onClose={() => {
            setOpenDeleteConfirmation(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to Delete the selected {selected.length}{" "}
              guests?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDeleteConfirmation(false);
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteAllSelected} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}

const condition = (authUser) =>
  (authUser && !!authUser.roles[ROLES.ADMIN]) ||
  (authUser && !!authUser.roles[ROLES.STAFF]);

export default compose(withAuthorization(condition))(Guests);
