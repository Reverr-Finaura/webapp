import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
  selectedUserData: [],
  chatdisplay:false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateSelectedUserData: (state, action) => {
      state.selectedUserData = action.payload;
    }, 
    Chatshow:(state)=>{
      state.chatdisplay=!state.chatdisplay;
    }
  },
});

export const { updateSelectedUser, updateSelectedUserData,Chatshow } = chatSlice.actions;

export default chatSlice.reducer;
