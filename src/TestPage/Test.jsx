import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Test.module.css";
import ConnectSuggestion from "../components/SidebarComponents/ConnectSuggestion/ConnectSuggestion";
import ProfileSummary from "../components/SidebarComponents/ProfileSummary/ProfileSummary";
import Vibe from "../components/SidebarComponents/Vibe/Vibe";
import ExploreTools from "../components/SidebarComponents/ExploreTools/ExploreTools";
import Journey from "../components/SidebarComponents/Journey/Journey";
import GetPremium from "../components/SidebarComponents/GetPremium/GetPremium";
import Appoinments from "../components/SidebarComponents/Appoinments/Appoinments";
import TrendingNews from "../components/SidebarComponents/TrendingNews/TrendingNews";
import Events from "../components/SidebarComponents/Events/Events";
import Mentors from "../components/SidebarComponents/Mentors/Mentors";
import InvestorFinder from "../components/SidebarComponents/InvestorFinder/InvestorFinder";
import DiscoverEvents from "../components/DynamicComponents/DiscoverEvents/DiscoverEvents";
import DiscoverPerfectTools from "../components/DynamicComponents/DiscoverPerfectTools/DiscoverPerfectTools";
import FeaturedSuggestions from "../components/DynamicComponents/FeaturedSuggestions/FeaturedSuggestions";
import FeaturedMentors from "../components/DynamicComponents/FeaturedMentors/FeaturedMentors";
import CommunityFinalDark from "../components/Community Dark Mood/Community Final Dark/CommunityFinalDark";
import NavBarFinalDarkMode from "../components/Navbar Dark Mode/NavBarFinalDarkMode";
import Patch from "../components/SidebarComponents/Patch/Patch";
import ArticleComponent from "../components/SidebarComponents/ArticleComponent/Article"

