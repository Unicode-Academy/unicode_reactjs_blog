import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnv } from "../../utils/env";
export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {
      data: {},
      status: "idle",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.user.status = "pending";
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user.status = "idle";
      state.user.data = action.payload;
    });

    builder.addCase(getUser.rejected, (state) => {
      state.user.status = "error";
    });
  },
});

export const getUser = createAsyncThunk(
  "users/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${getEnv("VITE_SERVER_API")}/users/${id}`
      );

      if (response.status !== 200) {
        throw new Error();
      }

      const user = await response.data;
      return user;
    } catch (error) {
      return rejectWithValue("Fetching data error");
    }
  }
);

export const selectUserById = (state) => state.users.user.data;
export const selectStatus = (state) => state.users.user.status;
