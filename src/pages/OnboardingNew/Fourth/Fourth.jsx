import React, { useState } from "react";
import styles from "./Fourth.module.css";
import ReverrDarkIcon from "../../../images/new-dark-mode-logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCountry,
  setState,
  setDegree,
  setInstitute,
  setExpDesignation,
  setExpCompany,
  setLinkedin,
  setTwitter
} from "../../../features/onboardingSlice";

function Fourth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [countryLocation, setCountryLocation] = useState("");
  const [StateLocation, setStateLocation] = useState("");
  const [education, setEducation] = useState([{ degree: "", institute: "" }]);
  const [experience, setexperience] = useState([{ designation: "", company: "" }]);
  const [locError, setlocError] = useState("");
  const [stateError, setstateError] = useState("");
  const [degError, setdegError] = useState("");
  const [insError, setinsError] = useState("");
  const [desError, setdesError] = useState("");
  const [comError, setcomError] = useState("");

  const [linkedinLink, setLinkedinLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");



  const handleFunctions = () => {
    if (validate()) {
      navigate("/onboarding-fifth");
      dispatch(setCountry(countryLocation));
      dispatch(setState(StateLocation));
      dispatch(setDegree(education[0].degree));
      dispatch(setInstitute(education[0].institute));
      dispatch(setExpDesignation(experience[0].designation));
      dispatch(setExpCompany(experience[0].company));
      dispatch(setLinkedin(linkedinLink));
      dispatch(setTwitter(twitterLink));
      setlocError('');
      setstateError('');
      setdesError('');
      setinsError('');
      setdegError('');
      setcomError('');
    }
  }

  const handleCountryChange = (event) => {
    setCountryLocation(event.target.value);
  };

  const handleStateChange = (event) => {
    setStateLocation(event.target.value);
  };

  const handleDegreeChange = (event, index) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      degree: event.target.value,
    };
    setEducation(updatedEducation);
  };

  const handleInstituteChange = (event, index) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      institute: event.target.value,
    };
    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", institute: "" }]);
  };


  const handleDesignationChange = (event, index) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      designation: event.target.value,
    };
    setexperience(updatedExperience);
  };

  const handleCompanyChange = (event, index) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      company: event.target.value,
    };
    setexperience(updatedExperience);

  };

  const addExperience = () => {
    setexperience([...experience, { designation: "", company: "" }]);
  };


  const removeEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  // const handleDesignationChange = (event) => {
  //   setDesignation(event.target.value);
  // };

  // const handleCompanyChange = (event) => {
  //   setCompany(event.target.value);
  // };

  const handleLinkedinChange = (event) => {
    setLinkedinLink(event.target.value);
  };

  const handleTwitterChange = (event) => {
    setTwitterLink(event.target.value);
  };

  function validate() {
    let locError = "";
    let stateError = "";
    let desError = "";
    let comError = "";
    let degError = "";
    let insError = "";
    if (!countryLocation) {
      locError = "Country field is required";
    }

    if (!StateLocation) {
      stateError = "State Field is required ";
    }
    if (!education[0].degree) {
      degError = "Degree field is required";
    }
    if (!education[0].institute) {
      insError = "Institute field is required";
    }
    if (!experience[0].designation) {
      desError = "Designation field is required";
    }
    if (!experience[0].company) {
      comError = "Company field is required";
    }
    if (locError || stateError || degError || desError || comError || insError) {
      setlocError(locError);
      setstateError(stateError);
      setdesError(desError);
      setinsError(insError);
      setdegError(degError);
      setcomError(comError);
      return false;
    }
    return true;
  }

  return (
    <div className={styles.container}>
      <div
        onClick={() => navigate("/")}
        className={styles.navbarBrandLogoImgCont}
      >
        <img
          className={styles.navbarFinalBrandLogoImg}
          src={ReverrDarkIcon}
          alt="brand-logo"
        />
        <span className={styles.reverrHeadingSpan}>
          <p className={styles.reverrHeading}>Reverr</p>
        </span>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.leftComponent}>
        <text className={styles.heading}>
            Let us get to know you!
          </text>
          <div className={styles.textInputContainer}>
            <div className={styles.textInput}>
              <text style={{ fontSize: 10, color: "#ffffff" }}>Location</text>
              <input
                type="text"
                placeholder="State"
                value={StateLocation}
                onChange={handleStateChange}
                required
              />
              <span className={styles.textdanger}>{stateError}</span>
            </div>
            <div className={styles.textInput}>
              <text style={{ fontSize: 10, color: "#ffffff" }}>Country</text>
              <input
                type="text"
                placeholder="Country"
                value={countryLocation}
                onChange={handleCountryChange}
                required
              />
              <span className={styles.textdanger}>{locError}</span>
            </div>
            {/* <div> */}
            {education.map((edu, index) => (
              <React.Fragment key={`edu0-${index}`}>
                <div className={styles.textInput} key={`edu0-${index}`}>
                  <text style={{ fontSize: 10, color: "#ffffff" }}>
                    Highest educational degree?
                  </text>
                  <input
                    type="text"
                    placeholder="BTech"
                    value={edu.degree}
                    onChange={(event) => handleDegreeChange(event, index)}
                    required
                  />
                  <span className={styles.textdanger}>{degError}</span>

                  {/* <select>
                    <option value="option1">BTech</option>
                    <option value="option2">MTech</option>
                  </select> */}
                </div>
                <div className={styles.textInput} key={`edu1-${index}`}>
                  <text style={{ fontSize: 10, color: "#ffffff" }}>
                    Name of Institution
                  </text>
                  <input
                    type="text"
                    placeholder="XYZ college"
                    value={edu.institute}
                    onChange={(event) => handleInstituteChange(event, index)}
                    required
                  />
                  <span className={styles.textdanger}>{insError}</span>
                  {/* <select>
                    <option value="option1">XYZ college</option>
                    <option value="option2">ABC college</option>
                </select> */}
                </div>
                {/* <button onClick={() => removeEducation(index)}>Remove</button> */}
              </React.Fragment>
            ))}


            {experience.map((exp, index) => (
              <React.Fragment key={`exp0-${index}`}>
                <div className={styles.textInput} key={`exp0-${index}`}>
                  <text style={{ fontSize: 10, color: "#ffffff" }}>
                    What’s your designation?
                  </text>
                  <input
                    type="text"
                    placeholder="Enter your designation"
                    value={exp.designation}
                    onChange={(event) => handleDesignationChange(event, index)}
                    required
                  />
                  <span className={styles.textdanger}>{desError}</span>
                </div>

                <div className={styles.textInput} key={`exp1-${index}`}>
                  <text style={{ fontSize: 10, color: "#ffffff" }}>
                    Name of the company
                  </text>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={exp.company}
                    onChange={(event) => handleCompanyChange(event, index)}
                    required
                  />
                  <span className={styles.textdanger}>{comError}</span>
                </div>
              </React.Fragment>
            ))}


            <div className={styles.textInput}>
              <text style={{ fontSize: 10, color: "#ffffff" }}>
                LinkedIn Id
              </text>
              <input
                type="text"
                placeholder="Id"
                value={linkedinLink}
                onChange={handleLinkedinChange}
              />
            </div>
            <div className={styles.textInput}>
              <text style={{ fontSize: 10, color: "#ffffff" }}>
                Twitter username
              </text>
              <input
                type="text"
                placeholder="username"
                value={twitterLink}
                onChange={handleTwitterChange}
              />
            </div>
          </div>
          <div  className={styles.buttonDiv}>
            <button
              className={styles.leftButton}
              onClick={() => navigate("/onboarding-third")}
            >
              Back
            </button>
            <button
              className={styles.rightButton}
              onClick={handleFunctions}
            >
              Next
            </button>
            <button className={styles.skipButton}>Skip</button>
          </div>
        </div>
        <div className={styles.hiddenOnMobile}>
          <img
            className={styles.mainImage}
            src={require("../../../images/onboardingforth.png")}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default Fourth;
