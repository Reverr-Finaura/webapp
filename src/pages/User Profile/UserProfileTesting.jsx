import React, { useEffect, useState } from "react";
import styles from "./UserProfileTesting.module.css";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDoc } from "../../features/userDocSlice";
import { setUserFundingDoc } from "../../features/userFundingDocSlice";
import DefaultDP from "../../images/Defaultdp.png";
import toast, { Toaster } from "react-hot-toast";

const apointmentdata =[
  "Software","Self Advisory","Product Management","Career Advice",
  "IT Consulting"
]

const UserProfileTesting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);
  const userFundingDoc = useSelector((state) => state.userFundingDoc);

  //   console.log("userDoc", userDoc);
  //   console.log("userFundingDoc", userFundingDoc);

  const [hasUserProfile, setHasUserProfile] = useState(true);
  const [userDocId, setUserDocId] = useState([]);

  // CHECK FOR USER DOC DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUserDocId((prev) => {
          return [...prev, doc.id];
        });
        if (
          doc.id === user?.user?.email ||
          doc.id.toLowerCase() === user?.user?.email.toLowerCase()
        ) {
          dispatch(setUserDoc(doc.data()));
        }
      });
    }
    fetchUserDocFromFirebase();
  }, [user]);

  // CHECK IF USER HAS FUNDING PROFILE

  useEffect(() => {
    if (userDoc?.hasFundingProfile === "No") {
      return;
    }
    async function fetchUserFundingDocFromFirebase() {
      const userFundingDataRef = collection(db, "Funding");
      const q = query(userFundingDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (
          doc.id === user?.user?.email ||
          doc.id.toLowerCase() === user?.user?.email.toLowerCase()
        ) {
          dispatch(setUserFundingDoc(doc.data()));
        }
      });
    }
    fetchUserFundingDocFromFirebase();
  }, [userDoc]);

  useEffect(() => {
    if (user && userDoc) {
      if (userDoc?.hasGeneralProfile === true) {
        setHasUserProfile(true);
        return;
      } else if (userDoc?.hasGeneralProfile === false) {
        setHasUserProfile(false);
      }
    }
  }, [userDoc]);

  // console.log("userDoc", userDoc);

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <NavBarFinalDarkMode />
      <div className={styles.profileWrapper}>
        <div className={styles.profileContainer}>
          <div
            className={styles.profileHeader}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src="/images/profileArrowLeft.svg" alt="back" />
            <p>My Profile</p>
          </div>
          <div className={styles.profileUser}>
            <div className={styles.profileBackground}></div>
            <div className={styles.profileImage}>
              {/* <img src="/images/UserProfileTest.png" alt="Linkedin" /> */}
              <img
                src={
                  userDoc?.image && userDoc?.image !== ""
                    ? userDoc.image
                    : DefaultDP
                }
                alt="Linkedin"
              />
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileUserIcon}>
                <img
                  src="/images/fluent_call-24-regular.svg"
                  alt="Linkedin"
                  onClick={() => {
                    navigator.clipboard.writeText(userDoc.phone);
                    toast.success("Phone number copied to clipboard");
                  }}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src="/images/logos_google-gmail.svg"
                  alt="Linkedin"
                  onClick={() => {
                    navigator.clipboard.writeText(userDoc.email);
                    toast.success("Email copied to clipboard");
                  }}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src="/images/skill-icons_linkedin.svg"
                  alt="Linkedin"
                  onClick={() => {
                    navigator.clipboard.writeText(userDoc.linkedin);
                    toast.success("Linkedin profile copied to clipboard");
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className={styles.profileInfoName}>
                <p style={{ textTransform: "capitalize" }}>{userDoc?.name}</p>
              </div>
              <div className={styles.profileDesignation}>
                <p>
                  {userDoc?.designation
                    ? userDoc.designation
                    : "Add your Designation"}
                </p>
              </div>
              <div className={styles.profileLocation}>
                <img
                  src="/images/basil_location-outline.svg"
                  alt="ProfileImage"
                />
                <p>
                  {userDoc?.state
                    ? userDoc.country
                      ? userDoc.state + ", " + userDoc.country
                      : "Add your country"
                    : "Add your location"}
                </p>
              </div>
              <div className={styles.profilePost}>
                <p>
                  {userDoc?.network ? userDoc.network.length : 0} Connections
                </p>
              </div>
              <button onClick={() => {
                // userDoc?.userType === "Mentor" ? navigate("/mentor-edit-profile") :
                 navigate("/editprofile")
              }}>
                Edit Profile
              </button>
            </div>
          </div>
          {
            userDoc?.userType === "Mentor" ?
          
          <div className={styles.profileContent}>
            <div className={styles.apointment}>
              <p>Appointment</p>
              <p>{userDoc?.apointmentRate ? userDoc.apointmentRate : "Set your Hourly Cost"}</p>
              <p>{userDoc?.apointmentRateinfo ? userDoc.apointmentRateinfo : "Half-Hourly sessions + Free Introductory sessions"}</p>
            </div>
            <div className={styles.appointmentcategory}>
            {userDoc?.domain ?
              userDoc?.domain?.map((item,idx)=>(
                <div key={idx} className={styles.appointmentcapsules}>
                  <p>{item}</p>
                </div>
              )) : <></>
             }
             
            </div>
          </div>
          : <></>
}
          <div className={styles.profileContent}>
            <div className={styles.aboutMe}>
              <p>About Me</p>
              <p>{userDoc?.about ? userDoc.about : "Add your Bio"}</p>
            </div>
            <div className={styles.aboutMe}>
              <p>Current Designation</p>
              <p>{userDoc?.designation ? userDoc.designation : "Add your designation"}</p>
            </div>
            <div className={styles.connect}>
              <p>How can we connect?</p>
              <div style={{ flexDirection: "column" }}>
                {userDoc?.Vibe_Data?.How_To_Meet
                  ? userDoc.Vibe_Data.How_To_Meet.map((item) => {
                      return (
                        <button style={{ marginRight: "25px" }}>{item}</button>
                      );
                    })
                  : "Update your How to connect"}
              </div>
            </div>
          </div>
          <div className={styles.profileEducation}>
            <div className={styles.education}>
              <p>Education</p>
              <div className={styles.educationInfo}>
                <ul>
                  {userDoc?.education ? (
                    userDoc.education.map((item) => {
                      return (
                        <li>
                          {item.degree ? item.degree : null},{" "}
                          {item.institute ? item.institute : null}{" "}
                          {item.year ? item.year : null}
                        </li>
                      );
                    })
                  ) : (
                    <li>Add your Education</li>
                  )}
                </ul>
              </div>
            </div>
            <div className={styles.experience}>
              <p>My Work Experience</p>
              <div className={styles.educationInfo}>
                <ul>
                  {userDoc?.experience ? (
                    userDoc.experience.map((item) => {
                      return (
                        <li>
                          {item.designation ? item.designation : null} at{" "}
                          {item.company ? item.company : null}{" "}
                          <span style={{ fontSize: "14px", color: "gray" }}>
                            {item.tenure ? item.tenure : null}
                          </span>
                        </li>
                      );
                    })
                  ) : (
                    <li>Add your Experience</li>
                  )}
                </ul>
              </div>
            </div>
            <div className={styles.experienceConnect}>
              <p>I am here for</p>
              <div className={styles.experienceBtn}>
                {userDoc?.here_for
                  ? userDoc.here_for.map((item) => {
                      return (
                        <button style={{ marginRight: "25px" }}>{item}</button>
                      );
                    })
                  : "Update your How for"}
              </div>
            </div>
          </div>
          <div className={styles.profileContact}>
            <div className={styles.contact}>
              <p>Social Handles</p>
              <div className={styles.contactItem}>
                <img src="/images/skill-icons_linkedin.svg" alt="Linkedin" />
                <p>
                  {userDoc?.linkedin ? userDoc.linkedin : "Add your linkedin"}
                </p>
              </div>
              <div className={styles.contactItem}>
                <img src="/images/fbIcon.png" alt="fb" />
                <p>
                  {userDoc?.facebook ? userDoc.facebook : "Add your facebook"}
                </p>
              </div>
              <div className={styles.contactItem}>
                <img src="/images/twitter.svg" alt="Linkedin" />
                <p>
                  {userDoc?.twitter ? userDoc.twitter : "Add your twitter"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileTesting;
