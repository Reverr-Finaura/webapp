import React, { useState } from "react";
import styles from "./Fifth.module.css";
import ReverrDarkIcon from "../../../images/new-dark-mode-logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHereFor } from "../../../features/onboardingSlice";
import { db } from "../../../firebase";
import { setDoc, doc } from "firebase/firestore";

function Fifth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const onboardingData = useSelector((state) => state.onboarding);
  // const {userSpace, role, profileImg, designation, about, livingState, livingCountry, education, experience, linkedinLink, twitterLink } = onboardingData;
  const [Here_for, setHere_for] = useState([]);

  const handleHereForClick = (spaceText) => {
    if (Here_for.includes(spaceText)) {
      // If the objective text is already selected, remove it from the array
      setHere_for(Here_for.filter((text) => text !== spaceText));
    } else {
      // If the space text is not selected, add it to the array
      setHere_for([...Here_for, spaceText]);
    }
  };

  const finalOnboardingData = {
    ...onboardingData,
    here_for: Here_for
  }

  const handleFunctions = () => {
    dispatch(setHereFor(Here_for));
    uploadOnboardingData(docRef,finalOnboardingData);
    navigate("/");
  };


   // uploading onboardingData 

   const docRef = doc(db, "Users", user?.user?.email);

   const uploadOnboardingData = async (docRef,finalOnboardingData) => {
     try{
       await setDoc(docRef,finalOnboardingData);
     }catch(err){
       console.error(err);
     }
   }
 

  const objectives = [
    {
      imageSrc: require("../../../images/onboarding41.png"),
      text: "Raise Investments",
    },
    {
      imageSrc: require("../../../images/onboarding42.png"),
      text: "Find your CoFounder",
    },
    {
      imageSrc: require("../../../images/onboarding43.png"),
      text: "Grow my Team",
    },
    {
      imageSrc: require("../../../images/onboarding44.png"),
      text: "Find a Mentor",
    },
    {
      imageSrc: require("../../../images/onboarding45.png"),
      text: "Networking",
    },
    {
      imageSrc: require("../../../images/onboarding46.png"),
      text: "Collaborations & Partnerships",
    },
    {
      imageSrc: require("../../../images/onboarding47.png"),
      text: "Brainstorm Ideas",
    },
    {
      imageSrc: require("../../../images/onboarding48.png"),
      text: "Gain Insights",
    },
    {
      imageSrc: require("../../../images/onboarding49.png"),
      text: "Increase my knowledge",
    },
  ];

 
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
        <span className={styles.reverrHeadingSpan}>
          <p className={styles.reverrHeading}>Reverr</p>
        </span>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.leftComponent}>
          <text style={{ fontSize: 40, color: "#ffffff", marginBlock: 20 }}>
            What are you here for?
          </text>
          <text style={{ fontSize: 14, color: "#ffffff" }}>
            Select up to 3 objectives.
          </text>

          <div className={styles.objectiveContainer}>
            {objectives.map((objective, index) => (
              <div
                key={index}
                className={`${styles.objectiveCard} ${
                  Here_for.includes(objective.text) ? styles.selected : ""
                }`}
                onClick={() => handleHereForClick(objective.text)}
              >
                <img src={objective.imageSrc} alt="img" />
                <text>{objective.text}</text>
              </div>
            ))}
          </div>
          <div style={{ width: "100%" }}>
            <button
              className={styles.leftButton}
              onClick={() => navigate("/onboarding-fourth")}
            >
              Back
            </button>
            <button className={styles.rightButton} onClick={handleFunctions} >Next</button>
            <button className={styles.skipButton} onClick={() => navigate("/")} >Skip</button>
          </div>
        </div>
        <img src={require("../../../images/onboardingfifth.png")} alt="img" />
      </div>
    </div>
  );
}

export default Fifth;
