import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjY5Njg0MzIsIm5iZiI6MTYyNjk2ODQzMiwianRpIjoiMDQ1NjJjZDctNWNlNS00NTRkLTgwZWMtNTBmOWMzNzc4NzljIiwiaWRlbnRpdHkiOnsibmFtZSI6Ik1haGkgTVNEIENTSyBDYXB0YWluIiwiZW1haWwiOiJnb29kQHRlc3QzLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzQxYzFkNDg1NjRhODQzNWQ4MTU2NDM5OTZkOWEzODhmIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mZDE3ZDIwNjUwYzk5NTk0YWVmNmQxMjVhMjU5ODdlYT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.-PCaIW99OSHt6E7txuql31AutUwUOXdSji8DA0s4PTc";
const company_id = "company_0336d06ff0ec4b3b9306ddc288482663";
const initialState = {
  tasks: [],
  taskToEdit: {},
  status: "idle",
};

export const addNewTask = createAsyncThunk("/add-task", async ({ payload }) => {
  const response = await axios.post(
    `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=${company_id}`,
    payload,
    {
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});
export const getAllTasks = createAsyncThunk("/get-all-task", async () => {
  const response = await axios.get(
    `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=${company_id}`,
    {
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

export const updateTask = createAsyncThunk(
  "/update-task",
  async ({ payload, task_id }) => {
    const response = await axios.put(
      `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${task_id}?company_id=${company_id}`,
      payload,
      {
        headers: {
          Authorization: "Bearer " + ACCESS_TOKEN,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);
export const deleteTask = createAsyncThunk(
  "/delete-task",
  async ({ task_id }) => {
    await axios.delete(
      `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${task_id}?company_id=${company_id}`,
      {
        headers: {
          Authorization: "Bearer " + ACCESS_TOKEN,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return task_id;
  }
);
export const taskSlice = createSlice({
  name: "task manager",
  initialState,
  reducers: {
    setTaskToEdit(state, action) {
      state.taskToEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.status = "done";
        state.tasks.push(action.payload.results);
      })
      .addCase(getAllTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.status = "done";
        state.tasks = action.payload.results;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "done";
        const findIndex = state.tasks.findIndex(
          (item) => item.id === action.payload.results.id
        );
        state.tasks[findIndex] = action.payload.results;
        state.taskToEdit = {};
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "done";
        state.tasks = state.tasks.filter((item) => item.id !== action.payload);
      });
  },
});
export const { setTaskToEdit } = taskSlice.actions;
export default taskSlice.reducer;
