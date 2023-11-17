import React, { useEffect, useState } from "react";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
// import VibeRightSideBar from "./RightPart/VibeRightSideBar";
import style from "./vibe.module.css";
import Matches from "./ManageMatches/Matches";
// import VibeMiddlePart from './VibeMiddlePart/VibeMiddlePart'
import VibeMiddlePart from "./VibeMiddlePart/VibeMiddlePart";
import { useSelector } from "react-redux";
// import LikesExhaust from "./VibeMiddlePart/LikesExhaustScreen/LikesExhaust";
// import NoData from "./VibeMiddlePart/No Data Screen/NoData";
import VibeMessageMain from "./VibeMessage/VibeMessageMain";
import VibeMobileDropDown from "./VibeMobileDropDown";
import MatchedUserScreen from "./VibeMiddlePart/matchedUserScreen/MatchedUserScreen";
import { current } from "@reduxjs/toolkit";
import { setPremium } from "../../features/userSlice";
import { useDispatch } from "react-redux";

const list = [
  "Vibe Home",
  "Your matches",
  "Manage matches",
  "See who liked you",
];
const VibeTestA = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [activeComp, setActiveComp] = useState("Vibe Home");
  const onboardingData = useSelector((state) => state.onboarding);
  console.log(onboardingData);
  const [isPremium, setIsPremium] = useState(false);
  const userDoc = useSelector((state) => state.userDoc);
  const ispremium = useSelector((state) => state.user.isPremium);
  const dispatch = useDispatch();

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    function checkPremiumStatus() {
      const oneMonthInseconds = 30 * 24 * 60 * 60;
      const threeMonthsInseconds = 3 * oneMonthInseconds;
      const sixMonthsInseconds = 6 * oneMonthInseconds;

      // let isPremium = false;
      const premiumData = userDoc?.premiumData;
      const currentDate = new Date().getTime() / 1000;
      if (!premiumData) return;

      const premiumStartDate = premiumData.premiumStartDate;
      console.log("this is the premiumdata ---------", premiumData);

      switch (premiumData.subscriptionPlan) {
        case "onemonth":
          if (currentDate <= premiumStartDate + oneMonthInseconds) {
            console.log("premium members");
            setIsPremium(true);
            dispatch(setPremium(true));
          }

          break;
        case "threemonths":
          if (currentDate <= premiumStartDate + threeMonthsInseconds) {
            setIsPremium(true);
            dispatch(setPremium(true));
          }
          break;
        case "sixmonths":
          if (currentDate <= premiumStartDate + sixMonthsInseconds) {
            console.log("premium members");
            setIsPremium(true);
            dispatch(setPremium(true));
          }
          break;
        default:
          setIsPremium(false);
          dispatch(setPremium(false));
          break;
      }
    }
    checkPremiumStatus();
  }, []);
  console.log("premium status", isPremium);
  console.log(userDoc);
  return (
    <>
      <NavBarFinalDarkMode />
      {width <= 500 ? (
        <div className={style.mobileVibeContainer}>
          <div className={style.mobileVibeHeadercon}>
            <VibeMobileDropDown
              list={list}
              activeComp={activeComp}
              setActiveComp={setActiveComp}
            />
          </div>
          {activeComp === "Manage matches" ? (
            <Matches mobile={true} manage={true} />
          ) : activeComp === "See who liked you" ? (
            <Matches mobile={true} manage={false} />
          ) : activeComp === "Vibe Home" ? (
            <VibeMiddlePart />
          ) : activeComp === "Your matches" ? (
            <VibeMessageMain mobile={true} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className={style.vibeContainer}>
          {/* {screenWidth <= 640 ? (
          <>
          <div className={style.topSection}>
          <select className={style.dropDown} onChange={handleSelect}>
            <option value="vibleMiddlePart">Vibe Home</option>
            <option value="matches">Your Matches</option>
            <option value="manageMacthes">Manage Matches</option>
          </select>
          <p className={style.viewMyProfile}>View My Profile</p>
          </div>
          <div className={style.mainSection}>
            {selectedSection === "matches" && <VibeMessageMain />}
            {selectedSection === "vibleMiddlePart" && <VibeMiddlePart />}
            {selectedSection === "manageMacthes" && <Matches />}
          </div>
          </>
        ) : (<> */}
          <VibeMessageMain />
          <VibeMiddlePart />
          <Matches isPremium={isPremium} />
          {/* </>)} */}
        </div>
      )}
    </>
  );
};

export default VibeTestA;
