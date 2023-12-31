import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../store/slices/taskSlice.js";
const DeleteModal = ({ id }) => {
  // handle modal state and methods
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Delete method
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(id));
    // close modal after deleting
    handleClose();
  };
  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        <MdDelete size={20} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            padding: "1rem",
          },
        }}
      >
        <DialogTitle>
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            By clicking confirm, you will delete this task permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDelete}>
            Agree
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteModal;
