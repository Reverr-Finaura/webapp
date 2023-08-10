import React from "react";
import { useState, useEffect } from "react";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
// import VibeRightSideBar from "./RightPart/VibeRightSideBar";
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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [selectedSection, setSelectedSection] = useState("vibleMiddlePart")

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSelect = (e) => {
    const currentSection = e.target.value;
    setSelectedSection(currentSection)
  }

  return (
    <>
      <NavBarFinalDarkMode />
      <div className={style.vibeContainer}>
        {screenWidth <= 640 ? (
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
        ) : (<>
          <VibeMessageMain />
          <VibeMiddlePart />
          <Matches />
        </>)}
      </div>
    </>
  );
};

export default VibeTestA;
