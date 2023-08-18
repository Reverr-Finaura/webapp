import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./JobPosts.module.css";
import CommunityFinalDark from "../../components/Community Dark Mood/Community Final Dark/CommunityFinalDark";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import ArticleComponent from "../../components/SidebarComponents/ArticleComponent/Article";
import NoAppoinments from "../../components/SidebarComponents/NoAppoinments/NoAppoinments";
import filter from "../../images/jobFilter.svg";
import GetPremium from "../../components/SidebarComponents/GetPremium/GetPremium";

function JobPosts() {

  return (
    <>
      <NavBarFinalDarkMode />
      <div className={styles.container}>
        {/* -----------left part starts------------------ */}
        <div className={styles.leftSidebar} style={{ marginTop: "10em" }}>
          <div className={styles.filterContainer}>
            <div className={styles.filterHeader}>
              <text className={styles.filterHeaderText}>Filters</text>
              <img
                className={styles.filterHeaderImage}
                src={filter}
                alt="img"
              />
            </div>
            <div className={styles.filterTextInput}>
              <text>Select Job Profile</text>
              <select>
                <option value="option1">Digital Marketing</option>
                <option value="option2">Marketing</option>
              </select>
            </div>
            <div className={styles.filterTextInput}>
              <text>Location</text>
              <input type="text" placeholder="Delhi" />
            </div>
            <div className={styles.filterTextInput}>
              <text>Years of Experience</text>
              <select>
                <option value="option1">Less than 1 year</option>
                <option value="option2">1 year</option>
                <option value="option3">2 years</option>
                <option value="option4">3 years</option>
                <option value="option5">4 years</option>
                <option value="option6">5 years</option>
                <option value="option7">6 years</option>
              </select>
            </div>
            <div className={styles.filterTextInput}>
              <text>Domain</text>
              <select>
                <option value="option1">Marketing</option>
                <option value="option2">Sales</option>
              </select>
            </div>
            {/* <button
              className={styles.filterButton}
              // onClick={() => navigate("/editprofile")}
            >
              Done
            </button> */}
          </div>
          <div style={{ marginTop: 50 }}></div>
          <GetPremium />
        </div>
        {/* -----------left part ends------------------ */}

        <div className={styles.middleSection}>
          {/* <CommunityFinalDark /> */}
        </div>

        <div className={styles.rightSidebar} style={{ marginTop: "10em" }}>
          {/* <NoAppoinments />

          <ArticleComponent /> */}
        </div>
      </div>
    </>
  );
}

export default JobPosts;
