import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase";
import {  setVibeUser,setUserDoc } from '../../../features/userDocSlice';

import styles from './LeftContainer.module.css'
import NavBarFinalDarkMode from "../../../components/Navbar Dark Mode/NavBarFinalDarkMode";
/*import polygon1 from '../../../images/polygon1.png';
import polygon2 from '../../../images/polygon2.png';
import polygon3 from '../../../images/polygon3.png';
import polygon4 from '../../../images/polygon4.png';
import polygon5 from '../../../images/polygon5.png';
import polygon6 from '../../../images/polygon6.png';
import polygon7 from '../../../images/polygon7.png';
import polygon8 from '../../../images/polygon8.png';
import lowerStar from '../../../images/lowerStarVibe.svg';
import upperStar from '../../../images/upperStarVibe.svg';
*/

import arrow from '../../../images/arrowMark.svg';
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";




const LeftContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open,setOpen]=useState(false);
  
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);

  // console.log("onboardingData", onboardingData)

  
  console.log("userDoc-",userDoc);

  useEffect(()=>{
  if(userDoc?.vibeuser){
    setOpen(userDoc?.vibeuser)
  }
  },[userDoc])


  const handleButtonClick1 =async () => {
    const val=true
   
    dispatch(setUserDoc({...userDoc,vibeuser:val}))
    


  const mydata = {
      ...userDoc,
      vibeuser: val
    }
    try {
      // Attempt to upload the data
      await uploadOnboardingData(mydata);
      // If data upload is successful, navigate to the next page
      navigate('/vibetestinga')
    } catch (err) {
      console.error(err);
      // Handle the error (optional) or show an error message to the user
      // Don't navigate since data upload was not successful
    }

  }
  
  const uploadOnboardingData = async (data) => {
    const userEmail = user?.user?.email;
    if (!userEmail) {
      throw new Error("User email not available");
    }

    const docRef = doc(db, "Users", userEmail);

    try {
      // Perform a single update with all the fields to be updated
      await setDoc(docRef, data, { merge: true });
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be caught in the calling function
    }

  
  };

  console.log("userDoc Vibeuser:",userDoc?.Vibeuser);
  return (
    <>
      <NavBarFinalDarkMode />
      
        <section id={styles.outerCont}>
          <div className={styles.cont_left}>
            <div className={styles.headingCont}>
            <div className={styles.heading}>Vibe</div>
            <div className={styles.inner_heading}>Enabling networking with a <span className={styles.swipe}>‘swipe’.</span></div>
            </div>
            
            <div className={styles.bottomCont}>
             
              <div className={styles.inner1}>Vibe is a networking tool lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Vibe is a networking tool lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </div>

                <div className={styles.button} onClick={handleButtonClick1}>Start Vibing <img src={arrow} alt='img' /></div>
            </div>
            


          </div>

          <div className={styles.polygonOuter}>

          </div>


        </section>
    

    </>
  )

}
export default LeftContainer;