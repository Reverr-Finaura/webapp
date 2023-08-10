import styles from "./vibeMiddlePart.module.css";
import style from "../../Upgrade/Upgrade.module.css";
import filterIcon from "../../../images/filterIcon.svg";
// import userProfilePucture from "../../../images/userProfilePicture.svg";
import location from "../../../images/location.svg";
import videoCall from "../../../images/videocallimg.svg";
import phoneCall from "../../../images/phonecallimg.svg";
import atCoffee from "../../../images/atcoffeeimg.svg";
import phoneIcon from "../../../images/phoneMiniIcon.svg";
import emailIcon from "../../../images/emailMiniIcon.svg";
import linkedinIcon from "../../../images/linkedinMiniIcon.svg";
import twitterIcon from "../../../images/twitterMiniIcon.svg";
import declineIcon from "../../../images/declineIcon.svg";
import handShakeIcon from "../../../images/handshakeIcon.svg";
import acceptIcon from "../../../images/acceptIcon.svg";
import undoMoveIcon from "../../../images/undoMoveIcon.svg";
import FilterRedoPopUp from "../vibemiddleparta/FilterRedoPopUp";
import FilterPart from "../FilterPart/FilterPart";
import { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import defaultImg from "../../../images/default-profile-pic.webp";
import { toast } from "react-toastify";
import NoData from "./No Data Screen/NoData";
import Loading from "./LoadingScreen/Loading";
import LikesExhaust from "./LikesExhaustScreen/LikesExhaust";
import Upgrade from "../../Upgrade/Upgrade";

const VibeMiddlePart = () => {
  const [ispremium, setIsPremium] = useState(false);
  const [redo, SetRedo] = useState(false);
  const [frtext, setFRText] = useState("");
  const [filter, setFilter] = useState(false);
  const [userData, setUserData] = useState([]);
  const [premiumModalStatus , setPremiumModalStatus] = useState(false)
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [noMoreVibeData, setNoMoreVibeData] = useState(false);
  const [swipeLimit, setSwipeLimit] = useState({
    swipeRemaining: 10,
    swipeUpdateTime: null,
  });
  const [loadingSwipeData, setLoadingSwipeData] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLikesEXhaust, setIsLikesEXhaust] = useState(false);
  const currentLoggedInUser = useSelector((state) => state.user);
  const userDoc = useSelector((state) => state.userDoc);
  const howToMeetImages = {
    "Video Call": videoCall,
    "Phone Call": phoneCall,
    "At Coffee": atCoffee,
  };
  const [isFadedLeft, setIsFadedLeft] = useState(false);
  const [isFadedRight, setIsFadedRight] = useState(false);
  const [isFadedTop, setIsFadedTop] = useState(false);
  const [prevUserIndex, setPrevUserIndex] = useState();
  const [filterData,setfilterData]=useState({
    roles:"",
    spaces:[],
    cities:"",
    age:"",
    mode:""

})
const [modal,setModal]=useState(false);

const toggle=()=>{
  setModal(!modal);
}

  const getUserData = async () => {
    try {
      console.log("userDoc data fetch");
      const userRef = collection(db, "Users");
      const userquery = query(userRef);
      const usersnapshot = await getDocs(userquery);

      const userDocRef = doc(db, "Users", currentLoggedInUser?.user?.email)
      const userDocsnapshot = await getDoc(userDocRef);
      const userDocData = userDocsnapshot.data();

      const likedByCurrentUser = userDocData?.likes || [];
      console.log("likedByCurrentUser", likedByCurrentUser);
      const fleshedByCurrentUser = userDocData?.passed_email || [];
      console.log("fleshedByCurrentUser", fleshedByCurrentUser);
      const matchedUsers = userDocData?.matched_user || [];
      console.log("matchedUsers", matchedUsers);

      const filteredDocs = usersnapshot.docs.filter(
        (doc) =>
          doc.data().email !== currentLoggedInUser?.user?.email &&
          !likedByCurrentUser.includes(doc.data().email) &&
          !fleshedByCurrentUser.includes(doc.data().email) &&
          !matchedUsers.includes(doc.data().email) &&
          doc.data().vibeuser === "true"
      );
      console.log("filteredDocs", filteredDocs);
      const fetchedUserData = filteredDocs.map((doc) => doc.data());
      setNoMoreVibeData(fetchedUserData.length === 0);
      setUserData(fetchedUserData);
      setIsLoadingData(false)
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [currentLoggedInUser]);

  const handleLikeCkick = () => {
    // if the user has no swipe remaining and the update time is not reached yet
    // then show the toast message and return
    if (
      swipeLimit.swipeRemaining === 0 &&
      swipeLimit.swipeUpdateTime > new Date().getTime()
    ) {
      toast(
        `You have reached the limit. Please wait till ${new Date(
          swipeLimit.swipeUpdateTime
        ).toLocaleString()}`
      );
      setIsLikesEXhaust(true)
      return;
    }

    LikeUser(userData[currentUserIndex].email);
    setPrevUserIndex(currentUserIndex);
    setIsFadedRight(true);
    if (currentUserIndex < userData.length - 1) {
      // console.log(userData);
      setCurrentUserIndex(currentUserIndex + 1);
    }
    if (currentUserIndex >= userData.length - 1) {
      setNoMoreVibeData(true);
    }
    setTimeout(() => {
      setIsFadedRight(false);
    }, [500]);

    // LikeUser();
    handleSwipe();
  };

  const handleNopeCkick = () => {
    setIsFadedLeft(true);
    setPrevUserIndex(currentUserIndex);
    if (currentUserIndex < userData.length - 1) {
      // console.log(userData);
      setCurrentUserIndex(currentUserIndex + 1);
    }
    if (currentUserIndex >= userData.length - 1) {
      setNoMoreVibeData(true);
    }
    setTimeout(() => {
      setIsFadedLeft(false);
    }, 500);
    if(userData[currentUserIndex]){
      NopeUser(userData[currentUserIndex].email);
    }
  };

  // console.log(userDoc?.vibeuser);
  const CheckisPremium = () => {
    if (!ispremium) {
      return SetRedo(true);
    }
    // if (!userDoc?.vibeuser) {
    //   return SetRedo(true);
    // }
  };
  const CheckisPremiumFilter = () => {
    // if (!ispremium) {
    //   return setFilter(true);
    // }
    // add An ! before ispremium to make filter modal render
    if (ispremium) {
      return setFilter(true);
    }
    else{
      return setFilter(false),SetRedo(true)
     
    }
  };

  //---------------------Swipe Limit Code Start---------------------//
  useEffect(() => {
    // Fetch the initial swipeLimit data from Firebase or create it if not present
    const fetchSwipeLimit = async () => {
      const userEmail = currentLoggedInUser?.user?.email;
      if (!userEmail) {
        throw new Error("User email not available");
      }
      try {
        setLoadingSwipeData(true);
        const docRef = doc(db, "Users", userEmail);
        // console.log("docRef", docRef);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          // console.log("data", data);
          if (data.swipeLimit) {
            setSwipeLimit(data.swipeLimit);
            if(data.swipeLimit.swipeRemaining === 0){
              setIsLikesEXhaust(true)
            }else{
              setIsLikesEXhaust(false)
            }
          } else {
            // If swipeLimit field is not present, create it with initial values
            const updateTime = new Date().getTime() - 24 * 60 * 60 * 1000;
            // await setDoc(docRef, data, { merge: true });
            await setDoc(
              docRef,
              {
                swipeLimit: { swipeRemaining: 10, swipeUpdateTime: updateTime },
              },
              { merge: true }
            );
            setSwipeLimit({ swipeRemaining: 10, swipeUpdateTime: updateTime });
          }
        } else {
          console.log("No such document!");
        }

        setLoadingSwipeData(false);
      } catch (error) {
        console.error("Error fetching swipeLimit data:", error);
        setLoadingSwipeData(false);
      }
    };

    fetchSwipeLimit();
  }, [currentLoggedInUser]);

  const handleSwipe = async () => {
    // i have still some swipe remaining and the update time is not reached yet
    if (
      swipeLimit.swipeRemaining > 0 &&
      swipeLimit.swipeUpdateTime > new Date().getTime()
    ) {
      // User has remaining swipes, decrease swipeRemaining by 1
      const newSwipeRemaining = swipeLimit.swipeRemaining - 1;
      setSwipeLimit((prevState) => ({
        ...prevState,
        swipeRemaining: newSwipeRemaining,
      }));
      await updateSwipeLimit({
        swipeRemaining: newSwipeRemaining,
        swipeUpdateTime: swipeLimit.swipeUpdateTime,
      });
    } else {
      // If swipeUpdateTime is already passed, reset swipeRemaining to 10 and update swipeUpdateTime
      if (swipeLimit.swipeUpdateTime < new Date().getTime()) {
        console.log("it't time to reset");
        setSwipeLimit((prevState) => ({
          ...prevState,
          swipeRemaining: 10,
          swipeUpdateTime: new Date().getTime() + 24 * 60 * 60 * 1000,
        }));
        setIsLikesEXhaust(false)
        await updateSwipeLimit({
          swipeRemaining: 10,
          swipeUpdateTime: new Date().getTime() + 24 * 60 * 60 * 1000,
        });
      } else {
        console.log("wait for swipeUpdateTime");
      }
    }
  };

  const updateSwipeLimit = async (newSwipeLimit) => {
    const userEmail = currentLoggedInUser?.user?.email;
    if (!userEmail) {
      throw new Error("User email not available");
    }
    try {
      await updateDoc(doc(db, "Users", userEmail), {
        swipeLimit: newSwipeLimit,
      });
    } catch (error) {
      console.error("Error updating swipeLimit on Firebase:", error);
    }
  };
  //---------------------Swipe Limit Code End---------------------//

  const HandShakeUser = async (userEmail) => {
    console.log("HandShakeUser");
    userEmail = userData[currentUserIndex].email;
    console.log("userEmail", userEmail);
    const docRef = doc(db, "Users", userDoc?.email);
    const otherDocRef = doc(db, "Users", userEmail);
    try {
      const docSnap = await getDoc(docRef);
      const otherDocSnap = await getDoc(otherDocRef);

      if (docSnap.exists()) {
        let superlikes;

        if (!docSnap.data().superlikes) {
          superlikes = [];
        } else {
          superlikes = docSnap.data().superlikes;
        }

        await updateDoc(docRef, {
          superlikes: [...superlikes, userEmail],
        });
      }

      if (otherDocSnap.exists()) {
        let superliked_by;

        if (!otherDocSnap.data().superliked_by) {
          superliked_by = [];
        } else {
          superliked_by = otherDocSnap.data().superliked_by;
        }

        await updateDoc(otherDocRef, {
          superliked_by: [...superliked_by, userDoc?.email],
        });
      } else {
        console.log("No such document!");
      }
      setPrevUserIndex(currentUserIndex);
      setIsFadedTop(true);
     
      if (currentUserIndex < userData.length - 1) {
        // console.log(userData);
        setCurrentUserIndex(currentUserIndex + 1);
      }
      setTimeout(() => {
        setIsFadedTop(false);
      }, [500]);

      // LikeUser();
      handleSwipe();
      FlushUser(userEmail);
    } catch (e) {
      console.log("Error getting document:", e);
    }
  };

  const NopeUser = async (userEmail) => {
  await FlushUser(userEmail);
  };

  const LikeUser = async (userEmail) => {
    const docRef = doc(db, "Users", userDoc?.email);
    const otherDocRef = doc(db, "Users", userEmail);

    try {
      const docSnap = await getDoc(docRef);
      const otherDocSnap = await getDoc(otherDocRef);

      if (otherDocSnap.exists()) {
        let liked_by;
        let likes;

        likes = otherDocSnap.data()?.likes || [];
        liked_by = otherDocSnap.data()?.liked_by || [];

        if (!likes.includes(userDoc?.email)) {
          await updateDoc(otherDocRef, {
            liked_by: [...liked_by, userDoc?.email],
          });
        } else {
          console.log("Already liked by this user");
          // Delete the user from the likedby array
          likes = likes.filter((email) => email !== userDoc?.email);
          await updateDoc(otherDocRef, {
            likes: [...likes],
          });
          let other_matched_user = otherDocSnap.data()?.matched_user || [];
          await updateDoc(otherDocRef, {
            matched_user: [...other_matched_user, userDoc?.email],
          });
        }
      } else {
        console.log("No such document!");
      }

      if (docSnap.exists()) {
        let likes;
        let liked_by;

        likes = docSnap.data()?.likes || [];
        liked_by = docSnap.data()?.liked_by || [];

        console.log("liked_by", liked_by);

        if (!liked_by.includes(userEmail)) {
          await updateDoc(docRef, {
            likes: [...likes, userEmail],
          });
        } else {
          console.log("Already liked this user");
          // Delete the user from the likedby array
          liked_by = liked_by.filter((email) => email !== userEmail);
          await updateDoc(docRef, {
            liked_by: liked_by,
          });
          let matched_user = docSnap.data()?.matched_user || [];
          await updateDoc(docRef, {
            matched_user: [...matched_user, userEmail],
          });
        }
      }

      FlushUser(userEmail);
    } catch (e) {
      console.log("Error getting document:", e);
    }
  };

  const FlushUser = async (email) => {
    const docRef = doc(db, "Users", currentLoggedInUser?.user?.email);
    try {
      const docSnap = await getDoc(docRef);
      console.log("HIIIIII");
      let passed_email;

      if (!docSnap.data().passed_email) {
        passed_email = [];
      } else {
        passed_email = docSnap.data().passed_email;
      }

      if (!passed_email.includes(email)) {
        await updateDoc(docRef, {
          passed_email: [...passed_email, email],
        });
      }

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.log("Error getting document:", e);
    }
    // const userDocument = await getDoc(userDocumentRef);
  };

  //   FlushUser();
  return (
    <>

{premiumModalStatus ? (
      <div class={styles.overlay}>
      <div className={styles.premiumModal}>
        <div onClick={()=> setPremiumModalStatus(false)} className={styles.closebtnModal}>
          close
        </div>
        <Upgrade/>
      </div>
      </div>
    ): ''}
  {/* ///Filter Screen//// */}
  {!ispremium && filter && <>
       <div className={styles.filtermodalback}>
       </div>
       <div className={styles.filtermodal}>
            {
              <FilterPart setFilter={setFilter} filterData={filterData} setfilterData={setfilterData}/>
            }
          </div>
          </>}
    {isLikesEXhaust && (<LikesExhaust />) ||  (isLoadingData ? (<Loading />) : (
      <div
        style={{ overflowY: !redo ? "scroll" : "hidden" }}
        className={styles.middleContainer}
      >
        {/* ////Not Premium Pop-UP//// */}
        {!ispremium && redo   && (
          <FilterRedoPopUp
            frtext={frtext}
            SetRedo={SetRedo}
            setIsPremium={setIsPremium}
            setPremiumModalStatus={setPremiumModalStatus}
          />
        )}
        <div className={styles.filterContainer}>
          <div
            onClick={() => (CheckisPremium(), setFRText("Undo"))}
            className={styles.undoMoveCont}
          >
            <div className={styles.innerUndoMove}>
              <img
                className={styles.undoMoveImg}
                src={undoMoveIcon}
                alt="undoMoveIcon"
              />
              <p className={styles.undoMoveText}>Undo Move</p>
            </div>
          </div>
          {!noMoreVibeData && <img
            onClick={()=>(CheckisPremiumFilter(),setFRText("Filter"))}
            className={styles.filterIcon}
            src={filterIcon}
            alt="filterIcon"
          />}
        </div>
        {noMoreVibeData ? (<NoData noMoreVibeData={noMoreVibeData} />) : (
          <div className={styles.vibeinfo}>
            <div className={styles.userDetailsContainer}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.userProfilePucture}
                  src={
                    userData[currentUserIndex].image
                      ? userData[currentUserIndex].image
                      : defaultImg
                  }
                  alt="userProfilePucture"
                />
              </div>
              <h2 className={styles.userName}>
                {userData[currentUserIndex].name}
              </h2>
              <h3 className={styles.userPosition}>
                {userData[currentUserIndex].designation}
              </h3>
              {userData[currentUserIndex].state ||
              userData[currentUserIndex].country ? (
                <div className={styles.locationCont}>
                  <img
                    className={styles.locationIcon}
                    src={location}
                    alt="location"
                  />
                  <p className={styles.location}>
                    {userData[currentUserIndex].state}
                    {", "}
                    {userData[currentUserIndex].country}
                  </p>
                </div>
              ) : null}
            </div>
            <div className={styles.details}>
              {userData[currentUserIndex]?.about && (
                <div className={styles.aboutMe}>
                  <h2 className={styles.Heading}>About Me</h2>
                  <p className={styles.aboutDetails}>
                    {userData[currentUserIndex].about}
                  </p>
                </div>
              )}
              {userData[currentUserIndex]?.here_for &&
              userData[currentUserIndex]?.here_for.length > 0 ? (
                <div className={styles.whyamIHere}>
                  <h2 className={styles.Heading}>Why am i here</h2>
                  <div className={styles.whyamIHereCont}>
                    {userData[currentUserIndex]?.here_for.map((item, index) => {
                      return (
                        <div key={index} className={styles.whyamIHereItem}>
                          <p className={styles.whyhereText}>{item}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {userData[currentUserIndex]?.experience &&
              userData[currentUserIndex]?.experience.length > 0 &&
              userData[currentUserIndex]?.experience[0]?.designation &&
              userData[currentUserIndex]?.experience[0]?.company !== "" ? (
                <div className={styles.designation}>
                  <h2 className={styles.Heading}>Current Designation</h2>
                  <div className={styles.designationDetailsCont}>
                    <h3 className={styles.designationInfo}>
                      {userData[currentUserIndex].experience[0].designation
                        ? userData[currentUserIndex].experience[0].designation
                        : ""}
                    </h3>
                    <p className={styles.designationDetails}>
                      {userData[currentUserIndex].experience[0].company
                        ? userData[currentUserIndex].experience[0].company
                        : ""}
                    </p>
                  </div>
                </div>
              ) : null}
              {userData[currentUserIndex]?.education &&
              userData[currentUserIndex]?.education.length > 0 &&
              userData[currentUserIndex]?.education[0]?.institute &&
              userData[currentUserIndex]?.education[0]?.degree !== "" ? (
                <div className={styles.education}>
                  <h2 className={styles.Heading}>Education</h2>
                  <div className={styles.educationCont}>
                    <h3 className={styles.educationInstitute}>
                      {userData[currentUserIndex].education[0].institute
                        ? userData[currentUserIndex].education[0].institute
                        : ""}
                    </h3>
                    <p className={styles.designationDetails}>
                      {userData[currentUserIndex].education[0].degree
                        ? userData[currentUserIndex].education[0].degree
                        : ""}
                    </p>
                  </div>
                </div>
              ) : null}
              {userData[currentUserIndex]?.Vibe_Data?.How_To_Meet &&
              userData[currentUserIndex]?.Vibe_Data?.How_To_Meet?.length > 0 ? (
                <div className={styles.howCanWeMeet}>
                  <h2 className={styles.Heading}>How can we meet?</h2>
                  <div className={styles.meetingTypeCont}>
                    {userData[currentUserIndex].Vibe_Data.How_To_Meet.map(
                      (type, index) => {
                        const imageURL = howToMeetImages[type];
                        return (
                          <div key={index} className={styles.typeContainer}>
                            <img
                              className={styles.meetingTypeImg}
                              src={imageURL}
                              alt={type}
                            />
                            <p className={styles.meetingType}>{type}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              ) : null}
              <div className={styles.findMeOn}>
                {(userData[currentUserIndex]?.phone ||
                  userData[currentUserIndex]?.email ||
                  userData[currentUserIndex]?.linkedin ||
                  userData[currentUserIndex]?.twitter) !== "" && (
                  <>
                    <h2 className={styles.Heading}>Find Me On</h2>
                    <div className={styles.findmeOnWraper}>
                      {userData[currentUserIndex].phone !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={phoneIcon} alt="phoneIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[currentUserIndex].countryCode}{" "}
                            {userData[currentUserIndex].phone}
                          </p>
                        </div>
                      )}
                      {userData[currentUserIndex].email !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={emailIcon} alt="emailIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[currentUserIndex].email}
                          </p>
                        </div>
                      )}
                      {userData[currentUserIndex].linkedin !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={linkedinIcon} alt="linkedinIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[currentUserIndex].linkedin}
                          </p>
                        </div>
                      )}
                      {userData[currentUserIndex].twitter !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={twitterIcon} alt="twitterIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[currentUserIndex].twitter}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {isFadedLeft && (userData) && (
          <div
            className={styles.fadedLeft}
          >
            <div className={styles.userDetailsContainer}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.userProfilePucture}
                  src={
                    userData[prevUserIndex].image
                      ? userData[prevUserIndex].image
                      : defaultImg
                  }
                  alt="userProfilePucture"
                />
              </div>
              <h2 className={styles.userName}>
                {userData[prevUserIndex].name}
              </h2>
              <h3 className={styles.userPosition}>
                {userData[prevUserIndex].designation}
              </h3>
              {userData[prevUserIndex].state ||
              userData[prevUserIndex].country ? (
                <div className={styles.locationCont}>
                  <img
                    className={styles.locationIcon}
                    src={location}
                    alt="location"
                  />
                  <p className={styles.location}>
                    {userData[prevUserIndex].state}
                    {", "}
                    {userData[prevUserIndex].country}
                  </p>
                </div>
              ) : null}
            </div>
            <div className={styles.details}>
              {userData[prevUserIndex]?.about && (
                <div className={styles.aboutMe}>
                  <h2 className={styles.Heading}>About Me</h2>
                  <p className={styles.aboutDetails}>
                    {userData[prevUserIndex].about}
                  </p>
                </div>
              )}
              {userData[prevUserIndex]?.here_for &&
              userData[prevUserIndex]?.here_for.length > 0 ? (
                <div className={styles.whyamIHere}>
                  <h2 className={styles.Heading}>Why am i here</h2>
                  <div className={styles.whyamIHereCont}>
                    {userData[prevUserIndex]?.here_for.map((item, index) => {
                      return (
                        <div key={index} className={styles.whyamIHereItem}>
                          <p className={styles.whyhereText}>{item}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {userData[prevUserIndex]?.experience &&
              userData[prevUserIndex]?.experience.length > 0 &&
              userData[prevUserIndex]?.experience[0]?.designation &&
              userData[prevUserIndex]?.experience[0]?.company !== "" ? (
                <div className={styles.designation}>
                  <h2 className={styles.Heading}>Current Designation</h2>
                  <div className={styles.designationDetailsCont}>
                    <h3 className={styles.designationInfo}>
                      {userData[prevUserIndex].experience[0].designation
                        ? userData[prevUserIndex].experience[0].designation
                        : ""}
                    </h3>
                    <p className={styles.designationDetails}>
                      {userData[prevUserIndex].experience[0].company
                        ? userData[prevUserIndex].experience[0].company
                        : ""}
                    </p>
                  </div>
                </div>
              ) : null}
              {userData[prevUserIndex]?.education &&
              userData[prevUserIndex]?.education.length > 0 &&
              userData[prevUserIndex]?.education[0]?.institute &&
              userData[prevUserIndex]?.education[0]?.degree !== "" ? (
                <div className={styles.education}>
                  <h2 className={styles.Heading}>Education</h2>
                  <div className={styles.educationCont}>
                    <h3 className={styles.educationInstitute}>
                      {userData[prevUserIndex].education[0].institute
                        ? userData[prevUserIndex].education[0].institute
                        : ""}
                    </h3>
                    <p className={styles.designationDetails}>
                      {userData[prevUserIndex].education[0].degree
                        ? userData[prevUserIndex].education[0].degree
                        : ""}
                    </p>
                  </div>
                </div>
              ) : null}
              {userData[prevUserIndex]?.Vibe_Data?.How_To_Meet &&
              userData[prevUserIndex]?.Vibe_Data?.How_To_Meet?.length > 0 ? (
                <div className={styles.howCanWeMeet}>
                  <h2 className={styles.Heading}>How can we meet?</h2>
                  <div className={styles.meetingTypeCont}>
                    {userData[prevUserIndex].Vibe_Data.How_To_Meet.map(
                      (type, index) => {
                        const imageURL = howToMeetImages[type];
                        return (
                          <div key={index} className={styles.typeContainer}>
                            <img
                              className={styles.meetingTypeImg}
                              src={imageURL}
                              alt={type}
                            />
                            <p className={styles.meetingType}>{type}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              ) : null}
              <div className={styles.findMeOn}>
                {(userData[prevUserIndex]?.phone ||
                  userData[prevUserIndex]?.email ||
                  userData[prevUserIndex]?.linkedin ||
                  userData[prevUserIndex]?.twitter) !== "" && (
                  <>
                    <h2 className={styles.Heading}>Find Me On</h2>
                    <div className={styles.findmeOnWraper}>
                      {userData[prevUserIndex].phone !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={phoneIcon} alt="phoneIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].countryCode}{" "}
                            {userData[prevUserIndex].phone}
                          </p>
                        </div>
                      )}
                      {userData[prevUserIndex].email !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={emailIcon} alt="emailIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].email}
                          </p>
                        </div>
                      )}
                      {userData[prevUserIndex].linkedin !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={linkedinIcon} alt="linkedinIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].linkedin}
                          </p>
                        </div>
                      )}
                      {userData[prevUserIndex].twitter !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={twitterIcon} alt="twitterIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].twitter}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {isFadedRight && (userData) && (
          <div className={styles.fadedRight}>
            <div className={styles.userDetailsContainer}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.userProfilePucture}
                  src={
                    userData[prevUserIndex].image
                      ? userData[prevUserIndex].image
                      : defaultImg
                  }
                  alt="userProfilePucture"
                />
              </div>
              <h2 className={styles.userName}>
                {userData[prevUserIndex].name}
              </h2>
              <h3 className={styles.userPosition}>
                {userData[prevUserIndex].designation}
              </h3>
              {userData[prevUserIndex].state ||
              userData[prevUserIndex].country ? (
                <div className={styles.locationCont}>
                  <img
                    className={styles.locationIcon}
                    src={location}
                    alt="location"
                  />
                  <p className={styles.location}>
                    {userData[prevUserIndex].state}
                    {", "}
                    {userData[prevUserIndex].country}
                  </p>
                </div>
              ) : null}
            </div>
            <div className={styles.details}>
              {userData[prevUserIndex]?.about && (
                <div className={styles.aboutMe}>
                  <h2 className={styles.Heading}>About Me</h2>
                  <p className={styles.aboutDetails}>
                    {userData[prevUserIndex].about}
                  </p>
                </div>
              )}
              {userData[prevUserIndex]?.here_for &&
              userData[prevUserIndex]?.here_for.length > 0 ? (
                <div className={styles.whyamIHere}>
                  <h2 className={styles.Heading}>Why am i here</h2>
                  <div className={styles.whyamIHereCont}>
                    {userData[prevUserIndex]?.here_for.map((item, index) => {
                      return (
                        <div key={index} className={styles.whyamIHereItem}>
                          <p className={styles.whyhereText}>{item}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {userData[prevUserIndex]?.experience &&
              userData[prevUserIndex]?.experience.length > 0 &&
              userData[prevUserIndex]?.experience[0]?.designation &&
              userData[prevUserIndex]?.experience[0]?.company !== "" ? (
                <div className={styles.designation}>
                  <h2 className={styles.Heading}>Current Designation</h2>
                  <div className={styles.designationDetailsCont}>
                    <h3 className={styles.designationInfo}>
                      {userData[prevUserIndex].experience[0].designation
                        ? userData[prevUserIndex].experience[0].designation
                        : ""}
                    </h3>
                    <p className={styles.designationDetails}>
                      {userData[prevUserIndex].experience[0].company
                        ? userData[prevUserIndex].experience[0].company
                        : ""}
                    </p>
                  </div>
                </div>
              ) : null}
              {userData[prevUserIndex]?.education &&
              userData[prevUserIndex]?.education.length > 0 &&
              userData[prevUserIndex]?.education[0]?.institute &&
              userData[prevUserIndex]?.education[0]?.degree !== "" ? (
                <div className={styles.education}>
                  <h2 className={styles.Heading}>Education</h2>
                  <div className={styles.educationCont}>
                    <h3 className={styles.educationInstitute}>
                      {userData[prevUserIndex].education[0].institute
                        ? userData[prevUserIndex].education[0].institute
                        : ""}
                    </h3>
                    <p className={styles.designationDetails}>
                      {userData[prevUserIndex].education[0].degree
                        ? userData[prevUserIndex].education[0].degree
                        : ""}
                    </p>
                  </div>
                </div>
              ) : null}
              {userData[prevUserIndex]?.Vibe_Data?.How_To_Meet &&
              userData[prevUserIndex]?.Vibe_Data?.How_To_Meet?.length > 0 ? (
                <div className={styles.howCanWeMeet}>
                  <h2 className={styles.Heading}>How can we meet?</h2>
                  <div className={styles.meetingTypeCont}>
                    {userData[prevUserIndex].Vibe_Data.How_To_Meet.map(
                      (type, index) => {
                        const imageURL = howToMeetImages[type];
                        return (
                          <div key={index} className={styles.typeContainer}>
                            <img
                              className={styles.meetingTypeImg}
                              src={imageURL}
                              alt={type}
                            />
                            <p className={styles.meetingType}>{type}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              ) : null}
              <div className={styles.findMeOn}>
                {(userData[prevUserIndex]?.phone ||
                  userData[prevUserIndex]?.email ||
                  userData[prevUserIndex]?.linkedin ||
                  userData[prevUserIndex]?.twitter) !== "" && (
                  <>
                    <h2 className={styles.Heading}>Find Me On</h2>
                    <div className={styles.findmeOnWraper}>
                      {userData[prevUserIndex].phone !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={phoneIcon} alt="phoneIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].countryCode}{" "}
                            {userData[prevUserIndex].phone}
                          </p>
                        </div>
                      )}
                      {userData[prevUserIndex].email !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={emailIcon} alt="emailIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].email}
                          </p>
                        </div>
                      )}
                      {userData[prevUserIndex].linkedin !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={linkedinIcon} alt="linkedinIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].linkedin}
                          </p>
                        </div>
                      )}
                      {userData[prevUserIndex].twitter !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={twitterIcon} alt="twitterIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].twitter}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        {isFadedTop && (userData) && (
          <div className={styles.fadedTop}>
            <div className={styles.userDetailsContainer}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.userProfilePucture}
                  src={
                    userData[prevUserIndex].image
                      ? userData[prevUserIndex].image
                      : defaultImg
                  }
                  alt="userProfilePucture"
                />
              </div>
              <h2 className={styles.userName}>
                {userData[prevUserIndex].name}
              </h2>
              <h3 className={styles.userPosition}>
                {userData[prevUserIndex].designation}
              </h3>
              {userData[prevUserIndex].state ||
              userData[prevUserIndex].country ? (
                <div className={styles.locationCont}>
                  <img
                    className={styles.locationIcon}
                    src={location}
                    alt="location"
                  />
                  <p className={styles.location}>
                    {userData[prevUserIndex].state}
                    {", "}
                    {userData[prevUserIndex].country}
                  </p>
                </div>
              ) : null}
            </div>
            <div className={styles.details}>
              {userData[prevUserIndex]?.about && (
                <div className={styles.aboutMe}>
                  <h2 className={styles.Heading}>About Me</h2>
                  <p className={styles.aboutDetails}>
                    {userData[prevUserIndex].about}
                  </p>
                </div>
              )}
              {userData[prevUserIndex]?.here_for &&
              userData[prevUserIndex]?.here_for.length > 0 ? (
                <div className={styles.whyamIHere}>
                  <h2 className={styles.Heading}>Why am i here</h2>
                  <div className={styles.whyamIHereCont}>
                    {userData[prevUserIndex]?.here_for.map((item, index) => {
                      return (
                        <div key={index} className={styles.whyamIHereItem}>
                          <p className={styles.whyhereText}>{item}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {userData[prevUserIndex]?.experience &&
              userData[prevUserIndex]?.experience.length > 0 &&
              userData[prevUserIndex]?.experience[0]?.designation &&
              userData[prevUserIndex]?.experience[0]?.company !== "" ? (
                <div className={styles.designation}>
                  <h2 className={styles.Heading}>Current Designation</h2>
                  <div className={styles.designationDetailsCont}>
                    <h3 className={styles.designationInfo}>
                      {userData[prevUserIndex].experience[0].designation
                        ? userData[prevUserIndex].experience[0].designation
                        : ""}
                    </h3>
                    <p className={styles.designationDetails}>
                      {userData[prevUserIndex].experience[0].company
                        ? userData[prevUserIndex].experience[0].company
                        : ""}
                    </p>
                  </div>
                </div>
              ) : null}
              {userData[prevUserIndex]?.education &&
              userData[prevUserIndex]?.education.length > 0 &&
              userData[prevUserIndex]?.education[0]?.institute &&
              userData[prevUserIndex]?.education[0]?.degree !== "" ? (
                <div className={styles.education}>
                  <h2 className={styles.Heading}>Education</h2>
                  <div className={styles.educationCont}>
                    <h3 className={styles.educationInstitute}>
                      {userData[prevUserIndex].education[0].institute
                        ? userData[prevUserIndex].education[0].institute
                        : ""}
                    </h3>
                    <p className={styles.designationDetails}>
                      {userData[prevUserIndex].education[0].degree
                        ? userData[prevUserIndex].education[0].degree
                        : ""}
                    </p>
                  </div>
                </div>
              ) : null}
              {userData[prevUserIndex]?.Vibe_Data?.How_To_Meet &&
              userData[prevUserIndex]?.Vibe_Data?.How_To_Meet?.length > 0 ? (
                <div className={styles.howCanWeMeet}>
                  <h2 className={styles.Heading}>How can we meet?</h2>
                  <div className={styles.meetingTypeCont}>
                    {userData[prevUserIndex].Vibe_Data.How_To_Meet.map(
                      (type, index) => {
                        const imageURL = howToMeetImages[type];
                        return (
                          <div key={index} className={styles.typeContainer}>
                            <img
                              className={styles.meetingTypeImg}
                              src={imageURL}
                              alt={type}
                            />
                            <p className={styles.meetingType}>{type}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              ) : null}
              <div className={styles.findMeOn}>
                {(userData[prevUserIndex]?.phone ||
                  userData[prevUserIndex]?.email ||
                  userData[prevUserIndex]?.linkedin ||
                  userData[prevUserIndex]?.twitter) !== "" && (
                  <>
                    <h2 className={styles.Heading}>Find Me On</h2>
                    <div className={styles.findmeOnWraper}>
                      {userData[prevUserIndex].phone !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={phoneIcon} alt="phoneIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].countryCode}{" "}
                            {userData[prevUserIndex].phone}
                          </p>
                        </div>
                      )}
                      {userData[prevUserIndex].email !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={emailIcon} alt="emailIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].email}
                          </p>
                        </div>
                      )}
                      {userData[prevUserIndex].linkedin !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={linkedinIcon} alt="linkedinIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].linkedin}
                          </p>
                        </div>
                      )}
                      {userData[prevUserIndex].twitter !== "" && (
                        <div className={styles.findmeCont}>
                          <img src={twitterIcon} alt="twitterIcon" />
                          <p className={styles.findmeDetails}>
                            {userData[prevUserIndex].twitter}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {!noMoreVibeData && <div className={styles.likeHandshake}>
          <div className={styles.innerContainer}>
            <div className={styles.Cont} onClick={handleNopeCkick}>
              <img
                className={styles.likehandShakeImg}
                src={declineIcon}
                alt="declineIcon"
              />
            </div>
            <div className={styles.Cont} onClick={HandShakeUser}>
              <img
                className={styles.likehandShakeImg}
                src={handShakeIcon}
                alt="handShakeIcon"
              />
            </div>
            <div className={styles.Cont} onClick={handleLikeCkick}>
              <img
                className={styles.likehandShakeImg}
                src={acceptIcon}
                alt="acceptIcon"
              />
            </div>
          </div>
          <div className={styles.background}></div>
        </div>}
      </div>))}
    </>
  );
};

export default VibeMiddlePart;