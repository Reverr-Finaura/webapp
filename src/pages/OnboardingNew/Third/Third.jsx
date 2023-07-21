import React, { useState, useEffect } from "react";
import styles from "./Third.module.css";
import ReverrDarkIcon from "../../../images/new-dark-mode-logo.png";
import { useNavigate } from "react-router-dom";
import { setImage,setAboutToStore,setDesignationToStore } from "../../../features/onboardingSlice";
import { useDispatch } from "react-redux";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";

function Third() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ProfileImage, setProfileImage] = useState(null);
  const [imgUrl , setImgUrl] = useState("");
  const [uploadedProfileImage, setUploadedProfileImage] = useState(null)
  const [designation, setDesignation] = useState("");
  const [about, setAbout] = useState("");
  const [imgError,setimgError]=useState('');
  const [desError,setdesError]=useState('');
  const [abtError,setabtError]=useState('');

  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    setUploadedProfileImage(uploadedImage)
    setProfileImage(URL.createObjectURL(uploadedImage));
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  // this function will handle two function when the Next button is clicked

  const handleFunctions = () => {
    if(validate()){
    navigate("/onboarding-fourth");
    dispatch(setImage(imgUrl));
    dispatch(setDesignationToStore(designation));
    dispatch(setAboutToStore(about));
    setImgUrl('');
    setdesError('');
    setabtError('');
    
    }
   
  }

useEffect(() => {
  const uplaodImage =async () => {
    if(!uploadedProfileImage == null){
      return;
    } 
    try{
      const imageRef = ref(storage, `onboardingImages/${uploadedProfileImage.name}`)
      await uploadBytes(imageRef,uploadedProfileImage)
      const getImageUrl = await getDownloadURL(imageRef);
      setImgUrl(getImageUrl)
    }catch(err){
      console.error(err)
    }
  }
  uplaodImage()
}, [uploadedProfileImage])

function validate(){
  let nameError = "";
  let emailError = "";
  let passwordError = "";
  if(!uploadedProfileImage){
  nameError = "Image field is required";
  }
  
  if(!about){
  emailError = "About Field is required ";
  }
  if(!designation){
  passwordError = "Designation field is required";
  }
  if(emailError || nameError || passwordError){
  setimgError(nameError);
  setdesError(passwordError);
  setabtError(emailError)
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
          <text style={{ fontSize: 40, color: "#ffffff", marginBlock: 20 }}>
            Let us get to know you!
          </text>
          <text style={{ fontSize: 12, color: "#ffffff" }}>
            Upload your photo
          </text>
          <label htmlFor="upload" className={styles.uploadPhoto}>
            {ProfileImage ? (
              <img src={ProfileImage} alt="img" />
            ) : (
              <>
                <img
                  src={require("../../../images/uploadphoto.png")}
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
            <text style={{ fontSize: 10, color: "#ffffff" }}>
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
            <text style={{ fontSize: 10, color: "#ffffff" }}>
              Tell us a little bit about yourself.
            </text>
            <textarea
              type="text"
              placeholder="About"
              value={about}
              onChange={handleAboutChange}
              required
            />
            <span className={styles.textdanger}>{abtError}</span>
          </div>

          <div style={{ marginTop: 30 }}>
            <button
              className={styles.leftButton}
              onClick={() => navigate("/onboarding-second")}
            >
              Back
            </button>
            <button
              className={styles.rightButton}
              onClick={handleFunctions}
            >
              Next
            </button>
          </div>
        </div>
        <img src={require("../../../images/onboardingthird.png")} alt="img" />
      </div>
    </div>
  );
}

export default Third;
