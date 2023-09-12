import React, { useState, useEffect } from "react";
import styles from "./Second.module.css";
import ReverrDarkIcon from "../../../images/new-dark-mode-logo.png";
import { useNavigate } from "react-router-dom";
import { setRole } from "../../../features/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

function Second() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("");
  const user = useSelector((state) => state.user);
  const onboardingData = useSelector((state) => state.onboarding);
  // console.log("userType", userType)
  // console.log("onboardingData", onboardingData)

  useEffect(() => {
    if(onboardingData?.userType){
      setUserType(onboardingData.userType)
    }
  }, [onboardingData]);

  const handleDivClick = (spaceText) => {
    setUserType(spaceText);
  };

  // Function to handle the "Next" button click
  const handleNextButtonClick = async () => {
    dispatch(setRole(userType));

    // Upload onboarding data to Firebase
    const onboardingDataSoFar = {
      userType: userType,
    };

    try {
      // Attempt to upload the data
      await uploadOnboardingData(onboardingDataSoFar);
      // If data upload is successful, navigate to the next page
      navigate("/onboarding-third");
    } catch (err) {
      console.error(err);
      // Handle the error (optional) or show an error message to the user
      // Don't navigate since data upload was not successful
    }
  };

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

  const roleItems = [
    {
      text: "I’m a Founder",
      type: "founder",
      image: require("../../../images/onboardingfounder.webp"),
    },
    {
      text: "I’m a Mentor",
      type: "mentor",
      image: require("../../../images/onboardingmentor.webp"),
    },
    {
      text: "I’m an Investor",
      type: "investor",
      image: require("../../../images/onboardinginvester.webp"),
    },
    {
      text: "I’m a Professional",
      type: "professionals",
      image: require("../../../images/onboardingprofessional.webp"),
    },
    // {
    //   text: "I’m a Service Provider",
    //   type: "serviceproviders",
    //   image: require("../../../images/onboardingprovider.webp"),
    // },
  ];
  // console.log("userType1", userType)

  return (
    <div className={styles.container}>
      <div
        onClick={() => navigate("/")}
        className={styles.navbarBrandLogoImgCont}
      >
        <img
          className={styles.navbarFinalBrandLogoImg}
          src={ReverrDarkIcon}
          alt="brand-logo"
        />
       
      </div>
      <div className={styles.mainContent}>
        <div className={styles.leftComponent}>
          <text className={styles.heading}>Your Role?</text>
          <text className={styles.subHeading}>
            Choose an option that fits you the best.
          </text>

          <div className={styles.roleContainer}>
            {roleItems.map((roleItem, index) => (
              <div
                key={index}
                className={`${styles.roleCard} ${
                  userType === roleItem.type ? styles.selected : ""
                }`}
                onClick={() => handleDivClick(roleItem.type)}
              >
                <text>{roleItem.text}</text>
                <img src={roleItem.image} alt="img" />
              </div>
            ))}
          </div>

          <div className={styles.btnwrapper}>
            <button
              className={styles.leftButton}
              onClick={() => navigate("/onboarding-first")}
            >
              Back
            </button>
            {userType !== "" ? (
              <button
                className={styles.rightButton}
                onClick={handleNextButtonClick}
              >
                Next
              </button>
            ) : (
              <button className={styles.rightButton} style={{ opacity: 0.5 }}>
                Next
              </button>
            )}
          </div>
        </div>
        <div className={styles.hiddenOnMobile}>
          <img
            className={styles.mainImage}
            src={require("../../../images/onboardingsecond.webp")}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default Second;
