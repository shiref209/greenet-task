import { useState } from "react";
import {
  Typography,
  Button,
  Fade,
  Modal,
  Box,
  Backdrop,
  TextField,
  Stack,
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { editTask } from "../../store/slices/taskSlice.js";
// style applied to modal component
const style = {
  position: "absolute",
  // for mobile keyboards to not overlap modal edit textfield
  top: { xs: "35%", sm: "50%" },
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80vw", sm: 400 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ id, isCompleted }) => {
  //   edit task state handler
  const [isEditing, setIsEditing] = useState(false);
  // Modal state management and methods
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // change editing state to false when modal is closed
    setIsEditing(false);
    setOpen(false);
  };

  //   extracting task value from redux state
  const task = useSelector((state) => {
    return state.tasks.tasks.find((item) => item.id === id)?.task;
  });
  const dispatch = useDispatch();
  //   react hook form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      edit: task,
    },
  });
  //   edit task state handler
  const handleChange = (e, field) => {
    setIsEditing(true);
    field.onChange(e);
  };
  //   submit edited task to global state
  const submitEdit = (data) => {
    dispatch(editTask({ id, task: data.edit }));
    handleClose();
  };
  return (
    <>
      <Button
        variant="contained"
        color="info"
        onClick={handleOpen}
        //  if task is marked as completed, disable edit option
        disabled={isCompleted}
      >
        <MdEdit size={20} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              color={"info.main"}
              variant="h5"
              textAlign={"center"}
              mb={2}
            >
              Edit Task
            </Typography>
            <Stack alignItems={"center"} gap={"1rem"}>
              <Controller
                name="edit"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    multiline
                    {...field}
                    onChange={(e) => handleChange(e, field)}
                  />
                )}
              />
              {/* Edit Icons container */}
              <Stack
                ml={"auto"}
                direction={"row"}
                gap={"1rem"}
                alignItems={"center"}
              >
                {/* confirm button */}
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit(submitEdit)}
                  //   if user not editing task, disable submit button
                  disabled={!isEditing}
                >
                  <FaCheckCircle size={25} />
                </Button>
                {/* cancel button */}
                <Button variant="contained" color="error" onClick={handleClose}>
                  <IoMdCloseCircle size={25} />
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default EditModal;
