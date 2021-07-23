import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/Tasks/taskSlice";
import userReducer from "../features/Users/userSlice";
export const store = configureStore({
  reducer: {
    task: taskReducer,
    user: userReducer,
  },
});
