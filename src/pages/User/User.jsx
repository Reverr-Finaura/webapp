import React, { useEffect, useState } from "react";
import styles from "./User.module.css";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import { collection, getDocs, query, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserDoc } from "../../features/userDocSlice";
import { setUserFundingDoc } from "../../features/userFundingDocSlice";
import DefaultDP from "../../images/Defaultdp.png";
// import toast, { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentLoggedInUser = useSelector((state) => state.user);
  const [otherUserDoc, setOtherUserDoc] = useState();
  const [currentLoggedInUserDoc, setCurrentLoggedInUserDoc] = useState();
  //   const [userDoc,setUserDoc]=useState([])
  const userFundingDoc = useSelector((state) => state.userFundingDoc);
  const [hasUserProfile, setHasUserProfile] = useState(true);
  const [userDocId, setUserDocId] = useState([]);
  const [uiShouldRender, setUiShouldRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("currentLoggedInUser", currentLoggedInUser);
  console.log("currentLoggedInUserDoc", currentLoggedInUserDoc);
  console.log("otherUserDoc", otherUserDoc);

  // CHECK FOR USER DOC DATA
  useEffect(() => {
    async function fetchUserDocFromFirebase() {
      const userDataRef = collection(db, "Users");
      const q = query(userDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // setUserDocId((prev) => {
        //   return [...prev, doc.id];
        // });
        if (doc.id === id) {
          //   dispatch(setUserDoc(doc.data()));
          setOtherUserDoc(doc.data());
        } else if (doc.id === currentLoggedInUser?.user?.email) {
          setCurrentLoggedInUserDoc(doc.data());
          // console.log("set doc", doc.data());
        }
      });
    }
    fetchUserDocFromFirebase();
  }, [id, currentLoggedInUser, uiShouldRender]);

  // CHECK IF USER HAS FUNDING PROFILE
  useEffect(() => {
    if (otherUserDoc?.hasFundingProfile === "No") {
      return;
    }
    async function fetchUserFundingDocFromFirebase() {
      const userFundingDataRef = collection(db, "Funding");
      const q = query(userFundingDataRef);
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          dispatch(setUserFundingDoc(doc.data()));
        }
      });
    }
    fetchUserFundingDocFromFirebase();
  }, [otherUserDoc]);

  useEffect(() => {
    if (id && otherUserDoc) {
      if (otherUserDoc?.hasGeneralProfile === true) {
        setHasUserProfile(true);
        return;
      } else if (otherUserDoc?.hasGeneralProfile === false) {
        setHasUserProfile(false);
      }
    }
  }, [otherUserDoc]);

  //UPDATE LOGGEDIN USER FOLLOW REQUEST ARRAY
  // update the send request array of the logged in user
  const updateUserSendRequestArray = async () => {
    // userDoc is for the other user to whom the request is being sent
    let currentLoggedInUserRequestArray;

    if (!currentLoggedInUserDoc.sendRequests.includes(otherUserDoc.email)) {
      currentLoggedInUserRequestArray = [
        ...currentLoggedInUserDoc.sendRequests,
        otherUserDoc.email,
      ];
      // console.log("not included", currentLoggedInUserRequestArray);
    } else {
      currentLoggedInUserRequestArray =
        currentLoggedInUserDoc.sendRequests.filter((item) => {
          return item !== otherUserDoc.email;
        });
      // console.log("included", currentLoggedInUserRequestArray);
    }
    const currentLoggedInUserDocumentRef = doc(
      db,
      "Users",
      currentLoggedInUser?.user?.email
    );
    const updatedCurrentLoggedInUserDoc = {
      ...currentLoggedInUserDoc,
      sendRequests: currentLoggedInUserRequestArray,
    };

    try {
      await updateDoc(currentLoggedInUserDocumentRef, {
        sendRequests: currentLoggedInUserRequestArray,
      });
      dispatch(setUserDoc(updatedCurrentLoggedInUserDoc));
      setUiShouldRender((prev) => !prev);
      setIsLoading(false);
    } catch (error) {
      toast(error.message);
    }
  };

  //HANDLE FOLLOW REQUEST CLICK
  // update the received request array of the user whose profile is clicked
  const handleFollowUserClick = async () => {
    setIsLoading(true);
    // const userRequestArray = postsAuthorInfo.receivedRequests
    // here userRequestArray is for the user to whom the request is being sent
    const userRequestArray = otherUserDoc.receivedRequests.includes(
      currentLoggedInUser?.user?.email
    )
      ? otherUserDoc.receivedRequests
      : // : userDoc.recivedRequests.push(currentLoggedInUser?.user?.email);
        [...otherUserDoc.receivedRequests, currentLoggedInUser?.user?.email];

    const userDocumentRef = doc(db, "Users", otherUserDoc.email);
    console.log("userDocumentRef", userDocumentRef);

    try {
      await updateDoc(userDocumentRef, { receivedRequests: userRequestArray });

      toast("Follow Request Send ");
      // setPostsAuthorInfo((prev) => {
      //   return { ...prev, receivedRequests: userRequestArray };
      // });
      updateUserSendRequestArray();
    } catch (error) {
      toast(error.message);
    }
  };

  //HANDLE STOP FOLLOW REQUEST CLICK
  // update the received request array of the user whose profile is clicked to revoke the request
  const handleStopFollowRequestClick = async () => {
    setIsLoading(true);
    const userRequestArray = otherUserDoc.receivedRequests.filter((item) => {
      return item !== currentLoggedInUser?.user?.email;
    });
    const userDocumentRef = doc(db, "Users", otherUserDoc.email);
    try {
      await updateDoc(userDocumentRef, { receivedRequests: userRequestArray });

      toast("Follow Request Revoked ");
      // setPostsAuthorInfo((prev) => {
      //   return { ...prev, receivedRequests: userRequestArray };
      // });
      updateUserSendRequestArray();
    } catch (error) {
      toast(error.message);
    }
  };

  // HANDLE ACCEPT FOLLOW REQUEST CLICK
  // Accept a follow request from another user
  const handleAcceptFollowRequestClick = async () => {
    setIsLoading(true);

    // Add the user who sent the follow request to the logged-in user's network array
    const updatedNetworkArrayOfCurrentLoggedInUser = [
      ...currentLoggedInUserDoc.network,
      otherUserDoc.email,
    ];

    // update the other users network array
    const updatedNetworkArrayOfOtherUser = [
      ...otherUserDoc.network,
      currentLoggedInUser?.user?.email,
    ];

    // Remove the user who sent the follow request from the logged-in user's received requests array
    const updatedReceivedRequestsArrayOfCurrentLoggedInUser =
      currentLoggedInUserDoc.receivedRequests.filter(
        (item) => item !== otherUserDoc.email
      );

    // Update the other user's send requests array to remove the logged-in user's email
    const otherUserSendRequestArray = otherUserDoc.sendRequests.filter(
      (item) => item !== currentLoggedInUser?.user?.email
    );

    const currentLoggedInUserDocumentRef = doc(
      db,
      "Users",
      currentLoggedInUser?.user?.email
    );
    const otherUserDocumentRef = doc(db, "Users", otherUserDoc.email);

    try {
      await updateDoc(currentLoggedInUserDocumentRef, {
        network: updatedNetworkArrayOfCurrentLoggedInUser,
        receivedRequests: updatedReceivedRequestsArrayOfCurrentLoggedInUser,
      });

      await updateDoc(otherUserDocumentRef, {
        network: updatedNetworkArrayOfOtherUser,
        sendRequests: otherUserSendRequestArray,
      });

      toast("Follow Request Accepted");
      dispatch(
        setUserDoc({
          ...currentLoggedInUserDoc,
          network: updatedNetworkArrayOfCurrentLoggedInUser,
          receivedRequests: updatedReceivedRequestsArrayOfCurrentLoggedInUser,
        })
      );
      setUiShouldRender((prev) => !prev);
      setIsLoading(false);
    } catch (error) {
      toast(error.message);
    }
  };

  // HANDLE REJECT FOLLOW REQUEST CLICK
  // Reject a follow request of another user
  const handleRejectFollowRequestClick = async () => {
    setIsLoading(true);

    // Remove the user who sent the follow request from the logged-in user's received requests array
    const updatedReceivedRequestsArrayOfCurrentLoggedInUser =
      currentLoggedInUserDoc.receivedRequests.filter(
        (item) => item !== otherUserDoc.email
      );

    // Update the other user's send requests array to remove the logged-in user's email
    const otherUserSendRequestArray = otherUserDoc.sendRequests.filter(
      (item) => item !== currentLoggedInUser?.user?.email
    );

    const currentLoggedInUserDocumentRef = doc(
      db,
      "Users",
      currentLoggedInUser?.user?.email
    );
    const otherUserDocumentRef = doc(db, "Users", otherUserDoc.email);

    try {
      await updateDoc(currentLoggedInUserDocumentRef, {
        receivedRequests: updatedReceivedRequestsArrayOfCurrentLoggedInUser,
      });

      await updateDoc(otherUserDocumentRef, {
        sendRequests: otherUserSendRequestArray,
      });

      toast("Follow Request Rejected");
      dispatch(
        setUserDoc({
          ...currentLoggedInUserDoc,
          receivedRequests: updatedReceivedRequestsArrayOfCurrentLoggedInUser,
        })
      );
      setUiShouldRender((prev) => !prev);
      setIsLoading(false);
    } catch (error) {
      toast(error.message);
    }
  };

  // HANDLE UNFOLLOW CLICK
  // Remove the connection between the logged-in user and the other user
  const handleUnfollowClick = async () => {
    setIsLoading(true);

    // Remove the other user from the logged-in user's network array
    const updatedNetworkArrayForLoggedInUser =
      currentLoggedInUserDoc.network.filter(
        (item) => item !== otherUserDoc.email
      );

    // Remove the logged-in user from the other user's network array
    const updatedOtherUserNetworkArray = otherUserDoc.network.filter(
      (item) => item !== currentLoggedInUser?.user?.email
    );

    const currentLoggedInUserDocumentRef = doc(
      db,
      "Users",
      currentLoggedInUser?.user?.email
    );
    const otherUserDocumentRef = doc(db, "Users", otherUserDoc.email);

    try {
      await updateDoc(currentLoggedInUserDocumentRef, {
        network: updatedNetworkArrayForLoggedInUser,
      });

      await updateDoc(otherUserDocumentRef, {
        network: updatedOtherUserNetworkArray,
      });

      toast("Unfollowed");
      dispatch(
        setUserDoc({
          ...currentLoggedInUserDoc,
          network: updatedNetworkArrayForLoggedInUser,
        })
      );
      setUiShouldRender((prev) => !prev);
      setIsLoading(false);
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <>
      {/* <Toaster position="bottom-left" /> */}
      <NavBarFinalDarkMode />
      <div className={styles.profileWrapper}>
        <div className={styles.profileContainer}>
          <div
            className={styles.profileHeader}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src="/images/profileArrowLeft.svg" alt="back" />
            <p>User Profile</p>
          </div>
          <div className={styles.profileUser}>
            <div className={styles.profileBackground}></div>
            <div className={styles.profileImage}>
              {/* <img src="/images/UserProfileTest.png" alt="Linkedin" /> */}
              <img
                src={
                  otherUserDoc?.image && otherUserDoc?.image !== ""
                    ? otherUserDoc.image
                    : DefaultDP
                }
                alt="Linkedin"
              />
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileUserIcon}>
                <img
                  src="/images/fluent_call-24-regular.svg"
                  alt="Call"
                  onClick={() => {
                    navigator.clipboard.writeText(otherUserDoc.phone);
                    toast.success("Phone Number Copied");
                  }}
                />
                <img
                  src="/images/logos_google-gmail.svg"
                  alt="Gmail"
                  onClick={() => {
                    navigator.clipboard.writeText(otherUserDoc.email);
                    toast.success("Email Copied");
                  }}
                />
                <img
                  src="/images/skill-icons_linkedin.svg"
                  alt="Linkedin"
                  onClick={() => {
                    navigator.clipboard.writeText(otherUserDoc.linkedin);
                    toast.success("Linkedin Copied");
                  }}
                />
              </div>
              <div className={styles.profileInfoName}>
                <p style={{ textTransform: "capitalize" }}>
                  {otherUserDoc?.name}
                </p>
              </div>
              <div className={styles.profileDesignation}>
                <p>
                  {otherUserDoc?.designation
                    ? otherUserDoc.designation
                    : "Add your Designation"}
                </p>
              </div>
              <div className={styles.profileLocation}>
                <img
                  src="/images/basil_location-outline.svg"
                  alt="ProfileImage"
                />
                <p>
                  {otherUserDoc?.state
                    ? otherUserDoc.country
                      ? otherUserDoc.state + ", " + otherUserDoc.country
                      : "Add your country"
                    : "Add your location"}
                </p>
              </div>
              <div className={styles.profilePost}>
                <p>
                  {otherUserDoc?.network ? otherUserDoc.network.length : 0}{" "}
                  Connections
                </p>
              </div>
              {/* <button>Add Connection</button> */}
              {otherUserDoc?.email !== currentLoggedInUser?.user?.email &&
              !otherUserDoc?.receivedRequests?.includes(
                currentLoggedInUser?.user?.email
              ) &&
              !otherUserDoc?.network?.includes(
                currentLoggedInUser?.user?.email
              ) &&
              !currentLoggedInUserDoc?.receivedRequests?.includes(
                otherUserDoc?.email
              ) ? (
                <button
                  onClick={handleFollowUserClick}
                  style={{
                    cursor: isLoading ? "default" : "",
                    color: isLoading ? "gray" : "#10b7ff",
                  }}
                  disabled={isLoading}
                  // className={styles.followButton}
                >
                  Follow
                </button>
              ) : null}
              {otherUserDoc?.email !== currentLoggedInUser?.user?.email &&
              otherUserDoc?.receivedRequests?.includes(
                currentLoggedInUser?.user?.email
              ) ? (
                <button
                  onClick={handleStopFollowRequestClick}
                  style={{
                    cursor: isLoading ? "default" : "",
                    color: isLoading ? "gray" : "#10b7ff",
                  }}
                  disabled={isLoading}
                  // className={styles.followButton}
                >
                  Cancel Request
                </button>
              ) : null}
              <div style={{ display: "flex", flexDirection: "row" }}>
                {otherUserDoc?.email !== currentLoggedInUser?.user?.email &&
                currentLoggedInUserDoc?.receivedRequests?.includes(
                  otherUserDoc?.email
                ) ? (
                  <button
                    onClick={handleAcceptFollowRequestClick}
                    style={{
                      cursor: isLoading ? "default" : "",
                      color: isLoading ? "gray" : "#10b7ff",
                    }}
                    disabled={isLoading}
                  >
                    Accept Request
                  </button>
                ) : null}
                {otherUserDoc?.email !== currentLoggedInUser?.user?.email &&
                currentLoggedInUserDoc?.receivedRequests?.includes(
                  otherUserDoc?.email
                ) ? (
                  <button
                    onClick={handleRejectFollowRequestClick}
                    style={{
                      cursor: isLoading ? "default" : "",
                      color: isLoading ? "gray" : "#10b7ff",
                      marginLeft: "20px",
                    }}
                    disabled={isLoading}
                  >
                    Reject Request
                  </button>
                ) : null}
              </div>

              {otherUserDoc?.email !== currentLoggedInUser?.user?.email &&
              currentLoggedInUserDoc?.network?.includes(otherUserDoc?.email) &&
              otherUserDoc?.network?.includes(
                currentLoggedInUser?.user?.email
              ) ? (
                <button
                  onClick={handleUnfollowClick}
                  style={{
                    cursor: isLoading ? "default" : "",
                    color: isLoading ? "gray" : "#10b7ff",
                  }}
                  disabled={isLoading}
                >
                  Unfollow
                </button>
              ) : null}
            </div>
          </div>
          <div className={styles.profileContent}>
            <div className={styles.apointment}>
              <p>Appointment</p>
              <p>
                {otherUserDoc?.plans
                  ? `₹${otherUserDoc.plans[0]}/Hour`
                  : "Set your Hourly Cost"}
              </p>
              <p>
                {otherUserDoc?.apointmentRateinfo
                  ? otherUserDoc.apointmentRateinfo
                  : "Half-Hourly sessions + Free Introductory sessions"}
              </p>
            </div>
            <div className={styles.appointmentcategory}>
              {otherUserDoc?.domain ? (
                otherUserDoc?.domain?.map((item, idx) => (
                  <div key={idx} className={styles.appointmentcapsules}>
                    <p>{item}</p>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={styles.profileContent}>
            <div className={styles.aboutMe}>
              <p>About Me</p>
              <p>{otherUserDoc?.about ? otherUserDoc.about : "Add your Bio"}</p>
            </div>
            <div className={styles.aboutMe}>
              <p>Current Designation</p>
              <p>
                {otherUserDoc?.designation
                  ? otherUserDoc.designation
                  : "Add your designation"}
              </p>
            </div>
            <div className={styles.connect}>
              <p>How can we connect?</p>
              <div style={{ flexDirection: "column" }}>
                {otherUserDoc?.Vibe_Data?.How_To_Meet
                  ? otherUserDoc.Vibe_Data.How_To_Meet.map((item) => {
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
                  {otherUserDoc?.education ? (
                    otherUserDoc.education.map((item) => {
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
                  {otherUserDoc?.experience ? (
                    otherUserDoc.experience.map((item) => {
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
              <p>I am here </p>
              <div className={styles.experienceBtn}>
                {otherUserDoc?.Vibe_Data?.Here_for
                  ? otherUserDoc.Vibe_Data.Here_for.map((item) => {
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
                  {otherUserDoc?.linlkedin
                    ? otherUserDoc?.linlkedin
                    : "Add your linkedin"}
                </p>
              </div>
              <div className={styles.contactItem}>
                <img src="/images/fbIcon.png" alt="Linkedin" />
                <p>
                  {otherUserDoc?.linkedin
                    ? otherUserDoc.linkedin
                    : "Add your facebook"}
                </p>
              </div>
              <div className={styles.contactItem}>
                <img src="/images/twitter.svg" alt="Linkedin" />
                <p>
                  {otherUserDoc?.twitter
                    ? otherUserDoc.twitter
                    : "Add your twitter"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
