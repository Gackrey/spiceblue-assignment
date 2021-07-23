import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjY5Njg0MzIsIm5iZiI6MTYyNjk2ODQzMiwianRpIjoiMDQ1NjJjZDctNWNlNS00NTRkLTgwZWMtNTBmOWMzNzc4NzljIiwiaWRlbnRpdHkiOnsibmFtZSI6Ik1haGkgTVNEIENTSyBDYXB0YWluIiwiZW1haWwiOiJnb29kQHRlc3QzLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzQxYzFkNDg1NjRhODQzNWQ4MTU2NDM5OTZkOWEzODhmIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mZDE3ZDIwNjUwYzk5NTk0YWVmNmQxMjVhMjU5ODdlYT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.-PCaIW99OSHt6E7txuql31AutUwUOXdSji8DA0s4PTc";
const company_id = "company_0336d06ff0ec4b3b9306ddc288482663";
const initialState = {
  users: [],
  status: "idle",
};

export const getAllUsers = createAsyncThunk("/get-all-users", async () => {
  const response = await axios.get(
    `https://stage.api.sloovi.com/team?company_id=${company_id}&product=outreach`,
    {
      headers: {
        Authorization: "Bearer " + ACCESS_TOKEN,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.results.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "done";
        state.users = action.payload.filter(
          (item) => item.user_status === "accepted"
        );
      });
  },
});

export default userSlice.reducer;
