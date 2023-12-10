import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeNotLoggedIn.module.css";
import Vibe from "../../components/SidebarComponents/Vibe/Vibe";
import ExploreTools from "../../components/SidebarComponents/ExploreTools/ExploreTools";
import Journey from "../../components/SidebarComponents/Journey/Journey";
import GetPremium from "../../components/SidebarComponents/GetPremium/GetPremium";
import TrendingNews from "../../components/SidebarComponents/TrendingNews/TrendingNews";
import InvestorFinder from "../../components/SidebarComponents/InvestorFinder/InvestorFinder";
import CommunityFinalDark from "../../components/Community Dark Mood/Community Final Dark/CommunityFinalDark";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import Patch from "../../components/SidebarComponents/Patch/Patch";

function HomeNotLoggedIn() {
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = React.useCallback(() => {
    setIsLogInModalOpen(true);
  }, []);
  return (
    <>
      {isLogInModalOpen ? (
        <div className={styles.logInModalCont}>
          <div className={styles.logInModal}>
            <span
              className={styles.closeIcon}
              onClick={() => setIsLogInModalOpen(false)}
            >
              X
            </span>
            <img src={require("../../images/userIcon.png")} alt='img' />
            <text style={{ color: "#ffffff", fontSize: 20, marginTop: 10 }}>
              Sign in to Continue
            </text>

            <button
              className={styles.signInButton}
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
            <div className={styles.dividerRow}>
              <div className={styles.dividerLine}></div>
              <span style={{ marginInline: 5, color: "#999b9e" }}>or</span>
              <div className={styles.dividerLine}></div>
            </div>
            <button
              className={styles.signUpButton}
              onClick={() => navigate("/signup")}
            >
              <span>Sign up</span>
            </button>
          </div>
        </div>
      ) : null}

      <NavBarFinalDarkMode isLoggedIn={false} openModal={openModal} />
      <div className={styles.container}>
        <div className={styles.leftSidebar} style={{ marginTop: "10em" }}>
          {/* <ProfileSummary />
          <div style={{ marginTop: 50 }}></div> */}
          {/* <ConnectSuggestion isLoggedIn={false} openModal={openModal} /> */}
          <div style={{ marginTop: 50 }}></div>
          <Vibe isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <Patch isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <ExploreTools isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <Journey isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <GetPremium />
          <div style={{ marginTop: 50 }}></div>
        </div>

        <div className={styles.middleSection}>
          <CommunityFinalDark isLoggedIn={false} openModal={openModal} />
          {/* <DiscoverEvents />
        <div style={{ marginTop: 50 }}></div>
        <DiscoverPerfectTools />
        <div style={{ marginTop: 50 }}></div>
        <FeaturedSuggestions />
        <div style={{ marginTop: 50 }}></div>
        <FeaturedMentors /> */}
        </div>

        <div className={styles.rightSidebar} style={{ marginTop: "10em" }}>
          {/* <Appoinments />
          <div style={{ marginTop: 50 }}></div> */}
          <TrendingNews isLoggedIn={false} openModal={openModal} />
          <div style={{ marginTop: 50 }}></div>
          <InvestorFinder isLoggedIn={false} openModal={openModal} />
          {/* <div style={{ marginTop: 50 }}></div>
          <Events isLoggedIn={false} openModal={openModal} /> */}
          <div style={{ marginTop: 50 }}></div>
          {/* <Mentors isLoggedIn={false} openModal={openModal} /> */}
        </div>
      </div>
    </>
  );
}

export default HomeNotLoggedIn;
