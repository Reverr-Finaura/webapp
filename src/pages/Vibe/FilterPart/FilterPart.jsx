import React from "react";
import styles from "./styles.module.css";
import videoCall from "../../../images/videocallimg.svg";
import phoneCall from "../../../images/phonecallimg.svg";
import atCoffee from "../../../images/atcoffeeimg.svg";

const FilterPart = ({setFilter}) => {
  const role =["Founder","Mentor","Professional","Investor","Service Provider"]
  const spaces =["FinTech","Visual Design","EdTech","FoodTech","AgriTech","E-commerce","Logistics & Delivery",
                "CleanTech & RE","AI & ML","Web 3.0","FashionTech","HealthTech","SpaceTech","Cybersecurity",
                "Internet of Things (IOT)","AR & VR","BioTech","Real Estate","TravelTech","BeautyTech","LegalTech","HR-Tech",
                "Personal Fitness Tech","Waste Management","CouldTech"]
  const interests = ["MentorShip", "Fundraising", "Knowledge"];
  const industry = [
    "FinTech",
    "Visual Design",
    "Architecture",
    "IT & Telecom",
    "Crypto",
    "Logistics",
    "EdTech",
    "Finance",
    "Sales",
    "Real Estate",
    "AgriTech",
    "EdTech",
    "FoodTech",
    "Media",
  ];
  const strengths = [
    "Finance",
    "Business Analytics",
    "Marketing",
    "Technology",
    "Sales",
    "Design",
    "Media",
  ];
  return (
    <div className={styles.filterWrapper}>
      {/* <div className={styles.filter}>
        <div className={styles.filterTitle}>
          Select your preferred interests
        </div>
        <div className={styles.filterContent}>
          {interests.map((item, index) => {
            return (
              <div className={styles.filterItem} key={index}>
                {item}
              </div>
            );
          })} */}
          {/* <div className={styles.filterItemSelected}>MentorShip</div> */}
        {/* </div> */}
      {/* </div> */}
       <div className={styles.filter}>
        <div className={styles.filterTitle}>
        Select a Role.
        </div>
        <div className={styles.filterContent}>
          {role.map((item, index) => {
            return (
              <div className={styles.filterItem} key={index}>
                {item}
              </div>
            );
          })} 
        </div>
      </div>
      <div className={styles.filter}>
        <div className={styles.filterTitle}>
        Select Spaces(s)
        </div>
        <div className={styles.filterContent}>
          {spaces.map((item, index) => {
            return (
              <div className={styles.filterItem} key={index}>
                {item}
              </div>
            );
          })}
          {/* <div className={styles.filterItemSelected}>MentorShip</div> */}
        </div>
      </div>
      {/* ------------------------Strengths--------------------- */}
      {/* <div className={styles.filter}>
        <div className={styles.filterTitle}>
          Select your preferred interests
        </div>
        <div className={styles.filterContent}>
          {strengths.map((item, index) => {
            return (
              <div className={styles.filterItem} key={index}>
                {item}
              </div>
            );
          })} */}
          {/* <div className={styles.filterItemSelected}>MentorShip</div> */}
        {/* </div>
      </div> */}
      {/* --------------------Age Preference---------------- */}
      {/* IT IS LINE RANGE INPUT */}
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Age Preference</div>
        <div className={styles.filterContent}>
          <input
            type="range"
            min="0"
            max="100"
            value="50"
            className={styles.slider}
            id="myRange"
            step={1}
          />
        </div>
      </div>

      {/* --------------Type Of Meeting?-------------- */}
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Type of meeting?</div>
        <div className={styles.filterContent}>
          <div className={styles.meetingCard}>
            <div className={styles.meetingCardTitle}> <img style={{width:"80px",height:"80px"}} src={videoCall} alt="" />Video Call</div>
          </div>
          <div className={styles.meetingCard}>
            <div className={styles.meetingCardTitle}><img style={{width:"80px",height:"80px"}} src={phoneCall} alt="" />Phone Call</div>
          </div>
          <div className={styles.meetingCard}>
            <div className={styles.meetingCardTitle}><img style={{width:"80px",height:"80px"}} src={atCoffee} alt="" />At Coffee</div>
          </div>
        </div>
      </div>

      {/* -------------------Location Preference---------------------- */}
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Location Preference</div>
        <div className={styles.filterContent}>
          <div> Select your preferred cities:</div>
          <div>
            <input type="text" placeholder="City" />
          </div>
        </div>
      </div>

      {/* ---------------Done/Cancel Button--------------- */}
      <div className={styles.filter}>
        <div className={styles.filterContent}>
          <div className={styles.doneBtn}>Done</div>
          <div onClick={()=>setFilter(false)} className={styles.filterItem}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

export default FilterPart;
