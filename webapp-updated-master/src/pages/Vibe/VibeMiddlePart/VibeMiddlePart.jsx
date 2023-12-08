import styles from "./vibeMiddlePart.module.css";
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
  onSnapshot,
} from "firebase/firestore";
import { createMatchedInMessagesDoc, db } from "../../../firebase";
import { useSelector } from "react-redux";
import defaultImg from "../../../images/default-profile-pic.webp";
import { toast } from "react-toastify";
import NoData from "./No Data Screen/NoData";
import Loading from "./LoadingScreen/Loading";
import LikesExhaust from "./LikesExhaustScreen/LikesExhaust";
import Upgrade from "../../Upgrade/Upgrade";
import MatchedUserScreen from "./matchedUserScreen/MatchedUserScreen";
import { useSwipeable } from "react-swipeable";

const VibeMiddlePart = () => {
  const [ispremium, setIsPremium] = useState(false);
  const [redo, SetRedo] = useState(false);
  const [frtext, setFRText] = useState("");
  const [filter, setFilter] = useState(false);
  const [userData, setUserData] = useState([]);
  const [list, setList] = useState([]);
  const [premiumModalStatus, setPremiumModalStatus] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [noMoreVibeData, setNoMoreVibeData] = useState(false);
  const [swipeLimit, setSwipeLimit] = useState({
    swipeRemaining: 10,
    swipeUpdateTime: null,
  });
  const [superlikelimit, setSuperlikeLimit] = useState({
    superlikeUpdateTime: 1,
    superlikecount: null,
  });
  const [loadingSwipeData, setLoadingSwipeData] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLikesEXhaust, setIsLikesEXhaust] = useState(false);
  const [isMatchedUser, setIsMatchedUser] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);

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
  const [filterData, setfilterData] = useState({
    roles: "",
    spaces: [],
    cities: "",
    age: "",
    mode: "",
  });
  const [modal, setModal] = useState(false);
  const [recentPassedUser, setRecentPassedUser] = useState({
    email: "",
    where: "",
  });

  // const toggle = () => {
  //   setModal(!modal);
  // };

  useEffect(() => {
    function checkPremiumStatus() {
      const oneMonthInseconds = 30 * 24 * 60 * 60;
      const threeMonthsInseconds = 3 * oneMonthInseconds;
      const sixMonthsInseconds = 6 * oneMonthInseconds;

      // let isPremium = false;
      const premiumData = userDoc?.premiumData;
      const currentDate = new Date().getTime() / 1000;
      if (!premiumData) return;

      const premiumStartDate = premiumData.premiumStartDate;

      switch (premiumData.subscriptionPlan) {
        case "onemonth":
          if (currentDate <= premiumStartDate + oneMonthInseconds) {
            setIsPremium(true);
          }
          break;
        case "threemonths":
          if (currentDate <= premiumStartDate + threeMonthsInseconds) {
            setIsPremium(true);
          }
          break;
        case "sixmonths":
          if (currentDate <= premiumStartDate + sixMonthsInseconds) {
            setIsPremium(true);
          }
          break;
        default:
          setIsPremium(false);
          break;
      }
    }
    checkPremiumStatus();
  }, [userDoc]);

  const getUserData = async () => {
    try {
      console.log("userDoc data fetch");
      setIsLoadingData(true);
      const userRef = collection(db, "Users");
      const userquery = query(userRef);
      const usersnapshot = await getDocs(userquery);

      const userDocRef = doc(db, "Users", currentLoggedInUser?.user?.email);
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
          doc.data().vibeuser === true
      );
      // console.log("filteredDocs", filteredDocs);
      const fetchedUserData = filteredDocs
        .map((doc) => doc.data())
        .filter(
          (userDocument) =>
            userDocument.name && userDocument.about && userDocument.email
        );
      // setNoMoreVibeData(fetchedUserData.length === 0);
      setList(fetchedUserData);
      // setUserData(fetchedUserData);
      setIsLoadingData(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [currentLoggedInUser]);

  const filterSection = () => {
    let filteredList = [...list];
    if (filterData.roles) {
      filteredList = filteredList.filter(
        (user) => user.userType === filterData.roles
      );
    }
    if (filterData.spaces.length > 0) {
      filteredList = filteredList.filter((user) =>
        filterData.userSpace.includes(user.space)
      );
    }
    if (filterData.cities) {
      filteredList = filteredList.filter(
        (user) => user?.state?.toLowerCase() === filterData.cities.toLowerCase()
      );
    }
    setUserData(filteredList);
    setNoMoreVibeData(filteredList.length === 0);
    console.log("Lorem ipsum dolor sit amet, consectetur");
  };

  const clearFilterData = () => {
    let filteredList = [...list];
    setUserData(filteredList);
  };
  useEffect(() => {
    if (Object.values(filterData).some((value) => value !== "")) {
      filterSection();
    } else {
      clearFilterData();
    }
  }, [
    filterData,
    filterData.roles,
    filterData.spaces.length,
    filterData.userSpace,
    list,
  ]);

  const onRefreshClick = () => {
    setfilterData({
      roles: "",
      spaces: [],
      cities: "",
      age: "",
      mode: "",
    });
    getUserData();
    clearFilterData();
  };

  const handleKeepSwiping = () => {
    setIsMatchedUser(false);
    window.location.reload();
  };

  const showMatchedUser = async (email) => {
    const userRef = doc(db, "Users", currentLoggedInUser?.user?.email);
    let isdisplayed = false;
    const unsubscribe = onSnapshot(userRef, async (snapshot) => {
      const matchedUsers = snapshot.data().matched_user;
      console.log("MATCHEDUSERS", matchedUsers);
      if (!isdisplayed && matchedUsers.includes(email)) {
        setIsMatchedUser(true);
        const userDocRef = doc(db, "Users", email);
        const matchedUserDoc = await getDoc(userDocRef);
        console.log("MATCHEDUSERDOC", matchedUserDoc.data());
        const matchedUserData = {
          currentUserData: snapshot.data(),
          matchedUserData: matchedUserDoc.data(),
        };
        setMatchedUser(matchedUserData);
        console.log("MATCHEDUSERDATA", matchedUserData);
        isdisplayed = true;
        unsubscribe();
      }
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log("Swiped left!");
      handleNopeCkick();
    },
    onSwipedRight: () => {
      console.log("Swiped right!");
      handleLikeCkick();
    },
    trackMouse: true,
    trackTouch: true,
    touchEventOptions: { passive: true },
  });

  const handleLikeCkick = () => {
    // if the user has no swipe remaining and the update time is not reached yet
    // then show the toast message and return
    if (
      !ispremium &&
      swipeLimit.swipeRemaining === 0 &&
      swipeLimit.swipeUpdateTime > new Date().getTime()
    ) {
      toast(
        `You have reached the limit. Please wait till ${new Date(
          swipeLimit.swipeUpdateTime
        ).toLocaleString()}`
      );
      setIsLikesEXhaust(true);
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
    if (userData[currentUserIndex]) {
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
  const OpenFilter = () => {
    // if (!ispremium) {
    //   return setFilter(true);
    // }
    // add An ! before ispremium to make filter modal render
    // if (ispremium) {
    //   return setFilter(true);
    // } else {
    //   return setFilter(false), SetRedo(true);
    // }
    if (filter === false) {
      setFilter(!filter);
    }
  };
  console.log(filter);

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
            if (!ispremium && data.swipeLimit.swipeRemaining === 0) {
              setIsLikesEXhaust(true);
            } else {
              setIsLikesEXhaust(false);
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
      // If the user is premium swipeUpdateTime is already passed, reset swipeRemaining to 10 and update swipeUpdateTime
      if (ispremium || swipeLimit.swipeUpdateTime < new Date().getTime()) {
        console.log("it't time to reset");
        setSwipeLimit((prevState) => ({
          ...prevState,
          swipeRemaining: 10,
          swipeUpdateTime: new Date().getTime() + 24 * 60 * 60 * 1000,
        }));
        setIsLikesEXhaust(false);
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

  ////handle superlike count///

  useEffect(() => {
    // Fetch the initial superlike data from Firebase or create it if not present
    const fetchsuperlike = async () => {
      const userEmail = currentLoggedInUser?.user?.email;
      if (!userEmail) {
        throw new Error("User email not available");
      }
      try {
        const docRef = doc(db, "Users", userEmail);
        // console.log("docRef", docRef);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          // console.log("data", data);
          if (data?.superlike) {
            setSuperlikeLimit(data.superlike);
            console.log(data.superlike);
          } else {
            // If superlike field is not present, create it with initial values
            const updateTime = new Date().getTime() - 24 * 60 * 60 * 1000;

            await setDoc(
              docRef,
              {
                superlike: {
                  superlikecount: 1,
                  superlikeUpdateTime: updateTime,
                },
              },
              { merge: true }
            );
            setSuperlikeLimit({
              superlikecount: 1,
              superlikeUpdateTime: updateTime,
            });
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching swipeLimit data:", error);
      }
    };

    fetchsuperlike();
    // handleSuperlike()
    if (
      superlikelimit.superlikecount === 0 &&
      superlikelimit.superlikeUpdateTime > new Date().getTime()
    ) {
      handleSuperlike();
    }
  }, [currentLoggedInUser]);

  const handleSuperlike = async () => {
    // i have still superlike remaining and the update time is not reached yet
    if (
      superlikelimit?.superlikecount > 0 &&
      superlikelimit?.superlikeUpdateTime > new Date().getTime()
    ) {
      // User has remaining swipes, decrease swipeRemaining by 1
      const newSuperlikeRemaining = superlikelimit.superlikecount - 1;
      setSuperlikeLimit((prevState) => ({
        ...prevState,
        superlikecount: newSuperlikeRemaining,
      }));
      await updateSuperlikeLimit({
        superlikecount: newSuperlikeRemaining,
        superlikeUpdateTime: superlikelimit.superlikeUpdateTime,
      });
    } else {
      // If superlikeUpdateTime is already passed, reset superlikeRemaining to 1 and update superlikeUpdateTime
      if (superlikelimit.superlikeUpdateTime < new Date().getTime()) {
        console.log("super like time update");
        if (userDoc?.premiumData?.subscriptionPlan) {
          setSuperlikeLimit((prevState) => ({
            ...prevState,
            superlikecount: 1,
            superlikeUpdateTime: new Date().getTime() + 24 * 60 * 60 * 1000,
          }));
          // setIsLikesEXhaust(false);
          await updateSuperlikeLimit({
            superlikecount: 1,
            superlikeUpdateTime: new Date().getTime() + 24 * 60 * 60 * 1000,
          });
        } else {
          setSuperlikeLimit((prevState) => ({
            ...prevState,
            superlikecount: 1,
            superlikeUpdateTime: new Date().getTime() + 168 * 60 * 60 * 1000,
          }));
          // setIsLikesEXhaust(false);
          await updateSuperlikeLimit({
            superlikecount: 1,
            superlikeUpdateTime: new Date().getTime() + 168 * 60 * 60 * 1000,
          });
        }
      } else {
        console.log("wait for superlikeUpdateTime");
      }
    }
  };

  const updateSuperlikeLimit = async (newSwipeLimit) => {
    const userEmail = currentLoggedInUser?.user?.email;
    if (!userEmail) {
      throw new Error("User email not available");
    }
    try {
      await updateDoc(doc(db, "Users", userEmail), {
        superlike: newSwipeLimit,
      });
    } catch (error) {
      console.error("Error updating swipeLimit on Firebase:", error);
    }
  };

  //superlike count end///

  const HandShakeUser = async (userEmail) => {
    userEmail = userData[currentUserIndex]?.email;
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

        if (!superlikes.includes(userEmail)) {
          await updateDoc(docRef, {
            superlikes: [...superlikes, userEmail],
          });
        }
      }

      if (otherDocSnap.exists()) {
        let superliked_by;

        if (!otherDocSnap.data().superliked_by) {
          superliked_by = [];
        } else {
          superliked_by = otherDocSnap.data().superliked_by;
        }

        if (!superliked_by.includes(userDoc?.email)) {
          await updateDoc(otherDocRef, {
            superliked_by: [...superliked_by, userDoc?.email],
          });
        }

        setRecentPassedUser({
          email: otherDocSnap.data().email,
          where: "superliked",
        });

        // FlushUser(userEmail);
      } else {
        console.log("No such document!");
      }
      setPrevUserIndex(currentUserIndex);
      setIsFadedTop(true);

      if (currentUserIndex < userData.length - 1) {
        // console.log(userData);
        setCurrentUserIndex(currentUserIndex + 1);
      } else {
        setNoMoreVibeData(true);
      }
      setTimeout(() => {
        setIsFadedTop(false);
      }, [500]);

      handleSuperlike();
      handleSwipe();
      FlushUser(userEmail);
    } catch (e) {
      console.log("Error getting document:", e);
    }
  };

  const NopeUser = async (userEmail) => {
    await FlushUser(userEmail);
    setRecentPassedUser({
      email: userEmail,
      where: "passed",
    });
  };

  const LikeUser = async (userEmail) => {
    const docRef = doc(db, "Users", currentLoggedInUser?.user?.email);
    const otherDocRef = doc(db, "Users", userEmail);

    try {
      const docSnap = await getDoc(docRef);
      const otherDocSnap = await getDoc(otherDocRef);

      if (otherDocSnap.exists()) {
        let liked_by;
        let likes;

        likes = otherDocSnap.data()?.likes || [];
        liked_by = otherDocSnap.data()?.liked_by || [];

        if (!likes.includes(currentLoggedInUser?.user?.email)) {
          // to avoid duplicacy of likes
          if (!liked_by.includes(currentLoggedInUser?.user?.email)) {
            await updateDoc(otherDocRef, {
              liked_by: [...liked_by, currentLoggedInUser?.user?.email],
            });
          }

          setRecentPassedUser({
            email: otherDocSnap.data().email,
            where: "liked",
          });
        } else {
          console.log("Already liked by this user");
          // Delete the user from the likedby array
          likes = likes.filter(
            (email) => email !== currentLoggedInUser?.user?.email
          );
          await updateDoc(otherDocRef, {
            likes: [...likes],
          });
          let other_matched_user = otherDocSnap.data()?.matched_user || [];
          await updateDoc(otherDocRef, {
            matched_user: [
              ...other_matched_user,
              currentLoggedInUser?.user?.email,
            ],
          });

          showMatchedUser(userData[currentUserIndex].email);
          setRecentPassedUser({
            email: otherDocSnap.data().email,
            where: "matched",
          });

          await createMatchedInMessagesDoc(
            otherDocSnap.data()?.email,
            // "apurbar06@gmail.com",
            docSnap.data()?.email
            // "sivatharun2212@gmail.com"
          );
        }
      } else {
        console.log("No such document!");
      }

      if (docSnap.exists()) {
        let likes;
        let liked_by;

        likes = docSnap.data()?.likes || [];
        liked_by = docSnap.data()?.liked_by || [];

        if (!liked_by.includes(userEmail)) {
          if (!likes.includes(userEmail)) {
            // to avoid duplicacy of likes
            await updateDoc(docRef, {
              likes: [...likes, userEmail],
            });
          }
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
          await createMatchedInMessagesDoc(
            otherDocSnap.data()?.email,
            docSnap.data()?.email
          );
        }
      }

      // FlushUser(userEmail);
    } catch (e) {
      console.log("Error getting document:", e);
    }
  };

  const FlushUser = async (email) => {
    const docRef = doc(db, "Users", currentLoggedInUser?.user?.email);
    try {
      const docSnap = await getDoc(docRef);
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

      // if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      // } else {
      //   // doc.data() will be undefined in this case
      //   console.log("No such document!");
      // }
    } catch (e) {
      console.log("Error getting document:", e);
    }
    // const userDocument = await getDoc(userDocumentRef);
  };

  const HandleUndoSuperLikeMove = async () => {
    let userEmail = recentPassedUser?.email;

    const docRef = doc(db, "Users", userDoc?.email);
    const otherDocRef = doc(db, "Users", userEmail);

    const docSnap = await getDoc(docRef);
    const otherDocSnap = await getDoc(otherDocRef);

    if (docSnap.exists() && otherDocSnap.exists()) {
      let superlikes;
      let superliked_by;
      let userPassedEmail;

      superlikes = docSnap.data()?.superlikes || [];
      userPassedEmail = docSnap.data()?.passed_email || [];

      superliked_by = otherDocSnap.data()?.superliked_by || [];

      if (superliked_by.includes(docSnap.data().email)) {
        superliked_by = superliked_by.filter(
          (email) => email !== docSnap.data().email
        );
        await updateDoc(otherDocRef, {
          superliked_by: superliked_by,
        });
      }

      if (userPassedEmail.includes(userEmail)) {
        userPassedEmail = userPassedEmail.filter(
          (email) => email !== userEmail
        );
        await updateDoc(docRef, {
          passed_email: userPassedEmail,
        });
      }

      if (superlikes.includes(userEmail)) {
        superlikes = superlikes.filter((email) => email !== userEmail);
        await updateDoc(docRef, {
          superlikes: superlikes,
        });
      }

      setPrevUserIndex(currentUserIndex);
      setIsFadedTop(true);

      if (currentUserIndex <= userData.length - 1 && currentUserIndex > 0) {
        setCurrentUserIndex(currentUserIndex - 1);
      }
      setTimeout(() => {
        setIsFadedTop(false);
      }, [500]);

      // handleSwipe();
    } else {
      console.log("No such document!");
    }
  };

  const HandleUndoPassMove = async () => {
    let userEmail = recentPassedUser?.email;

    const docRef = doc(db, "Users", userDoc?.email);
    const otherDocRef = doc(db, "Users", userEmail);

    const docSnap = await getDoc(docRef);
    const otherDocSnap = await getDoc(otherDocRef);

    if (docSnap.exists() && otherDocSnap.exists()) {
      let passed_email;

      passed_email = docSnap.data()?.passed_email || [];

      if (passed_email.includes(userEmail)) {
        passed_email = passed_email.filter((email) => email !== userEmail);
        await updateDoc(docRef, {
          passed_email: passed_email,
        });
      }

      setPrevUserIndex(currentUserIndex);
      setIsFadedTop(true);

      if (currentUserIndex <= userData.length - 1 && currentUserIndex > 0) {
        setCurrentUserIndex(currentUserIndex - 1);
      }
      setTimeout(() => {
        setIsFadedTop(false);
      }, [500]);

      // handleSwipe();
    } else {
      console.log("No such document!");
    }
  };

  const HandleUndo = async () => {
    console.log("undo");
    if (ispremium) {
      if (recentPassedUser.where === "liked") {
        console.log("Undoing like move");
        let userEmail = recentPassedUser.email;

        const docRef = doc(db, "Users", userDoc?.email);
        const otherDocRef = doc(db, "Users", userEmail);

        const docSnap = await getDoc(docRef);
        const otherDocSnap = await getDoc(otherDocRef);

        if (docSnap.exists() && otherDocSnap.exists()) {
          let likes;
          let liked_by;
          let userPassedEmail;

          likes = docSnap.data()?.likes || [];
          userPassedEmail = docSnap.data()?.passed_email || [];
          liked_by = otherDocSnap.data()?.liked_by || [];

          if (liked_by.includes(docSnap.data().email)) {
            liked_by = liked_by.filter(
              (email) => email !== docSnap.data().email
            );
            await updateDoc(otherDocRef, {
              liked_by: liked_by,
            });
          }
          if (likes.includes(otherDocSnap.data().email)) {
            likes = likes.filter(
              (email) => email !== otherDocSnap.data().email
            );
            userPassedEmail = userPassedEmail.filter(
              (email) => email !== otherDocSnap.data().email
            );
            await updateDoc(docRef, {
              likes: likes,
              passed_email: userPassedEmail,
            });
          }
          console.log("Updated Likes:", likes);
          console.log("Updated Passed Email:", userPassedEmail);
          console.log("Updated Current User Index:", currentUserIndex);

          if (currentUserIndex <= userData.length - 1 && currentUserIndex > 0) {
            setCurrentUserIndex(currentUserIndex - 1);
          }
        }
      } else if (recentPassedUser.where === "matched") {
        let userEmail = recentPassedUser.email;

        const docRef = doc(db, "Users", userDoc?.email);
        const otherDocRef = doc(db, "Users", userEmail);

        const docSnap = await getDoc(docRef);
        const otherDocSnap = await getDoc(otherDocRef);

        if (docSnap.exists() && otherDocSnap.exists()) {
          let loggedInUserMatchedArray;
          let otherUserMatched;
          let userPassedEmail;
          loggedInUserMatchedArray = docSnap.data()?.matched_user || [];
          otherUserMatched = otherDocSnap.data()?.matched_user || [];
          userPassedEmail = docSnap.data()?.passed_email || [];

          if (otherUserMatched.includes(docSnap.data().email)) {
            otherUserMatched = otherUserMatched.filter(
              (email) => email !== docSnap.data().email
            );
            await updateDoc(otherDocRef, {
              matched_user: otherUserMatched,
            });
          }
          if (loggedInUserMatchedArray.includes(otherDocSnap.data().email)) {
            loggedInUserMatchedArray = loggedInUserMatchedArray.filter(
              (email) => email !== otherDocSnap.data().email
            );
            userPassedEmail = userPassedEmail.filter(
              (email) => email !== otherDocSnap.data().email
            );
            await updateDoc(docRef, {
              matched_user: loggedInUserMatchedArray,
              passed_email: userPassedEmail,
            });
          }
          setCurrentUserIndex(currentUserIndex - 1);
        }
      } else if (recentPassedUser.where === "superliked") {
        HandleUndoSuperLikeMove();
      } else if (recentPassedUser.where === "passed") {
        HandleUndoPassMove();
      }
    } else {
      setPremiumModalStatus(true);
    }
  };
  console.log(recentPassedUser, ispremium);
  return (
    <>
      {premiumModalStatus ? (
        <div class={styles.overlay}>
          <div className={styles.premiumModal}>
            <div
              onClick={() => setPremiumModalStatus(false)}
              className={styles.closebtnModal}
            >
              close
            </div>
            <Upgrade />
          </div>
        </div>
      ) : (
        ""
      )}
      {/* ///Filter Screen//// */}
      {ispremium && filter && (
        <>
          <div className={styles.filtermodalback}></div>
          <div className={styles.filtermodal}>
            {
              <FilterPart
                setFilter={setFilter}
                filterData={filterData}
                setfilterData={setfilterData}
              />
            }
          </div>
        </>
      )}
      {isLikesEXhaust ? (
        <LikesExhaust />
      ) : isMatchedUser ? (
        <MatchedUserScreen
          matchedUser={matchedUser}
          handleKeepSwiping={handleKeepSwiping}
        />
      ) : isLoadingData ? (
        <Loading />
      ) : (
        <div
          style={{ overflowY: !redo ? "scroll" : "hidden" }}
          className={styles.middleContainer}
        >
          {/* ////Not Premium Pop-UP//// */}
          {!ispremium && redo && (
            <FilterRedoPopUp
              frtext={frtext}
              SetRedo={SetRedo}
              setIsPremium={setIsPremium}
              setPremiumModalStatus={setPremiumModalStatus}
            />
          )}
          <div className={styles.filterContainer}>
            <div
              onClick={() => (
                CheckisPremium(), setFRText("Undo"), HandleUndo()
              )}
              className={styles.undoMoveCont}
            >
              <div className={styles.innerUndoMove}>
                <img
                  className={styles.undoMoveImg}
                  src={undoMoveIcon}
                  alt='undoMoveIcon'
                />
                <p className={styles.undoMoveText}>Undo Move</p>
              </div>
            </div>
            {!noMoreVibeData && (
              <>
                <img
                  onClick={() => (OpenFilter(), setFRText("Filter"))}
                  className={styles.filterIcon}
                  src={filterIcon}
                  alt='filterIcon'
                />
              </>
            )}
          </div>
          {noMoreVibeData ? (
            <NoData
              noMoreVibeData={noMoreVibeData}
              handleRefresh={onRefreshClick}
            />
          ) : (
            <div
              {...handlers}
              onClick={() => console.log("Click event triggered")}
              onTouchStart={() => console.log("Touch start")}
              onTouchMove={() => console.log("Touch move")}
              onTouchEnd={() => console.log("Touch end")}
              className={styles.vibeinfo}
            >
              <div className={styles.userDetailsContainer}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.userProfilePucture}
                    src={
                      userData[currentUserIndex]?.image
                        ? userData[currentUserIndex].image
                        : defaultImg
                    }
                    alt='userProfilePucture'
                  />
                </div>
                <h2 className={styles.userName}>
                  {userData[currentUserIndex]?.name}
                </h2>
                <h3 className={styles.userPosition}>
                  {userData[currentUserIndex]?.designation}
                </h3>
                {userData[currentUserIndex]?.state ||
                userData[currentUserIndex]?.country ? (
                  <div className={styles.locationCont}>
                    <img
                      className={styles.locationIcon}
                      src={location}
                      alt='location'
                    />
                    <p className={styles.location}>
                      {userData[currentUserIndex]?.state}
                      {", "}
                      {userData[currentUserIndex]?.country}
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
                      {userData[currentUserIndex]?.here_for.map(
                        (item, index) => {
                          return (
                            <div key={index} className={styles.whyamIHereItem}>
                              <p className={styles.whyhereText}>{item}</p>
                            </div>
                          );
                        }
                      )}
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
                userData[currentUserIndex]?.Vibe_Data?.How_To_Meet?.length >
                  0 ? (
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
                        {userData[currentUserIndex]?.phone !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={phoneIcon} alt='phoneIcon' />
                            <p className={styles.findmeDetails}>
                              {userData[currentUserIndex]?.countryCode}{" "}
                              {userData[currentUserIndex]?.phone}
                            </p>
                          </div>
                        )}
                        {userData[currentUserIndex]?.email !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={emailIcon} alt='emailIcon' />
                            <a
                              style={{ textDecoration: "none" }}
                              href={`mailto:${userData[currentUserIndex]?.email}`}
                            >
                              <p className={styles.findmeDetails}>
                                {userData[currentUserIndex]?.email}
                              </p>
                            </a>

                            {/* </a> */}
                            {/* <p className={styles.findmeDetails}>
                                {userData[currentUserIndex].email}
                              </p> */}
                          </div>
                        )}
                        {userData[currentUserIndex]?.linkedin !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={linkedinIcon} alt='linkedinIcon' />
                            <p className={styles.findmeDetails}>
                              {userData[currentUserIndex]?.linkedin}
                            </p>
                          </div>
                        )}
                        {userData[currentUserIndex]?.twitter !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={twitterIcon} alt='twitterIcon' />
                            <p className={styles.findmeDetails}>
                              {userData[currentUserIndex]?.twitter}
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

          {isFadedLeft && userData && (
            <div className={styles.fadedLeft}>
              <div className={styles.userDetailsContainer}>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.userProfilePucture}
                    src={
                      userData[prevUserIndex].image
                        ? userData[prevUserIndex].image
                        : defaultImg
                    }
                    alt='userProfilePucture'
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
                      alt='location'
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
                            <img src={phoneIcon} alt='phoneIcon' />
                            <p className={styles.findmeDetails}>
                              {userData[prevUserIndex].countryCode}{" "}
                              {userData[prevUserIndex].phone}
                            </p>
                          </div>
                        )}
                        {userData[prevUserIndex].email !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={emailIcon} alt='emailIcon' />
                            <p className={styles.findmeDetails}>
                              {userData[prevUserIndex].email}
                            </p>
                          </div>
                        )}
                        {userData[prevUserIndex].linkedin !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={linkedinIcon} alt='linkedinIcon' />
                            <p className={styles.findmeDetails}>
                              {userData[prevUserIndex].linkedin}
                            </p>
                          </div>
                        )}
                        {userData[prevUserIndex].twitter !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={twitterIcon} alt='twitterIcon' />
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
          {isFadedRight && userData && (
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
                    alt='userProfilePucture'
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
                      alt='location'
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
                            <img src={phoneIcon} alt='phoneIcon' />
                            <p className={styles.findmeDetails}>
                              {userData[prevUserIndex].countryCode}{" "}
                              {userData[prevUserIndex].phone}
                            </p>
                          </div>
                        )}
                        {userData[prevUserIndex].email !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={emailIcon} alt='emailIcon' />
                            <p className={styles.findmeDetails}>
                              {userData[prevUserIndex].email}
                            </p>
                          </div>
                        )}
                        {userData[prevUserIndex].linkedin !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={linkedinIcon} alt='linkedinIcon' />
                            <p className={styles.findmeDetails}>
                              {userData[prevUserIndex].linkedin}
                            </p>
                          </div>
                        )}
                        {userData[prevUserIndex].twitter !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={twitterIcon} alt='twitterIcon' />
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
          {isFadedTop && userData && (
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
                    alt='userProfilePucture'
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
                      alt='location'
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
                            <img src={phoneIcon} alt='phoneIcon' />
                            <p className={styles.findmeDetails}>
                              {userData[prevUserIndex].countryCode}{" "}
                              {userData[prevUserIndex].phone}
                            </p>
                          </div>
                        )}
                        {userData[prevUserIndex].email !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={emailIcon} alt='emailIcon' />
                            {/* <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=md.aadil.shafi@gmail.com&su=Subject&body=Body%20Text"
                               target='_blank' style={{textDecoration:'none'}}>
                                {userData[prevUserIndex].email}
                              </a> */}
                            <p className={styles.findmeDetails}>
                              {userData[prevUserIndex].email}
                            </p>
                          </div>
                        )}
                        {userData[prevUserIndex].linkedin !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={linkedinIcon} alt='linkedinIcon' />
                            <p className={styles.findmeDetails}>
                              {userData[prevUserIndex].linkedin}
                            </p>
                          </div>
                        )}
                        {userData[prevUserIndex].twitter !== "" && (
                          <div className={styles.findmeCont}>
                            <img src={twitterIcon} alt='twitterIcon' />
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

          {!noMoreVibeData && (
            <div className={styles.likeHandshake}>
              <div className={styles.innerContainer}>
                <div className={styles.Cont} onClick={handleNopeCkick}>
                  <img
                    className={styles.likehandShakeImg}
                    src={declineIcon}
                    alt='declineIcon'
                  />
                </div>
                <div
                  style={{
                    pointerEvents:
                      superlikelimit.superlikecount === 0 && "none",
                    opacity: superlikelimit.superlikecount === 0 && "0.4",
                  }}
                  className={styles.Cont}
                  onClick={HandShakeUser}
                >
                  <img
                    className={styles.likehandShakeImg}
                    src={handShakeIcon}
                    alt='handShakeIcon'
                  />
                </div>
                <div className={styles.Cont} onClick={handleLikeCkick}>
                  <img
                    className={styles.likehandShakeImg}
                    src={acceptIcon}
                    alt='acceptIcon'
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VibeMiddlePart;
