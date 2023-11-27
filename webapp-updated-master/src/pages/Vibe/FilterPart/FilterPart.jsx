import React from "react";
import styles from "./styles.module.css";
import filterIcon from "../../../images/filterIcon.svg";
// import userProfilePucture from "../../../images/userProfilePicture.svg";
import location from "../../../images/location.svg";
import videoCall from "../../../images/videocallimg.svg";
import phoneCall from "../../../images/phonecallimg.svg";
import atCoffee from "../../../images/atcoffeeimg.svg";

import { useState, useEffect } from "react";
import {
  setUserSpaces,
  setuserType,
  setroles,
  setRole,
  setCities,
  setMode,
  setagePref,
} from "../../../features/onboardingSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import defaultImg from "../../../images/default-profile-pic.webp";
import { toast } from "react-toastify";
import { UserAddIcon } from "@heroicons/react/outline";

const FilterPart = ({
  SetRedo,
  setIsPremium,
  modal,
  setModal,
  filterData,
  setfilterData,
  setFilter,
  setFetchAgain,
  fetchAgain,
}) => {
  const role = ["Founder", "Mentor", "Professional", "Investor"];
  const spaces = [
    "FinTech",
    "Visual Design",
    "EdTech",
    "FoodTech",
    "AgriTech",
    "E-commerce",
    "Logistics & Delivery",
    "CleanTech & RE",
    "AI & ML",
    "Web 3.0",
    "FashionTech",
    "HealthTech",
    "SpaceTech",
    "Cybersecurity",
    "Internet of Things (IOT)",
    "AR & VR",
    "BioTech",
    "Real Estate",
    "TravelTech",
    "BeautyTech",
    "LegalTech",
    "HR-Tech",
    "Personal Fitness Tech",
    "Waste Management",
    "CouldTech",
  ];
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
  const modeAll = ["Video Call", "Phone Call", "At Coffee"];

  const [userDoc, setUserDoc] = useState([]);
  const [rolesSelected, setrolesSelected] = useState("");

  const [spaceSelected, setspaceSelected] = useState([]);
  const [modeSelected, setmodeSelected] = useState("");
  const [citiesSelected, setcitiesSelected] = useState([]);

  const userData = useSelector((state) => state.userDoc);
  const obData = useSelector((state) => state.onboarding);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [age, setAge] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setspaceSelected(filterData.spaces);
    setrolesSelected(filterData.roles);
    setmodeSelected(filterData.mode);
    setcitiesSelected(filterData.cities);
    setAge(filterData.age);
  }, []);

  const handleLocationClick = (e) => {
    const data = e.target.value;
    setcitiesSelected(data);
  };

  const handleRolesClick = (spaceText) => {
    if (rolesSelected === spaceText) {
      // If the space text is already selected, remove it from the array
      setrolesSelected("");
    } else {
      // If the space text is not selected, add it to the array
      setrolesSelected(spaceText);
      // console.log("Aroles:", rolesSelected);
    }
  };
  const handleSpaceClick = (spaceText) => {
    if (spaceSelected.includes(spaceText)) {
      // If the space text is already selected, remove it from the array
      setspaceSelected(spaceSelected.filter((text) => text !== spaceText));
    } else {
      // If the space text is not selected, add it to the array
      setspaceSelected([...spaceSelected, spaceText]);
      // console.log("Aspace:", spaceSelected);
    }
  };
  const handleModeClick = (spaceText) => {
    if (modeSelected === spaceText) {
      // If the space text is already selected, remove it from the array
      setmodeSelected("");
    } else {
      // If the space text is not selected, add it to the array
      setmodeSelected(spaceText);
    }
  };
  const handleDoneClick = async () => {
    const data = {
      spaces: spaceSelected,
      roles: rolesSelected,
      mode: modeSelected,
      age: age,
      cities: citiesSelected,
    };

    setfilterData(data);
    setFilter(true);
    // setFilter(false);
    // setFetchAgain(!fetchAgain);
    // setModal(false);
    // setIsPremium(false);
    // SetRedo(false);

    /*  dispatch(setUserSpaces(spaceSelected));
    dispatch(setroles(rolesSelected));
    dispatch(setMode(modeSelected));
    dispatch(setagePref(age))
    dispatch(setCities(citiesSelected))

    const onboardingDataSoFar = {
      userSpace: spaceSelected,
      roles:rolesSelected,
      mode:modeSelected,
      agePref:age,
      cities:citiesSelected


    };
    try {
      // Attempt to upload the data
      await uploadOnboardingData(onboardingDataSoFar);
      // If data upload is successful, navigate to the next page]
      
    } catch (err) {
      console.error(err);
      // Handle the error (optional) or show an error message to the user
      // Don't navigate since data upload was not successful
    }
    setModal(false)
    setIsPremium(false)
    SetRedo(false)
    

  }
  const uploadOnboardingData = async (data) => {
    const userEmail = user?.user?.email;
    if (!userEmail) {
      throw new Error("User email not available");
    }
  
    const docRef = doc(db, "Users", userEmail);
  
    try {
      // Perform a single update with all the fields to be updated
      await setDoc(docRef, data, { merge: true });
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be caught in the calling function
    }
    */
  };
  const handleAge = (event) => {
    const value = event.target.value;
    setAge(value);
  };

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
        <div className={styles.filterTitle}>Select a Role.</div>
        <div className={styles.filterContent}>
          {role.map((item, index) => {
            return (
              <div
                className={
                  rolesSelected === item ? styles.filterItem : styles.rolealter
                }
                key={index}
                onClick={() => handleRolesClick(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Select Spaces(s)</div>
        <div className={styles.filterContent}>
          {spaces.map((item, index) => {
            return (
              <div
                className={
                  spaceSelected.includes(item)
                    ? styles.filterItem
                    : styles.rolealter
                }
                key={index}
                onClick={() => handleSpaceClick(item)}
              >
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
            type='range'
            min='0'
            max='100'
            value={age}
            className={styles.slider}
            id='myRange'
            step={1}
            onChange={(e) => handleAge(e)}
          />
          <p>{age}</p>
        </div>
      </div>

      {/* --------------Type Of Meeting?-------------- */}
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Type of meeting?</div>
        <div className={styles.filterContent}>
          {modeAll.map((item, index) => {
            return (
              <div
                className={
                  modeSelected === item
                    ? styles.meetingCardalter
                    : styles.meetingCard
                }
                key={index}
                onClick={() => handleModeClick(item)}
              >
                <div className={styles.meetingCardTitle}>
                  {" "}
                  <img
                    style={{ width: "80px", height: "80px" }}
                    src={videoCall}
                    alt=''
                  />
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* -------------------Location Preference---------------------- */}
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Location Preference</div>
        <div className={styles.filterContent}>
          <div> Select your preferred cities:</div>
          <div>
            <input
              type='text'
              placeholder='City'
              onChange={(e) => handleLocationClick(e)}
              value={citiesSelected}
            />
          </div>
        </div>
      </div>

      {/* ---------------Done/Cancel Button--------------- */}
      <div className={styles.filter}>
        <div className={styles.filterContent}>
          <div className={styles.doneBtn} onClick={handleDoneClick}>
            Done
          </div>
          <div
            onClick={() =>
              // setIsPremium(false),
              // SetRedo(false),
              // setModal(!modal),
              setFilter(false)
            }
            className={styles.filterItem}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPart;
