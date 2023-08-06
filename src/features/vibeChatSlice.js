import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
  selectedUserData: [],
  chatdisplay: false,
};

export const vibeChatSlice = createSlice({
  name: "vibeChat",
  initialState,
  reducers: {
    updateSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateSelectedUserData: (state, action) => {
      state.selectedUserData = action.payload;
    },
    Chatshow: (state) => {
      state.chatdisplay = !state.chatdisplay;
    },
  },
});

export const { updateSelectedUser, updateSelectedUserData, Chatshow } =
  vibeChatSlice.actions;

export default vibeChatSlice.reducer;
