import React from "react";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import VibeRightSideBar from "./RightPart/VibeRightSideBar";
import style from "./vibe.module.css";
import Matches from "./ManageMatches/Matches";
import VibeMiddlePart from "../vibe/VibeMiddlePart/VibeMiddlePart";

const VibeTestA = () => {
  return (
    <>
      <NavBarFinalDarkMode />
      <div className={style.vibeContainer}>
        <VibeRightSideBar />
        {/* <VibeMiddlePart /> */}
        <VibeMiddlePart />
        <Matches />
      </div>
    </>
  );
};

export default VibeTestA;
