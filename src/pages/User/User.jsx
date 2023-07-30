import React, { useEffect, useState } from "react";
import styles from "./User.module.css";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import {
  db,
  createNetworkInMessagesDoc,
  createMentorInMessagesDoc,
} from "../../firebase";
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

  // console.log("currentLoggedInUser", currentLoggedInUser);
  // console.log("currentLoggedInUserDoc", currentLoggedInUserDoc);
  // console.log("otherUserDoc", otherUserDoc);

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
    // Obtain the Firestore reference for the current logged-in user
    const currentLoggedInUserDocumentRef = doc(
      db,
      "Users",
      currentLoggedInUser?.user?.email
    );

    try {
      // Get the current logged-in user's document from Firestore
      const currentLoggedInUserSnapshot = await getDoc(
        currentLoggedInUserDocumentRef
      );

      // Check if the document exists and get the data
      const currentLoggedInUserData = currentLoggedInUserSnapshot.data();
      let currentLoggedInUserSendRequestArray = [];

      // Check if the sendRequests field exists in the currentLoggedInUserData
      if (currentLoggedInUserData && currentLoggedInUserData.sendRequests) {
        currentLoggedInUserSendRequestArray =
          currentLoggedInUserData.sendRequests;
      } else {
        // If the sendRequests field does not exist, create it with an empty array
        await updateDoc(currentLoggedInUserDocumentRef, {
          sendRequests: [],
        });
      }

      // Add or remove the otherUserDoc.email from the currentLoggedInUserSendRequestArray
      if (!currentLoggedInUserSendRequestArray.includes(otherUserDoc.email)) {
        currentLoggedInUserSendRequestArray.push(otherUserDoc.email);
      } else {
        currentLoggedInUserSendRequestArray =
          currentLoggedInUserSendRequestArray.filter(
            (item) => item !== otherUserDoc.email
          );
      }

      // Update the sendRequests field with the updated currentLoggedInUserSendRequestArray
      await updateDoc(currentLoggedInUserDocumentRef, {
        sendRequests: currentLoggedInUserSendRequestArray,
      });

      // Update the local state with the new sendRequests array
      const updatedCurrentLoggedInUserData = {
        ...currentLoggedInUserData,
        sendRequests: currentLoggedInUserSendRequestArray,
      };

      dispatch(setUserDoc(updatedCurrentLoggedInUserData));
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
    toast("Processing Your Request");

    try {
      const userDocumentRef = doc(db, "Users", otherUserDoc.email);
      const userDocSnapshot = await getDoc(userDocumentRef);
      let userRequestArray = [];

      if (userDocSnapshot.exists()) {
        const otherUserData = userDocSnapshot.data();
        if (otherUserData.receivedRequests) {
          // If receivedRequests field exists, use it
          userRequestArray = otherUserData.receivedRequests;
        } else {
          // If receivedRequests field does not exist, create it
          await updateDoc(userDocumentRef, { receivedRequests: [] });
        }

        // Add the currentLoggedInUser's email to the userRequestArray
        if (!userRequestArray.includes(currentLoggedInUser?.user?.email)) {
          userRequestArray.push(currentLoggedInUser?.user?.email);
        }

        // Update the receivedRequests field with the updated userRequestArray
        await updateDoc(userDocumentRef, {
          receivedRequests: userRequestArray,
        });
        updateUserSendRequestArray();
        toast.success("Follow Request Sent");
      }

      //---------------------- Send Follow Notification----------------------------------
      const notificationData = {
        time: new Date(),
        message: `${currentLoggedInUser?.user?.email} Requested To Follow You`,
        user: currentLoggedInUser?.user?.email,
        type: "Follow-Notification",
      };

      if (userDocSnapshot.exists()) {
        const existingNotifications =
          userDocSnapshot.data().notificationList || [];
        await updateDoc(userDocumentRef, {
          notificationList: [...existingNotifications, notificationData],
        });
      }
    } catch (error) {
      toast(error.message);
    }
  };

  //HANDLE STOP FOLLOW REQUEST CLICK
  // update the received request array of the user whose profile is clicked to revoke the request
  const handleStopFollowRequestClick = async () => {
    setIsLoading(true);
    toast("Processing Your Request");
    const userRequestArray = otherUserDoc.receivedRequests.filter((item) => {
      return item !== currentLoggedInUser?.user?.email;
    });
    const userDocumentRef = doc(db, "Users", otherUserDoc.email);
    try {
      await updateDoc(userDocumentRef, { receivedRequests: userRequestArray });

      // setPostsAuthorInfo((prev) => {
      //   return { ...prev, receivedRequests: userRequestArray };
      // });
      updateUserSendRequestArray();
      toast.success("Follow Request Revoked ");
    } catch (error) {
      toast(error.message);
    }
  };

  // HANDLE ACCEPT FOLLOW REQUEST CLICK
  // Accept a follow request from another user
  const handleAcceptFollowRequestClick = async () => {
    setIsLoading(true);
    toast("Processing Your Request");

    // Add the user who sent the follow request to the logged-in user's network array
    const updatedNetworkArrayOfCurrentLoggedInUser = [
      ...(currentLoggedInUserDoc.network || []), // Use existing network array or an empty array if it's not present
      otherUserDoc.email,
    ];

    // update the other users network array
    const updatedNetworkArrayOfOtherUser = [
      ...(otherUserDoc.network || []), // Use existing network array or an empty array if it's not present
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
      // Check if the 'network' field exists in the current logged-in user's document
      const currentLoggedInUserSnapshot = await getDoc(
        currentLoggedInUserDocumentRef
      );
      if (
        !currentLoggedInUserSnapshot.exists() ||
        !currentLoggedInUserSnapshot.data().network
      ) {
        // If 'network' field doesn't exist, create it first
        await setDoc(
          currentLoggedInUserDocumentRef,
          { network: [] },
          { merge: true }
        );
      }

      // Check if the 'network' field exists in the other user's document
      const otherUserSnapshot = await getDoc(otherUserDocumentRef);
      if (!otherUserSnapshot.exists() || !otherUserSnapshot.data().network) {
        // If 'network' field doesn't exist, create it first
        await setDoc(otherUserDocumentRef, { network: [] }, { merge: true });
      }

      // Now, perform the updates on the 'network' fields
      await updateDoc(currentLoggedInUserDocumentRef, {
        network: updatedNetworkArrayOfCurrentLoggedInUser,
        receivedRequests: updatedReceivedRequestsArrayOfCurrentLoggedInUser,
      });

      await updateDoc(otherUserDocumentRef, {
        network: updatedNetworkArrayOfOtherUser,
        sendRequests: otherUserSendRequestArray,
      });

      dispatch(
        setUserDoc({
          ...currentLoggedInUserDoc,
          network: updatedNetworkArrayOfCurrentLoggedInUser,
          receivedRequests: updatedReceivedRequestsArrayOfCurrentLoggedInUser,
        })
      );
      setUiShouldRender((prev) => !prev);
      toast.success("Follow Request Accepted");
      // -------------------------Send Accepted Notification-------------------------
      const notificationData = {
        time: new Date(),
        message: `${otherUserDoc?.email} Accepted Your Follow Request`,
        user: otherUserDoc?.email,
        type: "Follow-Accepted-Notification",
      };
      // console.log("notificationData", notificationData);
      const userDocSnapshot = await getDoc(otherUserDocumentRef);

      if (userDocSnapshot.exists()) {
        const existingNotifications =
          userDocSnapshot.data().notificationList || [];
        await updateDoc(otherUserDocumentRef, {
          notificationList: [...existingNotifications, notificationData],
        });
      }
      // -----------------------------------------------------------------------------

      //------------ Create respective Docs for sending and receiving messages ------------------
      const currentUserType = currentLoggedInUserDoc?.userType ?? "not_mentor";
      const otherUserType = otherUserDoc?.userType ?? "not_mentor";   // in case userType is not present in the doc, set it to "not_mentor"

      if (
        (currentUserType === "mentor" && otherUserType === "mentor") ||
        (currentUserType !== "mentor" && otherUserType !== "mentor")
      ) {
        await createNetworkInMessagesDoc(
          currentLoggedInUserDoc?.email,
          otherUserDoc?.email
        );
      } else {
        if (currentUserType === "mentor") {
          await createMentorInMessagesDoc(
            otherUserDoc?.email,
            currentLoggedInUserDoc?.email
          );
        } else {
          await createMentorInMessagesDoc(
            currentLoggedInUserDoc?.email,
            otherUserDoc?.email
          );
        }
      }
      //---------------------------------------------------------------------------------------

      setIsLoading(false);
    } catch (error) {
      toast(error.message);
    }
  };

  // HANDLE REJECT FOLLOW REQUEST CLICK
  // Reject a follow request of another user
  const handleRejectFollowRequestClick = async () => {
    setIsLoading(true);
    toast("Processing Your Request");

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

      dispatch(
        setUserDoc({
          ...currentLoggedInUserDoc,
          receivedRequests: updatedReceivedRequestsArrayOfCurrentLoggedInUser,
        })
      );
      setUiShouldRender((prev) => !prev);
      toast.success("Follow Request Rejected");
      setIsLoading(false);
    } catch (error) {
      toast(error.message);
    }
  };

  // HANDLE UNFOLLOW CLICK
  // Remove the connection between the logged-in user and the other user
  const handleUnfollowClick = async () => {
    setIsLoading(true);
    toast("Processing Your Request");

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

      dispatch(
        setUserDoc({
          ...currentLoggedInUserDoc,
          network: updatedNetworkArrayForLoggedInUser,
        })
      );
      setUiShouldRender((prev) => !prev);
      toast("Unfollowed Successfully");
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
                alt="ProfileImage"
              />
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileUserIcon}>
                {/* <img
                  src="/images/fluent_call-24-regular.svg"
                  alt="Call"
                  onClick={() => {
                    navigator.clipboard.writeText(otherUserDoc.phone);
                    toast.success("Phone Number Copied");
                  }}
                /> */}
                {otherUserDoc?.email ? (
                  <>
                    <img
                      src="/images/logos_google-gmail.svg"
                      alt="Email"
                      onClick={() => {
                        navigator.clipboard.writeText(otherUserDoc?.email);
                        toast.success("Email copied to clipboard");
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </>
                ) : null}

                {otherUserDoc?.linkedin || otherUserDoc?.linlkedin ? (
                  <>
                    <img
                      src="/images/skill-icons_linkedin.svg"
                      alt="Linkedin"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          otherUserDoc?.linkedin || otherUserDoc?.linlkedin
                        );
                        toast.success("Linkedin profile copied to clipboard");
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </>
                ) : null}
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
                    : "No designation Added"}
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
                      : "country"
                    : "location"}
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
          {otherUserDoc?.userType === "Mentor" ? (
            <div className={styles.profileContent}>
              <div className={styles.apointment}>
                <p>Appointment</p>
                <p>
                  {otherUserDoc?.plans
                    ? `₹${otherUserDoc.plans[0]}/Hour`
                    : "Hourly Cost"}
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
          ) : (
            <></>
          )}
          <div className={styles.profileContent}>
            {otherUserDoc?.about && (
              <div className={styles.aboutMe}>
                <p>About Me</p>
                <p>
                  {otherUserDoc?.about ? otherUserDoc.about : "Add your Bio"}
                </p>
              </div>
            )}

            {otherUserDoc?.designation && (
              <div className={styles.aboutMe}>
                <p>Current Designation</p>
                <p>
                  {otherUserDoc?.designation
                    ? otherUserDoc.designation
                    : "No Designation Added"}
                </p>
              </div>
            )}

            {otherUserDoc?.Vibe_Data && (
              <div className={styles.connect}>
                <p>How can we connect?</p>
                <div style={{ flexDirection: "column" }}>
                  {otherUserDoc?.Vibe_Data?.How_To_Meet
                    ? otherUserDoc.Vibe_Data.How_To_Meet.map((item) => {
                        return (
                          <button style={{ marginRight: "25px" }}>
                            {item}
                          </button>
                        );
                      })
                    : "How to connect not upadted"}
                </div>
              </div>
            )}
          </div>
          <div className={styles.profileEducation}>
            {otherUserDoc?.education && (
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
                      <li>No Education Added</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {otherUserDoc?.experience && (
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
                      <li>No Experience Added</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {otherUserDoc?.Vibe_Data && (
              <div className={styles.experienceConnect}>
                <p>I am here to </p>
                <div className={styles.experienceBtn}>
                  {otherUserDoc?.Vibe_Data?.Here_for
                    ? otherUserDoc.Vibe_Data.Here_for.map((item) => {
                        return (
                          <button style={{ marginRight: "25px" }}>
                            {item}
                          </button>
                        );
                      })
                    : "No i am here to added"}
                </div>
              </div>
            )}
          </div>
          <div className={styles.profileContact}>
            <div className={styles.contact}>
              <p>Social Handles</p>
              {otherUserDoc?.linlkedin && (
                <div className={styles.contactItem}>
                  <img src="/images/skill-icons_linkedin.svg" alt="Linkedin" />
                  <p>{otherUserDoc?.linlkedin}</p>
                </div>
              )}
              {otherUserDoc?.facebook && (
                <div className={styles.contactItem}>
                  <img src="/images/fbIcon.png" alt="Linkedin" />
                  <p>{otherUserDoc?.facebook}</p>
                </div>
              )}
              {otherUserDoc?.twitter && (
                <div className={styles.contactItem}>
                  <img src="/images/twitter.svg" alt="Linkedin" />
                  <p>{otherUserDoc?.twitter}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
