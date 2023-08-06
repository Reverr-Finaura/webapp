import { createSlice } from "@reduxjs/toolkit";
import defaultProfile from "../images/default-profile-pic.png"

const initialState={
    image: defaultProfile,
    about:"",
    education:[{degree:"", institute:""}],
    experience:[{designation:"",company:""}],
    country: "",
    state: "",
    whatULookingFor:"",
    industry:"",
    linkedin:"",
    twitter:"",
    instagram:"",
    designation:"",
    userType:"Individual",
    phone:"",
    password:"",
    countryCode:"",
    userSpace: [],
    about: "",
    here_for: [],
    name: "",
    email:"",
    network: [],
    sendRequests: [],
    receivedRequests: [],
    vibeuser:"",
    swipeLimit: {swipeRemaining: 10, swipeUpdateTime: new Date().getTime() - 24 * 60 * 60 * 1000}
}




const onboardingSlice=createSlice({
    name:"onboarding",
    initialState,
reducers:{
   setPhone:(state,action)=>{
      state.phone= action.payload
         }, 
         setcountryCode:(state,action)=>{
      state.countryCode= action.payload
         },
         setPassword:(state,action)=>{
            state.password= action.payload
               },
    setAboutToStore:(state,action)=>{
state.about=action.payload;

    },
    setName:(state,action)=>{
      state.name=action.payload
      },
   setEmail:(state,action)=>{
      state.email=action.payload
      },
    setEducation:(state,action)=>{
        state.education=[action.payload]
        },
    setCurrentPosition:(state,action)=>{
        state.experience[0].designation=action.payload
     },
     setCurrentCompany:(state,action)=>{
      state.experience[0].previousOrCurrentOrganisation=action.payload
     },
     setDesignationToStore:(state,action)=>{
      state.designation=action.payload
     },
     setWhatULookingFor:(state,action)=>{
        state.whatULookingFor=action.payload
     },
     setIndustry:(state,action)=>{
        state.industry=action.payload
     },
     setLinkedin:(state,action)=>{
        state.linkedin=action.payload
     },
     setTwitter:(state,action)=>{
        state.twitter=action.payload
     },
     setInstagram:(state,action)=>{
        state.instagram=action.payload
     },
     setUserSpaces: (state, action) => {
      state.userSpace = action.payload;

     },
     setRole: (state, action) => {
      state.userType = action.payload;
     },
     setImage: (state, action) => {
      state.image = action.payload;
     },
     setState: (state, action) => {
      state.state = action.payload;
     },
     setCountry: (state, action) => {
      state.country = action.payload;
     },
     setDegree: (state, action) => {
      state.education[0].degree = action.payload;
     },
     setInstitute: (state, action) => {
      state.education[0].institute = action.payload;
     },
     setExpDesignation: (state, action) => {
      state.experience[0].designation = action.payload;
     },
     setExpCompany: (state, action) => {
      state.experience[0].company = action.payload;
     },
     setHereFor: (state, action) => {
      state.here_for = action.payload;
     },
     setvibeuser:(state,action)=>{
      state.vibeuser=action.payload

     }
    

}
})

export const {
   setPhone,
   setcountryCode,
   setPassword, 
   setImage,  
   setAboutToStore,  
   setEducation,  
   setCurrentPosition,
   setDesignationToStore,  
   setCurrentCompany,  
   setWhatULookingFor,  
   setIndustry,  
   setLinkedin,  
   setTwitter,  
   setInstagram, 
   setUserSpaces, 
   setRole, 
   setState,
   setCountry,
   setDegree,
   setInstitute,
   setExpDesignation,
   setExpCompany,
   setHereFor,
   setName,
   setEmail,setvibeuser
} = onboardingSlice.actions;
export default onboardingSlice.reducer;

