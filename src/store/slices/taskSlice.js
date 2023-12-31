import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      // get task index
      const taskIndex = state.tasks.findIndex(
        (item) => item.id === action.payload.id
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex].task = action.payload.task;
      }
    },
  },
});
export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