function Test() {
  const [userTypeLower, setUserTypeLower] = useState("individual");
  const userDoc = useSelector((state) => state.userDoc);
  const appoinments = useSelector(
    (state) => state.userDoc.Appointement_request
  );
  useEffect(() => {
    if (userDoc.userType !== undefined && userDoc.userType !== "") {
      setUserTypeLower(userDoc.userType.toLowerCase());
    }
  }, [userDoc]);

  const products = {
    mentor: [
      "ACCESS TO STARTUPS",
      "DISCOVERABILITY",
      "SUPPORT SERVICES",
      "COMMUNITY",
      "PATCH",
      "VIBE",
      "RAAYA",
      "NEWS & ARTICLES",
      "DISCOVER",
      "EVENTS",
      "CIRCLES",
      "MESSAGES & NOTIFICATIONS",
    ],
    investor: [
      "PATCH",
      "VIBE",
      "DASHBOARD",
      "COMMUNITY",
      "CIRCLES",
      "RAAYA",
      "DISCOVER",
      "PROFILE",
      "NEWS & ARTICLES",
      "EVENTS",
      "SEARCH ENGINE",
      "MESSAGES & NOTIFICATIONS",
    ],
    founder: [
      "MENTOR",
      "COMMUNITY",
      "PATCH",
      "VIBE",
      "KNOWLEDGE",
      "FUNDING-APPLY",
      "EVENTS",
      "TOOLS",
      "JOBS",
      "CIRCLES",
      "RAAYA",
      "NEWS & ARTICLES",
      "SEARCH ENGINE",
      "INVESTOR FINDER",
      "DISCOVER",
      "MESSAGES & NOTIFICATIONS",
    ],
    individual: [
      "MENTOR",
      "COMMUNITY",
      "PATCH",
      "VIBE",
      "KNOWLEDGE",
      "FUNDING-APPLY",
      "EVENTS",
      "TOOLS",
      "JOBS",
      "CIRCLES",
      "RAAYA",
      "NEWS & ARTICLES",
      "SEARCH ENGINE",
      "INVESTOR FINDER",
      "DISCOVER",
      "MESSAGES & NOTIFICATIONS",
    ],
    professionals: [
      "COMMUNITY",
      "PATCH",
      "VIBE",
      "KNOWLEDGE",
      "EVENTS",
      "JOBS",
      "CIRCLES",
      "DISCOVER",
      "NEWS & ARTICLES",
      "SEARCH ENGINE",
      "MESSAGES & NOTIFICATIONS",
    ],
    serviceProviders: [
      "ACCESS TO STARTUPS",
      "RAAYA",
      "MESSAGES & NOTIFICATIONS",
      "DASHBOARD",
      "PREMIUM",
    ],
    iB: [
      "SUPPORT SERVICES-CLOSING",
      "DISCOVERABILITY OVER THE PLATFORM- PLATFORM FEES",
      "DASHBOARD",
    ],
  };

  return (
    <>
      <NavBarFinalDarkMode />
      <div className={styles.container}>
        <div className={styles.leftSidebar} style={{ marginTop: "10em" }}>
          <div style={{ marginTop: 50 }}></div>
          <ProfileSummary />
          <div style={{ marginTop: 50 }}></div>
          <ConnectSuggestion />
          {products[userTypeLower]?products[userTypeLower]?.includes("VIBE") ? (
            <>
              <div style={{ marginTop: 50 }}></div>
              <Vibe />
            </>
          ) : null :products["individual"].includes("VIBE") ? (
            <>
              <div style={{ marginTop: 50 }}></div>
              <Vibe />
            </>
          ) : null}
          {products[userTypeLower]?products[userTypeLower]?.includes("PATCH") ? (
            <>
              <div style={{ marginTop: 50 }}></div>
              <Patch />
            </>
          ) : null : products["individual"].includes("PATCH") ? (
            <>
              <div style={{ marginTop: 50 }}></div>
              <Patch />
            </>
          ) : null}
          {products[userTypeLower]?products[userTypeLower]?.includes("TOOLS") ? (
            <>
              <div style={{ marginTop: 50 }}></div>
              <ExploreTools />
            </>
          ) : null:products["individual"].includes("TOOLS") ? (
            <>
              <div style={{ marginTop: 50 }}></div>
              <ExploreTools />
            </>
          ) : null}

          {products[userTypeLower]?products[userTypeLower]?.includes("KNOWLEDGE") ? (
            <>
              <div style={{ marginTop: 50 }}></div>
              <Journey />
            </>
          ) : null:products["individual"].includes("KNOWLEDGE") ? (
            <>
              <div style={{ marginTop: 50 }}></div>
              <Journey />
            </>
          ) : null}
          <div style={{ marginTop: 50 }}></div>
          {/* <Journey /> */}
          <div style={{ marginTop: 50 }}></div>
          {/* <GetPremium /> */}
          <div style={{ marginTop: 50 }}></div>
        </div>

        <div className={styles.middleSection}>
          <CommunityFinalDark />
          {/* <DiscoverEvents />
        <div style={{ marginTop: 50 }}></div>
        <DiscoverPerfectTools />
        <div style={{ marginTop: 50 }}></div>
        <FeaturedSuggestions />
        <div style={{ marginTop: 50 }}></div>
        <FeaturedMentors /> */}
        </div>

        <div className={styles.rightSidebar} style={{ marginTop: "10em" }}>
          
          {appoinments?.length ? (
            <>
              <Appoinments />
              <div style={{ marginTop: 50 }}></div>
            </>
          ) : null}
          {products[userTypeLower]?products[userTypeLower]?.includes("NEWS & ARTICLES") ? (
            <>
              <TrendingNews />
              <div style={{ marginTop: 50 }}></div>
            </>
          ) : null:products["individual"].includes("NEWS & ARTICLES") ? (
            <>
              <TrendingNews />
              <div style={{ marginTop: 50 }}></div>
            </>
          ) : null}
          {products[userTypeLower]?products[userTypeLower]?.includes("INVESTOR FINDER") ? (
            <>
              <InvestorFinder />
              <div style={{ marginTop: 50 }}></div>
            </>
          ) : null:products["individual"].includes("INVESTOR FINDER") ? (
            <>
              <InvestorFinder />
              <div style={{ marginTop: 50 }}></div>
            </>
          ) : null}
          {products[userTypeLower]?products[userTypeLower]?.includes("EVENTS") ? (
            <>
              {/* <Events /> */}
          <div style={{ marginTop: 50 }}></div>
            </>
          ) : null:products["individual"].includes("EVENTS") ? (
            <>
              {/* <Events /> */}
          <div style={{ marginTop: 50 }}></div>
            </>
          ) : null}
          <Mentors />
          <ArticleComponent />
        </div>
      </div>
    </>
  );
}

export default Test;
