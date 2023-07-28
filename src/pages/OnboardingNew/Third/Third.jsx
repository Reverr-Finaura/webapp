import React, { useState, useEffect } from "react";
import styles from "./Third.module.css";
import ReverrDarkIcon from "../../../images/new-dark-mode-logo.webp";
import { useNavigate } from "react-router-dom";
import {
  setImage,
  setAboutToStore,
  setDesignationToStore,
} from "../../../features/onboardingSlice";
import { storage } from "../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";

function Third() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const onboardingData = useSelector((state) => state.onboarding);
  const [ProfileImage, setProfileImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [uploadedProfileImage, setUploadedProfileImage] = useState(null);
  const [designation, setDesignation] = useState("");
  const [about, setAbout] = useState("");
  const [imgError, setimgError] = useState("");
  const [desError, setdesError] = useState("");
  const [abtError, setabtError] = useState("");

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    console.log("uploadedImage", uploadedImage);
    setUploadedProfileImage(uploadedImage);
    setProfileImage(URL.createObjectURL(uploadedImage));
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleAboutChange = (event) => {
    const inputText = event.target.value;

    
    setAbout(inputText);
  };
  const remainingWords = 1000 - about.trim().split(/\s+/).filter((word) => word !== '').length;


  // // this function will handle two function when the Next button is clicked

  // const handleFunctions = () => {
  //   if (validate()) {
  //     navigate("/onboarding-fourth");
  //     dispatch(setImage(imgUrl));
  //     dispatch(setDesignationToStore(designation));
  //     dispatch(setAboutToStore(about));
  //     setImgUrl("");
  //     setdesError("");
  //     setabtError("");
  //   }
  // };

  // Function to handle the "Next" button click
  const handleNextButtonClick = async () => {
    if (validate()) {
      dispatch(setImage(imgUrl));
      dispatch(setDesignationToStore(designation));
      dispatch(setAboutToStore(about));
      setImgUrl("");
      setdesError("");
      setabtError("");

      // Upload onboarding data to Firebase
      const onboardingDataSoFar = {
        image: imgUrl,
        about: about,
        designation: designation,
      };

      try {
        // Attempt to upload the data
        await uploadOnboardingData(onboardingDataSoFar);
        // If data upload is successful, navigate to the next page
        navigate("/onboarding-fourth");
      } catch (err) {
        console.error(err);
        // Handle the error (optional) or show an error message to the user
        // Don't navigate since data upload was not successful
      }
    }
  };

  useEffect(() => {
    const uplaodImage = async () => {
      if (!uploadedProfileImage == null) {
        return;
      }
      try {
        const imageRef = ref(
          storage,
          `onboardingImages/${uploadedProfileImage.name}`
        );
        await uploadBytes(imageRef, uploadedProfileImage);
        const getImageUrl = await getDownloadURL(imageRef);
        setImgUrl(getImageUrl);
      } catch (err) {
        console.error(err);
      }
    };
    uplaodImage();
  }, [uploadedProfileImage]);

  function validate() {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    if (!uploadedProfileImage) {
      nameError = "Image field is required";
      toast.error(nameError);
    }

    if (about === "") {
      emailError = "About Field is required ";
    }
    if (designation === "") {
      passwordError = "Designation field is required";
    }
    if (emailError || nameError || passwordError) {
      setimgError(nameError);
      setdesError(passwordError);
      setabtError(emailError);
      return false;
    }
    return true;
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
  };



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
          <text className={styles.heading}>Let us get to know you!</text>
          <text className={styles.subHeading}>Upload your photo</text>
          <label htmlFor="upload" className={styles.uploadPhoto}>
            {ProfileImage ? (
              <img src={ProfileImage} alt="img" />
            ) : (
              <>
                <img
                  src={require("../../../images/uploadphoto.webp")}
                  alt="img"
                />
                <div>
                  <span style={{ fontSize: 12 }}>Upload</span>
                  <span style={{ fontSize: 12 }}>+</span>
                </div>
              </>
            )}
          </label>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            required
          />
          <span className={styles.textdanger}>{imgError}</span>
          <div className={styles.textInput}>
            <text className={styles.asterik} style={{ fontSize: 10, color: "#ffffff" }}>
              What’s your designation?
            </text>
            <input
              type="text"
              placeholder="Enter your designation"
              value={designation}
              onChange={handleDesignationChange}
              required
            />
            <span className={styles.textdanger}>{desError}</span>
          </div>
          <div className={styles.textInput}>
            <text className={styles.asterik} style={{ fontSize: 10, color: "#ffffff" }}>
              Tell us a little bit about yourself.
            </text>
            <textarea
              type="text"
              placeholder="Enter upto 1000 words"
              value={about}
              onChange={handleAboutChange}
              required
            />
            <div>
              {remainingWords >= 0 ? (
                <span style={{color:'white'}}>{remainingWords} word(s) remaining</span>
              ) : (
                <span style={{ color: 'red' }}>You've exceeded the word limit</span>
              )}
            </div>
            <span className={styles.textdanger}>{abtError}</span>
          </div>

          <div className={styles.buttonDiv}>
            <button
              className={styles.leftButton}
              onClick={() => navigate("/onboarding-second")}
            >
              Back
            </button>
            <button className={styles.rightButton} onClick={handleNextButtonClick}>
              Next
            </button>
          </div>
        </div>
        <div className={styles.hiddenOnMobile}>
          <img
            className={styles.mainImage}
            src={require("../../../images/onboardingthird.webp")}
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default Third;
