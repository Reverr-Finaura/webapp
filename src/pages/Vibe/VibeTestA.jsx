import React from "react";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import style from "./vibe.module.css";
import Matches from "./ManageMatches/Matches";
// import VibeMiddlePart from './VibeMiddlePart/VibeMiddlePart'
import VibeMiddlePart from "./VibeMiddlePart/VibeMiddlePart";
import { useSelector } from "react-redux";
import LikesExhaust from "./VibeMiddlePart/LikesExhaustScreen/LikesExhaust";
import NoData from "./VibeMiddlePart/No Data Screen/NoData";
import VibeMessageMain from "./VibeMessage/VibeMessageMain";
const VibeTestA = () => {
  const onboardingData = useSelector((state) => state.onboarding);
  console.log(onboardingData);
  return (
    <>
      <NavBarFinalDarkMode />
      <div className={style.vibeContainer}>
        <VibeMessageMain />
        {/* <LikesExhaust/> */}
        <VibeMiddlePart />
        <Matches />
      </div>
    </>
  );
};

export default VibeTestA;
