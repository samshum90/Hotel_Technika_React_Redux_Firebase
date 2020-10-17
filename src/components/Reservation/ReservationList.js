import React, { useState } from "react";

import ReservationListItem from "./ReservationListItem";
import TableLoading from "../Loading/TableLoading";
import TableHeads from "./TableHeads";
import TableToolbar from "./TableToolbar";
import { withFirebase } from "../Firebase";

import {
  TableContainer,
  Table,
  Paper,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  TablePagination,
} from "@material-ui/core";

function ReservationList(props) {
  const { classes, error, setError, loading, bookings } = props;
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [orderBy, setOrderBy] = useState("checkInDate");
  const [order, setOrder] = useState("asc");

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
      props.firebase.fetchId("bookings", selected[i]).remove();
    }
  }

  function handleDeleteAllSelected() {
    if (selected.length > 1) {
      loopDelete();
      setOpenDeleteConfirmation(false);
      setSelected([]);
    } else {
      props.firebase.fetchId("bookings", selected).remove();
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookings.map((n) => n.uid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  return (
    <Paper className={classes.container}>
      <TableToolbar
        numSelected={selected.length}
        deleteAllSelected={() => setOpenDeleteConfirmation(true)}
      />
      {error && <p>{error.message}</p>}
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHeads
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={bookings.length}
          />
          <TableBody>
            {loading && <TableLoading />}
            {bookings &&
              stableSort(bookings, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((reservation, index) => (
                  <ReservationListItem
                    key={reservation.uid}
                    index={index}
                    reservation={reservation}
                    setError={setError}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={bookings.length}
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
            reservations?
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
  );
}

export default withFirebase(ReservationList);
