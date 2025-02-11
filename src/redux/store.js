import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./slice/postSlice";
import { userSlice } from "./slice/userSlice";
export const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    users: userSlice.reducer,
  },
});
