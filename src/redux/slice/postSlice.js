import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnv } from "../../utils/env";
export const postSlice = createSlice({
  name: "posts",
  initialState: {
    postList: [],
    postCount: 0,
    post: {},
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.status = "idle";
      state.postList = action.payload.posts;
      state.postCount = action.payload.total;
    });

    builder.addCase(getPosts.rejected, (state) => {
      state.status = "error";
    });

    builder.addCase(getPost.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(getPost.fulfilled, (state, action) => {
      state.status = "idle";
      state.post = action.payload;
    });

    builder.addCase(getPost.rejected, (state) => {
      state.status = "error";
    });

    // get posts by user
    builder.addCase(getPostsByUser.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(getPostsByUser.fulfilled, (state, action) => {
      state.status = "idle";
      state.postList = action.payload.posts;
      state.postCount = action.payload.total;
    });

    builder.addCase(getPostsByUser.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async ({ query = "", skip = 0 }, { rejectWithValue }) => {
    const params = {
      q: query,
      limit: getEnv("VITE_LIMIT"),
      skip,
    };
    let pathname = "/posts";
    if (query) {
      pathname = "/posts/search";
    }
    let queryString = `?${new URLSearchParams(params).toString()}`;
    const response = await axios.get(
      `${getEnv("VITE_SERVER_API")}${pathname}${queryString}`
    );
    if (response.status !== 200) {
      return rejectWithValue("Fetching data error");
    }
    const data = await response.data;
    return data;
  }
);

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (id, { rejectWithValue }) => {
    const response = await axios.get(
      `${getEnv("VITE_SERVER_API")}/posts/${id}`
    );
    if (response.status !== 200) {
      return rejectWithValue("Fetching data error");
    }
    const post = await response.data;
    const responseUser = await axios.get(
      `${getEnv("VITE_SERVER_API")}/users/${post.userId}`
    );
    if (responseUser.status === 200) {
      const user = await responseUser.data;
      post.user = user;
    }

    return post;
  }
);

export const getPostsByUser = createAsyncThunk(
  "posts/getPostsByUser",
  async (id, { rejectWithValue }) => {
    const response = await axios.get(
      `${getEnv("VITE_SERVER_API")}/users/${id}/posts`
    );
    if (response.status !== 200) {
      return rejectWithValue("Fetching data error");
    }
    const data = await response.data;
    return data;
  }
);

export const selectAllPosts = (state) => state.posts.postList;
export const selectPostCount = (state) => state.posts.postCount;
export const selectOnePost = (state) => state.posts.post;
export const selectStatus = (state) => state.posts.status;
