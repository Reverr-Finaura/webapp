import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import eye from "../../../images/eye.svg";
import postsIcon from "../../../images/galleryedit.svg";
import people from "../../../images/people.svg";
import setting from "../../../images/setting.svg";
import edit from "../../../images/edit.svg";
import styles from "./ProfileSummary.module.css";
import defaultImg from "../../../images/default-profile-pic.webp";

const ProfileSummary = () => {
  const [profileCompletionProgress, setProfileCompletionProgress] = useState(0);
  const userDoc = useSelector((state) => state.userDoc);
  const navigate = useNavigate();

  // const spaces = useSelector((state) => state);

  // CHECK FOR USER PROFILE PROGRESS BAR
  useEffect(() => {
    function checkForUserProfileProgress() {
      let incrementValue = 10;
      let percentComplete = 0;

      if (userDoc.image !== undefined && userDoc.image !== "") {
        percentComplete += incrementValue;
      }
      if (userDoc.name !== undefined && userDoc.name !== "") {
        percentComplete += incrementValue;
      }
      if (userDoc.email !== undefined && userDoc.email !== "") {
        percentComplete += incrementValue;
      }
      if (userDoc.about !== undefined && userDoc.about !== "") {
        percentComplete += incrementValue;
      }
      if (userDoc.designation !== undefined && userDoc.designation !== "") {
        percentComplete += incrementValue;
      }
      if (userDoc.experience !== undefined && userDoc.experience.length !== 0) {
        percentComplete += incrementValue;
      }
      if (userDoc.education !== undefined && userDoc.education.length !== 0) {
        percentComplete += incrementValue;
      }
      if (userDoc.linkedin !== undefined && userDoc.linkedin !== "") {
        percentComplete += incrementValue;
      }
      if (userDoc.here_for !== undefined && userDoc.here_for.length !== 0) {
        percentComplete += incrementValue;
      }
      if (userDoc.userSpace !== undefined && userDoc.userSpace.length !== 0) {
        percentComplete += incrementValue;
      }

      setProfileCompletionProgress(Math.ceil(percentComplete));
    }
    checkForUserProfileProgress();
  }, [userDoc]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img
            src={
              userDoc?.image ? userDoc.image : defaultImg
              // "https://media.giphy.com/media/KG4PMQ0jyimywxNt8i/giphy.gif"
            }
            className={styles.profileImage}
            style={{ objectFit: "cover" }}
            alt='img'
          />
          <div className={styles.userDetails}>
            <p
              style={{ textTransform: "capitalize" }}
              className={styles.nameText}
            >
              {userDoc?.name}
            </p>
            <p className={styles.positionText}>{userDoc?.designation}</p>
          </div>
        </div>
        {/* <button
          className={styles.settingsButton}
          onClick={() => console.log("settings clicked")}
        >
          <img src={setting} alt="setting" />
        </button> */}
      </div>

      <div className={styles.postConnectionRow}>
        <div className={styles.post}>
          <img className={styles.postImage} src={postsIcon} alt='postsIcon' />
          <p className={styles.postText}>
            {userDoc?.posts ? userDoc.posts.length : 0} Posts
          </p>
        </div>
        <div className={styles.connection}>
          <img className={styles.connectionImage} src={people} alt='eye' />
          <p className={styles.connectionText}>
            {userDoc?.network ? userDoc.network.length : 0} connections
          </p>
        </div>
      </div>

      <div className={styles.space}>
        <p className={styles.spaceText}>SPACES</p>
        <img
          className={styles.spaceImage}
          onClick={() => navigate("/editprofile")}
          src={edit}
          alt='img'
        />
      </div>

      {userDoc?.userSpace?.length ? (
        <>
          <div className={styles.spacesRow}>
            {userDoc.userSpace.slice(0, 2).map((item, index) => (
              <div key={index} className={styles.spacesRowDiv}>
                <p className={styles.spacesRowText}>{item}</p>
              </div>
            ))}
          </div>
          {userDoc.userSpace.length > 3 ? (
            <div className={styles.spacesRow}>
              {userDoc.userSpace.slice(2, 4).map((item, index) => (
                <div key={index} className={styles.spacesRowDiv}>
                  <p className={styles.spacesRowText}>{item}</p>
                </div>
              ))}
            </div>
          ) : null}
          {userDoc.userSpace.length > 5 ? (
            <div className={styles.spacesRow}>
              {userDoc.userSpace.slice(4, 6).map((item, index) => (
                <div key={index} className={styles.spacesRowDiv}>
                  <p className={styles.spacesRowText}>{item}</p>
                </div>
              ))}
            </div>
          ) : null}
          {userDoc.userSpace.length > 7 ? (
            <div className={styles.spacesRow}>
              {userDoc.userSpace.slice(6, 8).map((item, index) => (
                <div key={index} className={styles.spacesRowDiv}>
                  <p className={styles.spacesRowText}>{item}</p>
                </div>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <button
          className={styles.addSpaceButton}
          onClick={() => navigate("/editprofile")}
        >
          Add Space
        </button>
      )}

      {profileCompletionProgress === 100 ? null : (
        <div className={styles.progressbar}>
          <div style={{ width: `${profileCompletionProgress}%` }}></div>
          <p>{profileCompletionProgress}% is completed</p>
        </div>
      )}

      <div className={styles.complete_profile}>
        {profileCompletionProgress === 100 ? (
          <button onClick={() => navigate("/editprofile")}>
            Edit your profile
          </button>
        ) : (
          <button onClick={() => navigate("/editprofile")}>
            Complete your profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileSummary;
