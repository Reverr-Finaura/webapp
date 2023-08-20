import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./JobPosts.module.css";
import CommunityFinalDark from "../../components/Community Dark Mood/Community Final Dark/CommunityFinalDark";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import ArticleComponent from "../../components/SidebarComponents/ArticleComponent/Article";
import NoAppoinments from "../../components/SidebarComponents/NoAppoinments/NoAppoinments";
import filter from "../../images/jobFilter.svg";
import searchIcon from "../../images/Searchicon.svg";
import GetPremium from "../../components/SidebarComponents/GetPremium/GetPremium";
import peopleGroup from "../../images/profile2user.svg";
import bookmark from "../../images/lucide_bookmark.svg";

function JobPosts() {
  const suggestedSearchOptions = [
    "Digital Marketing",
    "Marketing",
    "Product Marketing",
    "Asst. Manager",
    "Asst. Manager",
    "Product Manager",
    "Edtech Marketing",
  ];

  const items = [
    {
      date: "23rd June, 2023",
      eventName: "Event Name",
      location: "Lucknow, India",
      attending: 123,
    },
    {
      date: "23rd June, 2023",
      eventName: "Event Name",
      location: "Lucknow, India",
      attending: 123,
    },
    {
      date: "23rd June, 2023",
      eventName: "Event Name",
      location: "Lucknow, India",
      attending: 123,
    },
  ];

  const [selectedSuggestedSearchOptions, setSelectedSuggestedSearchOptions] =
    useState([]);

  const handleSuggestedSearchOptionClick = (index) => {
    if (!selectedSuggestedSearchOptions.includes(index)) {
      // If it's not selected, add it to the selectedSuggestedSearchOptions array
      setSelectedSuggestedSearchOptions([
        ...selectedSuggestedSearchOptions,
        index,
      ]);
    }
  };

  const handleSuggestedSearchDeselectClick = (index) => {
    setSelectedSuggestedSearchOptions(
      selectedSuggestedSearchOptions.filter((item) => item !== index)
    );
  };
  console.log(selectedSuggestedSearchOptions);
  return (
    <>
      <NavBarFinalDarkMode />
      <div className={styles.container}>
        {/* -----------left part starts------------------ */}
        <div className={styles.leftSidebar}>
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

        {/* -----------middle part starts------------------ */}
        <div className={styles.middleSection}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search for jobs by title, skill or company name..."
            />
            <img src={searchIcon} alt="img" />
          </div>
          <div className={styles.suggestedSearch}>
            <text>Suggested Job Seaches</text>
            <div className={styles.options}>
              {suggestedSearchOptions.map((item, index) => (
                <div
                  className={`${styles.option} ${
                    selectedSuggestedSearchOptions.includes(index)
                      ? styles.selectedOption
                      : ""
                  }`}
                  key={index}
                  onClick={() => handleSuggestedSearchOptionClick(index)}
                >
                  {item}
                  {selectedSuggestedSearchOptions.includes(index) ? (
                    <span
                      className={styles.deselectOptionButton}
                      onClick={() => handleSuggestedSearchDeselectClick(index)}
                    >
                      X
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.recomendedJobs}>
            <text>Recommended For You</text>
            {items.map((item, index) => (
              <div className={styles.recomendedJobRow} key={index}>
                <img src={require("../../images/recomenjob.png")} alt="img" />
                <div>
                  <div className={styles.recomendedJobRowTopDiv}>
                    <div>
                      <text>Company Name</text>
                      <text>Company Address</text>
                    </div>
                    <div>
                      <text>2 hours ago</text>
                      <img src={bookmark} alt="img" />
                    </div>
                  </div>
                  <div className={styles.recomendedJobRowButtomDiv}>
                    <div>
                      {/* <text
                        style={{ color: "#A7A7A7", fontSize: 8, marginTop: 5 }}
                      >
                        <img
                          src={peopleGroup}
                          alt="img"
                          style={{ width: 8, height: 8, display: "inline" }}
                        />
                        &nbsp; {item.attending} people attending
                      </text> */}
                    </div>
                  </div>
                </div>
                {/* <button
                onClick={() => {
                  if (!isLoggedIn) {
                    return openModal();
                  } else {
                    //normal code
                    console.log("user logged!");
                  }
                }}
                >
                  Register
                </button> */}
              </div>
            ))}
          </div>
        </div>
        {/* -----------middle part ends------------------ */}

        {/* -----------right part starts------------------ */}
        <div className={styles.rightSidebar} style={{ marginTop: "10em" }}>
          {/* <NoAppoinments />

          <ArticleComponent /> */}
        </div>
        {/* -----------right part ends------------------ */}
      </div>
    </>
  );
}

export default JobPosts;
