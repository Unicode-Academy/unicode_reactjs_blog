import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnv } from "../../utils/env";
export const postSlice = createSlice({
  name: "posts",
  initialState: {
    postList: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.status = "idle";
      state.postList = action.payload.articles;
    });

    builder.addCase(getPosts.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    const response = await axios.get(
      `${getEnv(
        "VITE_SERVER_API"
      )}/top-headlines?sources=techcrunch&apiKey=${getEnv("VITE_API_KEY")}`
    );
    if (response.status !== 200) {
      return rejectWithValue("Fetching data error");
    }
    const data = await response.data;
    return data;
  }
);
