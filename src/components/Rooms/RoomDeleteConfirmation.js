import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@material-ui/core";

function RoomDeleteConfirmation({
  openDeleteConfirmation,
  setOpenDeleteConfirmation,
  room,
  onRemoveRoom,
}) {
  return (
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
          Are you sure you want to Delete {room.roomName}?
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
        <Button
          onClick={() => onRemoveRoom(room.uid)}
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default RoomDeleteConfirmation;
