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
import location from "../../images/location1.svg";
import briefcase from "../../images/briefcase.svg";
import timer from "../../images/timer1.svg";
import lock from "../../images/lock1.svg";
import bookmark from "../../images/lucide_bookmark.svg";
import firstline from "../../images/firstline.svg";
import resume from "../../images/documenttext.svg";
import settings from "../../images/setting.svg";

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

  const jobsArray = [
    {
      companyName: "Company A",
      companyAddress: "123 Main St, Delhi",
      postedTime: "2 hours ago",
      location: "Delhi, India",
      jobType: "Onsite",
    },
    {
      companyName: "Company B",
      companyAddress: "456 Elm St, Mumbai",
      postedTime: "1 day ago",
      location: "Delhi, India",
      jobType: "Remote",
    },
    {
      companyName: "Company C",
      companyAddress: "789 Oak St, Bangalore",
      postedTime: "3 days ago",
      location: "Delhi, India",
      jobType: "Onsite",
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
            {jobsArray.map((job, index) => (
              <div className={styles.jobRow} key={index}>
                <img src={require("../../images/recomenjob.png")} alt="img" />
                <div>
                  <div className={styles.jobRowTopDiv}>
                    <div>
                      <text>{job.companyName}</text>
                      <text>{job.companyAddress}</text>
                    </div>
                    <div>
                      <text>
                        <img src={timer} alt="img" />
                        &nbsp; {job.postedTime}
                      </text>
                      <img src={bookmark} alt="img" />
                    </div>
                  </div>
                  <div className={styles.jobRowButtomDiv}>
                    <div>
                      <div>
                        <text>
                          <img src={location} alt="img" />
                          &nbsp; {job.location}
                        </text>
                        <text>
                          <img src={briefcase} alt="img" />
                          &nbsp; {job.jobType}
                        </text>
                      </div>
                      <span>View Details</span>
                    </div>
                    <button>Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
            <span>View More</span>
          </div>

          <div className={styles.highChanceJobs}>
            <text>Apply for jobs with high chances of getting hired</text>
            <text>PREMIUM FEATURE</text>
            {jobsArray.map((job, index) => (
              <div className={styles.jobRow} key={index}>
                <img src={require("../../images/recomenjob.png")} alt="img" />
                <div>
                  <div className={styles.jobRowTopDiv}>
                    <div>
                      <text>{job.companyName}</text>
                      <text>{job.companyAddress}</text>
                    </div>
                    <div>
                      <text>
                        <img src={timer} alt="img" />
                        &nbsp; {job.postedTime}
                      </text>
                      <img src={bookmark} alt="img" />
                    </div>
                  </div>
                  <div className={styles.jobRowButtomDiv}>
                    <div>
                      <div>
                        <text>
                          <img src={location} alt="img" />
                          &nbsp; {job.location}
                        </text>
                        <text>
                          <img src={briefcase} alt="img" />
                          &nbsp; {job.jobType}
                        </text>
                      </div>
                      <span>View Details</span>
                    </div>
                    <button>Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
            <span>
              View More <img src={lock} alt="img" />
            </span>
          </div>

          <div className={styles.moreJobs}>
            <text>More Jobs For You</text>
            <text>Based on your profile and search history</text>
            {jobsArray.map((job, index) => (
              <div className={styles.jobRow} key={index}>
                <img src={require("../../images/recomenjob.png")} alt="img" />
                <div>
                  <div className={styles.jobRowTopDiv}>
                    <div>
                      <text>{job.companyName}</text>
                      <text>{job.companyAddress}</text>
                    </div>
                    <div>
                      <text>
                        <img src={timer} alt="img" />
                        &nbsp; {job.postedTime}
                      </text>
                      <img src={bookmark} alt="img" />
                    </div>
                  </div>
                  <div className={styles.jobRowButtomDiv}>
                    <div>
                      <div>
                        <text>
                          <img src={location} alt="img" />
                          &nbsp; {job.location}
                        </text>
                        <text>
                          <img src={briefcase} alt="img" />
                          &nbsp; {job.jobType}
                        </text>
                      </div>
                      <span>View Details</span>
                    </div>
                    <button>Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
            <span>View More</span>
          </div>
        </div>
        {/* -----------middle part ends------------------ */}

        {/* -----------right part starts------------------ */}
        <div className={styles.rightSidebar} style={{ marginTop: "10em" }}>
          <div className={styles.rightButtonsContainer}>
            <div>
              <text>
                <img src={firstline} alt="img" />
                &nbsp; All Job Posts
              </text>
              <span>&gt;</span>
            </div>
            <div>
              <text>
                <img src={bookmark} alt="img" />
                &nbsp; Saved Jobs
              </text>
              <span>&gt;</span>
            </div>
            <div>
              <text>
                <img src={briefcase} alt="img" />
                &nbsp; Applied Jobs
              </text>
              <span>&gt;</span>
            </div>
            <div>
              <text>
                <img src={resume} alt="img" />
                &nbsp; Resume Builder
              </text>
              <span>&gt;</span>
            </div>
            <div>
              <text>
                <img src={settings} alt="img" />
                &nbsp; Settings
              </text>
              <span>&gt;</span>
            </div>
          </div>
        </div>
        {/* -----------right part ends------------------ */}
      </div>
    </>
  );
}

export default JobPosts;
