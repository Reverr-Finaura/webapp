import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const blogUserSlice = createSlice({
  name: "blogUser",
  initialState,
  reducers: {
    login: (state, action) => {
      state.blogUser = action.payload;
    },
    logout: (state, action) => {
      state.blogUser = null;
    },
  },
});

export const { login, logout } = blogUserSlice.actions;

export default blogUserSlice.reducer;
