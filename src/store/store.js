import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice.js";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
