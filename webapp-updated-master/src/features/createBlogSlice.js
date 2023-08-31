import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: null,
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },

    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((data) => data.id !== action.payload);
    },
  },
});

export const { setBlogs, deleteBlog } = blogsSlice.actions;

export default blogsSlice.reducer;
