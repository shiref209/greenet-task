import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { addTask } from "../../store/slices/taskSlice.js";
import SingleToDo from "../SingleToDo/SingleToDo.jsx";

const MainCard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  // react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      task: "",
    },
  });
  const submitTask = (data) => {
    // add task to global state with generated id
    data.id = Math.random();
    dispatch(addTask(data));
    // reset the form after submitting
    reset();
  };
  return (
    <Container maxWidth="lg" disableGutters>
      <Stack margin={5}>
        <Typography color={"info.light"} variant="h1">
          TO DO LIST
        </Typography>

        {/* Container for form */}
        <Stack
          direction={{ sm: "row" }}
          gap={2}
          p={{ xs: "1.5rem 0", sm: "2rem" }}
          height={{ sm: "120px" }}
        >
          <Controller
            name="task"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                sx={{
                  width: { sm: "90%" },
                  flex: 6,
                }}
                label="Add New Task"
                variant="outlined"
                error={errors.task ? true : false}
                helperText={errors.task ? "invalid input" : ""}
                multiline
                {...field}
              />
            )}
          />
          <Box flex={1}>
            <Button
              variant="contained"
              sx={{ height: "100%" }}
              onClick={handleSubmit(submitTask)}
            >
              Add Task
            </Button>
          </Box>
        </Stack>
        {/* Tasks container */}
        <Stack m={{ sm: 3 }} gap={"2rem"}>
          {/* Render tasks from redux tasks slice */}
          <AnimatePresence>
            {(tasks || []).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 1 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.5 },
                }}
              >
                <SingleToDo content={item.task} id={item.id} />
              </motion.div>
            ))}
          </AnimatePresence>
        </Stack>
      </Stack>
    </Container>
  );
};

export default MainCard;
