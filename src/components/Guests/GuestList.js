import React, { useState } from "react";
import TableLoading from "../Loading/TableLoading";

import GuestListItem from "./GuestListItem";
import TableHeads from "./TableHeads";

import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

function GuestList({
  guests,
  loading,
  selected,
  setSelected,
  page,
  rowsPerPage,
}) {
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState("calories");
  const [order, setOrder] = React.useState("asc");

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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = guests.map((n) => n.uid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHeads
          classes={classes}
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={guests.length}
        />
        <TableBody>
          {loading && <TableLoading />}
          {guests &&
            stableSort(guests, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((guest, index) => (
                <GuestListItem
                  key={guest.uid}
                  guest={guest}
                  index={index}
                  selected={selected}
                  setSelected={setSelected}
                />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GuestList;
