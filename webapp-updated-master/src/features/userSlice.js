import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userSpace:[],
  userData: {},
  isPremium:false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
    setUserData: (state, action) => {
      console.log(action.payload)
      state.userData = action.payload;
    },
    setUserSpace: (state,action)=>{
         state.userSpace= action.payload;
    },
    setPremium: (state,action)=>{
        state.isPremium =action.payload
    }
  },
});

export const { login, logout, setUserData,setUserSpace,setPremium } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
